import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { useAuth } from "@clerk/nextjs";
import { isAdmin } from "@/lib/utils/admin";

export async function GET() {
  try {
    const { userId } = useAuth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get the base query depending on whether the user is an admin
    const isUserAdmin = isAdmin(userId);
    const baseQuery = isUserAdmin ? {} : { userId };

    // Get total counts for each status
    const [total, pending, processing, completed, cancelled] =
      await Promise.all([
        prisma.serviceRequest.count({
          where: baseQuery,
        }),
        prisma.serviceRequest.count({
          where: {
            ...baseQuery,
            status: "PENDING",
          },
        }),
        prisma.serviceRequest.count({
          where: {
            ...baseQuery,
            status: "PROCESSING",
          },
        }),
        prisma.serviceRequest.count({
          where: {
            ...baseQuery,
            status: "COMPLETED",
          },
        }),
        prisma.serviceRequest.count({
          where: {
            ...baseQuery,
            status: "CANCELLED",
          },
        }),
      ]);

    return NextResponse.json({
      total,
      pending,
      processing,
      completed,
      cancelled,
    });
  } catch (error) {
    console.error("[SERVICE_REQUESTS_STATS]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
