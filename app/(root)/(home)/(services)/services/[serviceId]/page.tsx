import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import prisma from "@/lib/prisma";
import ServiceClient from "./ServiceClient";

interface PageProps {
  params: {
    serviceId: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

async function getService(serviceId: string) {
  try {
    const service = await prisma.service.findUnique({
      where: {
        id: serviceId,
      },
      include: {
        paymentMethods: {
          where: {
            enabled: true,
          },
        },
      },
    });

    if (!service) {
      return null;
    }

    return service;
  } catch (error) {
    console.error("Error fetching service:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const service = await getService(params.serviceId);

  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  return {
    title: service.title,
    description: service.description,
  };
}

export default async function ServicePage({ params, searchParams }: PageProps) {
  const service = await getService(params.serviceId);

  if (!service) {
    redirect("/services");
  }

  return (
    <ServiceClient serviceId={params.serviceId} initialService={service} />
  );
}
