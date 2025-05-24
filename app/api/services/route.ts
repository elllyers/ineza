import { useAuth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { z } from "zod";
import { isAdmin } from "@/lib/utils/admin";
import prisma from "@/lib/prisma";

const serviceSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  type: z.enum(["BANKING", "IREMBO", "WRITING"]),
  price: z.number().min(0, "Price must be positive"),
  formFields: z.record(
    z.object({
      type: z.string(),
      label: z.string(),
      required: z.boolean().optional(),
    })
  ),
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const query = type
      ? { type: type as "BANKING" | "IREMBO" | "WRITING" }
      : {};

    const services = await prisma.service.findMany({
      where: query,
      include: {
        paymentMethods: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ data: services });
  } catch (error) {
    console.error("[SERVICES_GET]", error);
    return NextResponse.json(
      { error: "Failed to fetch services" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { userId } = useAuth();

    if (!userId || !isAdmin(userId)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const body = await request.json();
    const validatedData = serviceSchema.parse(body);

    const service = await prisma.service.create({
      data: {
        ...validatedData,
        paymentMethods: {
          create: [
            { type: "MTN_MONEY", name: "MTN Mobile Money" },
            { type: "AIRTEL_MONEY", name: "Airtel Money" },
            { type: "BANK_TRANSFER", name: "Bank Transfer" },
            { type: "CARD", name: "Credit/Debit Card" },
          ],
        },
      },
      include: {
        paymentMethods: true,
      },
    });

    return NextResponse.json({ data: service }, { status: 201 });
  } catch (error) {
    console.error("[SERVICES_POST]", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
