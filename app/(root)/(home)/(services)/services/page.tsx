import { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface Service {
  id: string;
  title: string;
  description: string;
  type: "BANKING" | "IREMBO" | "WRITING";
  price: number;
  paymentMethods: Array<{
    id: string;
    type: string;
    name: string;
    enabled: boolean;
  }>;
}

export const metadata: Metadata = {
  title: "Our Services | Ineza",
  description:
    "Browse our wide range of services including banking, Irembo, and writing services.",
};

async function getServices(): Promise<Service[]> {
  try {
    const services = await prisma.service.findMany({
      include: {
        paymentMethods: {
          where: {
            enabled: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return services;
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
}

export default async function ServicesPage() {
  const services = await getServices();

  const getServiceTypeColor = (type: string) => {
    switch (type) {
      case "BANKING":
        return "bg-blue-500/10 text-blue-500";
      case "IREMBO":
        return "bg-green-500/10 text-green-500";
      case "WRITING":
        return "bg-purple-500/10 text-purple-500";
      default:
        return "bg-gray-500/10 text-gray-500";
    }
  };

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Our Services</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Browse our comprehensive range of services designed to meet your
          needs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <Card key={service.id} className="flex flex-col">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Badge className={getServiceTypeColor(service.type)}>
                  {service.type.toLowerCase()}
                </Badge>
                <span className="text-lg font-bold">
                  ${service.price.toFixed(2)}
                </span>
              </div>
              <CardTitle>{service.title}</CardTitle>
              <CardDescription>{service.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="space-y-2">
                <h4 className="text-sm font-semibold">Payment Methods:</h4>
                <div className="flex flex-wrap gap-2">
                  {service.paymentMethods.map((method) => (
                    <Badge
                      key={method.id}
                      variant="outline"
                      className="text-xs"
                    >
                      {method.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={`/services/${service.id}`}>
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
