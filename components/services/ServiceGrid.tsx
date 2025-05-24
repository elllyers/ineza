"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ArrowRight, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PaymentMethod {
  id: string;
  type: string;
  name: string;
  enabled: boolean;
}

interface Service {
  id: string;
  title: string;
  description: string;
  type: "BANKING" | "IREMBO" | "WRITING";
  price: number;
  formFields: Record<
    string,
    {
      type: string;
      label: string;
      required?: boolean;
    }
  >;
  paymentMethods: PaymentMethod[];
}

interface ServiceGridProps {
  initialServices?: Service[];
}

export default function ServiceGrid({
  initialServices = [],
}: ServiceGridProps) {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [loading, setLoading] = useState(!initialServices.length);
  const { toast } = useToast();

  const fetchServices = async () => {
    if (initialServices.length) return;

    try {
      const response = await fetch("/api/services");
      if (!response.ok) {
        throw new Error("Failed to fetch services");
      }
      const data = await response.json();
      setServices(data.data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load services",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!services.length) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold mb-2">No services available</h3>
        <p className="text-muted-foreground">Please check back later.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service) => (
        <Card key={service.id} className="flex flex-col">
          <CardHeader>
            <div className="flex items-start justify-between">
              <CardTitle className="text-xl">{service.title}</CardTitle>
              <Badge variant="secondary" className="capitalize">
                {service.type.toLowerCase().replace("_", " ")}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="flex-1">
            <p className="text-muted-foreground">{service.description}</p>
            <div className="mt-4">
              <p className="text-2xl font-bold">${service.price.toFixed(2)}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {service.paymentMethods.map((method) => (
                  <Badge key={method.id} variant="outline">
                    {method.name}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href={`/services/${service.id}`}>
                Request Service
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
