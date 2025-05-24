"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, AlertCircle } from "lucide-react";

interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  type: "BANKING" | "IREMBO" | "WRITING";
  formFields: Record<
    string,
    {
      type: string;
      label: string;
      required?: boolean;
    }
  >;
  paymentMethods: Array<{
    id: string;
    type: string;
    name: string;
    enabled: boolean;
  }>;
}

interface ServiceClientProps {
  serviceId: string;
  initialService?: Service;
}

export default function ServiceClient({
  serviceId,
  initialService,
}: ServiceClientProps) {
  const router = useRouter();
  const { userId, isSignedIn } = useAuth();
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState(false);
  const [service, setService] = useState<Service | null>(
    initialService || null
  );
  const [loading, setLoading] = useState(!initialService);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [selectedPayment, setSelectedPayment] = useState<string>("");

  useEffect(() => {
    if (!initialService) {
      fetchService();
    }
    checkAdminStatus();
  }, [initialService]);

  const fetchService = async () => {
    try {
      const response = await fetch(`/api/services/${serviceId}`);
      if (!response.ok) {
        throw new Error("Service not found");
      }
      const data = await response.json();
      setService(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch service details",
        variant: "destructive",
      });
      router.push("/services");
    } finally {
      setLoading(false);
    }
  };

  const checkAdminStatus = async () => {
    const response = await fetch("/api/check-admin");
    const data = await response.json();
    setIsAdmin(data.isAdmin);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isSignedIn) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to submit a service request",
        variant: "destructive",
      });
      return;
    }

    if (!service || !selectedPayment) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("/api/service-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          serviceId: service.id,
          paymentMethodId: selectedPayment,
          formData,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit request");
      }

      toast({
        title: "Success",
        description: "Your service request has been submitted",
      });

      router.push("/dashboard/requests");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit service request",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin" />
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
        <AlertCircle className="h-12 w-12 text-red-500" />
        <h2 className="text-xl font-semibold">Service Not Found</h2>
        <Button onClick={() => router.push("/services")}>
          Return to Services
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4 py-8">
        {isAdmin && (
          <div className="flex gap-4 mb-8">
            <Button
              onClick={() =>
                router.push(`/dashboard/services/${service.id}/edit`)
              }
              variant="outline"
            >
              Edit Service
            </Button>
            <Button
              variant="destructive"
              onClick={async () => {
                if (confirm("Are you sure you want to delete this service?")) {
                  try {
                    const response = await fetch(
                      `/api/services/${service.id}`,
                      {
                        method: "DELETE",
                      }
                    );

                    if (!response.ok) {
                      throw new Error("Failed to delete service");
                    }

                    router.push("/services");
                    toast({
                      title: "Success",
                      description: "Service deleted successfully",
                    });
                  } catch (error) {
                    toast({
                      title: "Error",
                      description: "Failed to delete service",
                      variant: "destructive",
                    });
                  }
                }
              }}
            >
              Delete Service
            </Button>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
              <h1 className="text-3xl font-bold text-white mb-4">
                {service.title}
              </h1>
              <p className="text-gray-300 mb-4">{service.description}</p>
              <div className="inline-block bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-full">
                {service.price === 0 ? "Free" : `$${service.price}`}
              </div>
            </div>
          </div>

          <div>
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
              <h2 className="text-2xl font-semibold text-white mb-6">
                Request Service
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                {Object.entries(service.formFields).map(([field, config]) => (
                  <div key={field} className="space-y-2">
                    <Label htmlFor={field}>{config.label}</Label>{" "}
                    {config.type === "textarea" ? (
                      <Textarea
                        id={field}
                        value={formData[field] || ""}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                          handleInputChange(field, e.target.value)
                        }
                        required={config.required}
                      />
                    ) : (
                      <Input
                        id={field}
                        type={config.type}
                        value={formData[field] || ""}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleInputChange(field, e.target.value)
                        }
                        required={config.required}
                      />
                    )}
                  </div>
                ))}

                <div className="space-y-2">
                  <Label htmlFor="paymentMethod">Payment Method</Label>
                  <Select
                    value={selectedPayment}
                    onValueChange={setSelectedPayment}
                  >
                    <SelectTrigger id="paymentMethod">
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      {service.paymentMethods
                        .filter((method) => method.enabled)
                        .map((method) => (
                          <SelectItem key={method.id} value={method.id}>
                            {method.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button type="submit" disabled={submitting} className="w-full">
                  {submitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Submit Request"
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Move the rest of the component logic here
  return <div>{/* Move the component JSX here */}</div>;
}
