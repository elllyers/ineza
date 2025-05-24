import { useAuth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/utils/admin";
import { z } from "zod";
import prisma from "@/lib/prisma";

const updateServiceSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  price: z.number().positive().optional(),
  formFields: z
    .record(
      z.object({
        type: z.string(),
        label: z.string(),
        required: z.boolean().optional(),
      })
    )
    .optional(),
});

export async function GET(
  request: Request,
  { params }: { params: { serviceId: string } }
) {
  try {
    const service = await prisma.service.findUnique({
      where: {
        id: params.serviceId,
      },
      include: {
        paymentMethods: {
          select: {
            id: true,
            type: true,
            name: true,
            enabled: true,
          },
        },
      },
    });

    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    return NextResponse.json({ data: service });
  } catch (error) {
    console.error("[SERVICE_GET]", error);
    return NextResponse.json(
      { error: "Failed to fetch service" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { serviceId: string } }
) {
  try {
    const { userId } = useAuth();
    if (!userId || !isAdmin(userId)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const data = await request.json();
    const validatedData = updateServiceSchema.parse(data);

    const service = await prisma.service.update({
      where: {
        id: params.serviceId,
      },
      data: validatedData,
      include: {
        paymentMethods: true,
      },
    });

    return NextResponse.json({ data: service });
  } catch (error) {
    console.error("[SERVICE_PUT]", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to update service" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { serviceId: string } }
) {
  try {
    const { userId } = useAuth();
    if (!userId || !isAdmin(userId)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Delete the service and related data
    await prisma.service.delete({
      where: {
        id: params.serviceId,
      },
    });

    return NextResponse.json({
      message: "Service deleted successfully",
      data: { id: params.serviceId },
    });
  } catch (error) {
    console.error("[SERVICE_DELETE]", error);
    return NextResponse.json(
      { error: "Failed to delete service" },
      { status: 500 }
    );
  }
}
