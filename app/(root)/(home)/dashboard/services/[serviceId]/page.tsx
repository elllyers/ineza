"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Minus, Save, ArrowLeft, Loader2 } from "lucide-react";

interface FormField {
  type: string;
  label: string;
  required: boolean;
}

interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  type: "BANKING" | "IREMBO" | "WRITING";
  formFields: Record<string, FormField>;
}

export default function ServiceEditorPage({
  params,
}: {
  params: Promise<{ serviceId: string }>;
}) {
  const router = useRouter();
  const { toast } = useToast();
  const resolvedParams = use(params);
  const isNew = resolvedParams.serviceId === "new";
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(!isNew);
  const [service, setService] = useState<Partial<Service>>({
    title: "",
    description: "",
    price: 0,
    type: "BANKING",
    formFields: {
      name: { type: "text", label: "Full Name", required: true },
      email: { type: "email", label: "Email", required: true },
      phone: { type: "tel", label: "Phone Number", required: true },
      details: {
        type: "textarea",
        label: "Additional Details",
        required: false,
      },
    },
  });
  useEffect(() => {
    if (!isNew) {
      fetchService();
    }
  }, [resolvedParams.serviceId]);

  const fetchService = async () => {
    try {
      const response = await fetch(`/api/services/${resolvedParams.serviceId}`);
      if (!response.ok) throw new Error("Failed to fetch service");
      const { data } = await response.json();
      setService(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load service details",
        variant: "destructive",
      });
      router.push("/dashboard/services");
    } finally {
      setInitialLoading(false);
    }
  };

  const addFormField = () => {
    const fieldId = `field_${Object.keys(service.formFields || {}).length + 1}`;
    setService((prev) => ({
      ...prev,
      formFields: {
        ...(prev.formFields || {}),
        [fieldId]: {
          type: "text",
          label: "",
          required: false,
        },
      },
    }));
  };

  const removeFormField = (fieldId: string) => {
    const newFormFields = { ...service.formFields };
    delete newFormFields[fieldId];
    setService((prev) => ({
      ...prev,
      formFields: newFormFields,
    }));
  };
  const updateFormField = (
    fieldId: string,
    property: keyof FormField,
    value: string | boolean
  ) => {
    setService((prev) => {
      const currentFields = prev.formFields || {};
      const currentField = currentFields[fieldId] || {
        type: "text",
        label: "",
        required: false,
      };

      return {
        ...prev,
        formFields: {
          ...currentFields,
          [fieldId]: {
            ...currentField,
            [property]: value,
          } as FormField,
        },
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const endpoint = isNew
        ? "/api/services"
        : `/api/services/${resolvedParams.serviceId}`;
      const method = isNew ? "POST" : "PUT";

      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(service),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${isNew ? "create" : "update"} service`);
      }

      toast({
        title: "Success",
        description: `Service ${isNew ? "created" : "updated"} successfully`,
      });

      router.push("/dashboard/services");
      router.refresh();
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${isNew ? "create" : "update"} service`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="h-full bg-gray-950 p-6 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="h-full bg-gray-950 p-6">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => router.push("/dashboard/services")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Services
        </Button>

        <h1 className="text-2xl font-bold text-white mb-6">
          {isNew ? "Add New Service" : "Edit Service"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid gap-6 p-6 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl">
            <div className="space-y-2">
              <Label htmlFor="title">Service Title</Label>
              <Input
                id="title"
                value={service.title}
                onChange={(e) =>
                  setService({ ...service, title: e.target.value })
                }
                placeholder="Enter service title"
                required
                className="bg-gray-800 border-gray-700"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={service.description}
                onChange={(e) =>
                  setService({ ...service, description: e.target.value })
                }
                placeholder="Enter service description"
                required
                className="bg-gray-800 border-gray-700 min-h-[100px]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Service Type</Label>
                <Select
                  value={service.type}
                  onValueChange={(value: "BANKING" | "IREMBO" | "WRITING") =>
                    setService({ ...service, type: value })
                  }
                >
                  <SelectTrigger className="bg-gray-800 border-gray-700">
                    <SelectValue placeholder="Select service type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="BANKING">Banking Service</SelectItem>
                    <SelectItem value="IREMBO">Irembo Service</SelectItem>
                    <SelectItem value="WRITING">Writing Service</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price (RWF)</Label>
                <Input
                  id="price"
                  type="number"
                  value={service.price}
                  onChange={(e) =>
                    setService({ ...service, price: Number(e.target.value) })
                  }
                  min="0"
                  step="0.01"
                  required
                  className="bg-gray-800 border-gray-700"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Form Fields</h2>
              <Button
                type="button"
                onClick={addFormField}
                className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Field
              </Button>
            </div>

            <div className="space-y-4">
              {Object.entries(service.formFields || {}).map(
                ([fieldId, field]) => (
                  <div
                    key={fieldId}
                    className="grid gap-4 p-4 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Field Label</Label>
                        <Input
                          value={field.label}
                          onChange={(e) =>
                            updateFormField(fieldId, "label", e.target.value)
                          }
                          placeholder="e.g., Full Name"
                          className="bg-gray-800 border-gray-700"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Field Type</Label>
                        <Select
                          value={field.type}
                          onValueChange={(value) =>
                            updateFormField(fieldId, "type", value)
                          }
                        >
                          <SelectTrigger className="bg-gray-800 border-gray-700">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="text">Text</SelectItem>
                            <SelectItem value="email">Email</SelectItem>
                            <SelectItem value="tel">Phone</SelectItem>
                            <SelectItem value="number">Number</SelectItem>
                            <SelectItem value="textarea">Text Area</SelectItem>
                            <SelectItem value="date">Date</SelectItem>
                            <SelectItem value="file">File Upload</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`required-${fieldId}`}
                          checked={field.required}
                          onChange={(e) =>
                            updateFormField(
                              fieldId,
                              "required",
                              e.target.checked
                            )
                          }
                          className="rounded border-gray-700 bg-gray-800"
                        />
                        <Label htmlFor={`required-${fieldId}`}>
                          Required field
                        </Label>
                      </div>
                      <Button
                        type="button"
                        variant="destructive"
                        onClick={() => removeFormField(fieldId)}
                        className="bg-red-500/10 text-red-500 hover:bg-red-500/20"
                      >
                        <Minus className="mr-2 h-4 w-4" />
                        Remove Field
                      </Button>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/dashboard/services")}
              disabled={loading}
              className="border-gray-700 hover:bg-gray-800"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isNew ? "Creating..." : "Saving..."}
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  {isNew ? "Create Service" : "Save Changes"}
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
