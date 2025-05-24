import { useAuth } from "@clerk/nextjs";
import { z } from "zod";
import {
  createApiResponse,
  createApiError,
  validateJsonRequest,
  ApiAuthorizationError,
  ApiValidationError,
} from "@/lib/utils/api";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { buildSearchQuery, type SearchParams } from "@/lib/utils";

const createRequestSchema = z.object({
  serviceId: z.string().uuid(),
  formData: z.record(z.unknown()),
  paymentMethod: z.enum(["MTN_MONEY", "AIRTEL_MONEY", "BANK_TRANSFER", "CARD"]),
  amount: z.number().positive(),
});

const searchParamsSchema = z.object({
  query: z.string().optional(),
  page: z.coerce.number().min(1).optional(),
  limit: z.coerce.number().min(1).max(100).optional(),
  sortBy: z.enum(["createdAt", "status", "title"]).optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
});

export async function GET(request: Request) {
  try {
    const session = await useAuth();
    if (!session?.userId) {
      throw new ApiAuthorizationError();
    }

    const { searchParams } = new URL(request.url);
    const params = Object.fromEntries(searchParams.entries());

    const validatedParams = searchParamsSchema.parse(params);
    const query = buildSearchQuery(validatedParams as SearchParams);

    const [serviceRequests, total] = await Promise.all([
      prisma.serviceRequest.findMany({
        ...query,
        include: {
          service: {
            select: {
              title: true,
              description: true,
              price: true,
              type: true,
            },
          },
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      }),
      prisma.serviceRequest.count({ where: query.where }),
    ]);

    return NextResponse.json({
      data: serviceRequests,
      metadata: {
        page: validatedParams.page || 1,
        perPage: validatedParams.limit || 10,
        total,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const fieldErrors = error.flatten().fieldErrors;
      const validationErrors = Object.entries(fieldErrors).reduce(
        (acc, [key, errors]) => {
          if (errors) acc[key] = errors;
          return acc;
        },
        {} as Record<string, string[]>
      );
      throw new ApiValidationError(
        "Invalid search parameters",
        validationErrors
      );
    }
    console.error("Failed to fetch service requests:", error);
    return createApiError(
      error instanceof Error ? error : "Failed to fetch service requests"
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await useAuth();
    if (!session?.userId) {
      throw new ApiAuthorizationError();
    }

    const data = await validateJsonRequest(request, createRequestSchema);

    const service = await prisma.service.findUnique({
      where: { id: data.serviceId },
    });

    if (!service) {
      throw new ApiValidationError("Service not found", {
        serviceId: ["Service does not exist"],
      });
    }

    // Verify the payment method is enabled for this service
    const paymentMethod = await prisma.paymentMethod.findFirst({
      where: {
        serviceId: data.serviceId,
        type: data.paymentMethod,
        enabled: true,
      },
    });

    if (!paymentMethod) {
      throw new ApiValidationError("Invalid payment method", {
        paymentMethod: [
          "This payment method is not available for this service",
        ],
      });
    }

    const serviceRequest = await prisma.serviceRequest.create({
      data: {
        serviceId: data.serviceId,
        userId: session.userId,
        formData: data.formData,
        paymentMethod: data.paymentMethod,
        amount: data.amount,
        status: "PENDING",
        paymentStatus: "PENDING",
      },
      include: {
        service: {
          select: {
            title: true,
            description: true,
            price: true,
            type: true,
          },
        },
      },
    });

    return createApiResponse(serviceRequest, 201);
  } catch (error: any) {
    console.error("Failed to create service request:", error);
    return createApiError(error);
  }
}
