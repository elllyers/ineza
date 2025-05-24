import { auth } from "@clerk/nextjs/server";
import { isAdmin } from "@/lib/utils/admin";
import { z } from "zod";
import {
  createApiResponse,
  createApiError,
  validateJsonRequest,
  isValidUUID,
  ApiAuthorizationError,
  ApiValidationError,
} from "@/lib/utils/api";
import prisma from "@/lib/prisma";

const statusUpdateSchema = z.object({
  status: z.enum(["PENDING", "PROCESSING", "COMPLETED", "CANCELLED"]),
});

type RequestStatus = z.infer<typeof statusUpdateSchema>["status"];

export async function GET(
  request: Request,
  { params }: { params: { requestId: string } }
) {
  try {
    const session = await auth();
    if (!session?.userId) {
      throw new ApiAuthorizationError();
    }

    if (!isValidUUID(params.requestId)) {
      throw new ApiValidationError("Invalid request ID format", {
        requestId: ["Must be a valid UUID"],
      });
    }

    const isAdminUser = await isAdmin();

    const serviceRequest = await prisma.serviceRequest.findUnique({
      where: { id: params.requestId },
      include: {
        service: {
          select: {
            title: true,
            description: true,
          },
        },
      },
    });

    if (!serviceRequest) {
      throw new ApiValidationError("Service request not found", {
        requestId: ["Request not found"],
      });
    }

    // Check if user has access to this request
    if (!isAdminUser && serviceRequest.userId !== session.userId) {
      throw new ApiAuthorizationError("Access denied");
    }

    return createApiResponse(serviceRequest);
  } catch (error) {
    console.error("Failed to fetch service request:", error);
    return createApiError(
      error instanceof Error ? error : "Failed to fetch service request"
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { requestId: string } }
) {
  try {
    if (!isValidUUID(params.requestId)) {
      throw new ApiValidationError("Invalid request ID format", {
        requestId: ["Must be a valid UUID"],
      });
    }

    const session = await auth();
    if (!session?.userId) {
      throw new ApiAuthorizationError();
    }

    if (!(await isAdmin())) {
      throw new ApiAuthorizationError("Admin access required");
    }

    const data = await validateJsonRequest(request, statusUpdateSchema);

    const serviceRequest = await prisma.serviceRequest.update({
      where: { id: params.requestId },
      data: { status: data.status },
      include: {
        service: {
          select: {
            title: true,
            description: true,
          },
        },
      },
    });

    return createApiResponse(serviceRequest);
  } catch (error) {
    console.error("Failed to update service request:", error);
    return createApiError(
      error instanceof Error ? error : "Failed to update service request"
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { requestId: string } }
) {
  try {
    if (!isValidUUID(params.requestId)) {
      throw new ApiValidationError("Invalid request ID format", {
        requestId: ["Must be a valid UUID"],
      });
    }

    const session = await auth();
    if (!session?.userId) {
      throw new ApiAuthorizationError();
    }

    if (!(await isAdmin())) {
      throw new ApiAuthorizationError("Admin access required");
    }

    const serviceRequest = await prisma.serviceRequest.findUnique({
      where: { id: params.requestId },
    });

    if (!serviceRequest) {
      throw new ApiValidationError("Service request not found", {
        requestId: ["Request not found"],
      });
    }

    await prisma.serviceRequest.delete({
      where: { id: params.requestId },
    });

    return createApiResponse({
      message: "Service request deleted successfully",
    });
  } catch (error) {
    console.error("Failed to delete service request:", error);
    return createApiError(
      error instanceof Error ? error : "Failed to delete service request"
    );
  }
}
