"use client";

import { useEffect, useState } from "react";
import { Service } from "@/types/service";
import {
  Edit2,
  Trash2,
  MoreVertical,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

export default function ServiceList() {
  const router = useRouter();
  const { toast } = useToast();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retrying, setRetrying] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/services");
      if (!response.ok) {
        throw new Error(`Failed to fetch services: ${response.statusText}`);
      }
      const data = await response.json();
      if ("error" in data) {
        throw new Error(data.error);
      }
      setServices(data.data || []);
    } catch (error) {
      console.error("Failed to fetch services:", error);
      setError(
        error instanceof Error ? error.message : "Failed to load services"
      );
    } finally {
      setLoading(false);
      setRetrying(false);
    }
  };

  const deleteService = async (serviceId: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;

    try {
      const response = await fetch(`/api/services/${serviceId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to delete service");
      }

      toast({
        title: "Service deleted",
        description: "The service has been successfully deleted.",
      });

      fetchServices(); // Refresh the list
    } catch (error) {
      console.error("Failed to delete service:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to delete service",
      });
    }
  };

  const handleRetry = () => {
    setRetrying(true);
    fetchServices();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-48 space-y-4">
        <div className="flex items-center text-red-400">
          <AlertCircle className="h-5 w-5 mr-2" />
          <span>{error}</span>
        </div>
        <Button
          variant="outline"
          onClick={handleRetry}
          disabled={retrying}
          className="border-gray-800 hover:bg-gray-800"
        >
          {retrying ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Retrying...
            </>
          ) : (
            <>
              <RefreshCw className="h-4 w-4 mr-2" />
              Retry
            </>
          )}
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {services.map((service) => (
        <div
          key={service.id}
          className="flex items-center justify-between p-4 rounded-lg border border-gray-800 bg-gray-900 hover:bg-gray-800/50 transition-colors"
        >
          <div>
            <h3 className="text-lg font-semibold text-white">
              {service.title}
            </h3>
            <p className="text-gray-400 mt-1">{service.description}</p>
            <div className="flex items-center gap-4 mt-2">
              <span className="text-sm text-emerald-400">
                {service.price.toLocaleString()} RWF
              </span>
              <Badge className="bg-emerald-500/20 text-emerald-400">
                {service.type}
              </Badge>
              <Badge
                className={
                  service.paymentMethods.some((pm) => pm.enabled)
                    ? "bg-emerald-500/20 text-emerald-400"
                    : "bg-gray-500/20 text-gray-400"
                }
              >
                {service.paymentMethods.some((pm) => pm.enabled)
                  ? "Active"
                  : "Inactive"}
              </Badge>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="hover:bg-gray-800"
              onClick={() => router.push(`/dashboard/services/${service.id}`)}
            >
              <Edit2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="hover:bg-gray-800 hover:text-red-400"
              onClick={() => deleteService(service.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="hover:bg-gray-800">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}

      {services.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400">No services found</p>
          <Button
            onClick={() => router.push("/dashboard/services/new")}
            className="mt-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600"
          >
            Create Your First Service
          </Button>
        </div>
      )}
    </div>
  );
}
