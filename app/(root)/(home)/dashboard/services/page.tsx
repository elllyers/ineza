"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { PaymentSelector } from "@/components/PaymentSelector";
import type { PaymentMethod } from "@/components/PaymentSelector";
import {
  PlusCircle,
  Search,
  Edit,
  Trash2,
  ArrowUpDown,
  Loader2,
  Plus,
  Minus,
} from "lucide-react";

interface Service {
  id: string;
  title: string;
  description: string;
  type: "BANKING" | "IREMBO" | "WRITING";
  price: number;
  formFields: Record<string, FormField>;
  paymentMethods: PaymentMethod[];
  createdAt: string;
}

interface FormField {
  type: string;
  label: string;
  required: boolean;
}

export default function ServicesManagementPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("ALL");
  const [sortField, setSortField] = useState<keyof Service>("createdAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [formFields, setFormFields] = useState<Record<string, FormField>>({});
  const [selectedPaymentMethods, setSelectedPaymentMethods] = useState<
    PaymentMethod[]
  >([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "BANKING" as "BANKING" | "IREMBO" | "WRITING",
    price: "",
    formFields: {} as Record<string, FormField>,
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/services");
      if (!response.ok) throw new Error("Failed to fetch services");
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

  const handleDelete = async (serviceId: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;

    try {
      const response = await fetch(`/api/services/${serviceId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete service");

      toast({
        title: "Success",
        description: "Service deleted successfully",
      });

      fetchServices();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete service",
        variant: "destructive",
      });
    }
  };

  const handleSort = (field: keyof Service) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleAddField = () => {
    const newFieldId = `field_${Object.keys(formFields).length + 1}`;
    setFormFields({
      ...formFields,
      [newFieldId]: {
        type: "text",
        label: "",
        required: false,
      },
    });
  };

  const handleRemoveField = (fieldId: string) => {
    const newFields = { ...formFields };
    delete newFields[fieldId];
    setFormFields(newFields);
  };

  const handleFieldChange = (
    fieldId: string,
    property: keyof FormField,
    value: string | boolean
  ) => {
    setFormFields({
      ...formFields,
      [fieldId]: {
        ...formFields[fieldId],
        [property]: value,
      },
    });
  };

  const handleUpdateService = async (serviceId: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/services/${serviceId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          formFields,
          paymentMethods: selectedPaymentMethods,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update service");
      }

      toast({
        title: "Success",
        description: "Service updated successfully",
      });

      setEditDialogOpen(false);
      setEditingService(null);
      fetchServices();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update service",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateService = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          formFields,
          paymentMethods: selectedPaymentMethods,
        }),
      });

      if (!response.ok) throw new Error("Failed to create service");

      toast({
        title: "Success",
        description: "Service created successfully",
      });

      setEditDialogOpen(false);
      fetchServices();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create service",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredServices = services
    .filter((service: Service) => {
      const matchesSearch =
        service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = typeFilter === "ALL" || service.type === typeFilter;
      return matchesSearch && matchesType;
    })
    .sort((a: Service, b: Service) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      const order = sortDirection === "asc" ? 1 : -1;
      return String(aValue).localeCompare(String(bValue)) * order;
    });

  const typeColors = {
    BANKING: "bg-blue-500/10 text-blue-500",
    IREMBO: "bg-green-500/10 text-green-500",
    WRITING: "bg-purple-500/10 text-purple-500",
  };

  return (
    <div className="p-6 text-slate-500">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Services Management</h1>
        <Button
          onClick={() => {
            setEditingService(null);
            setFormData({
              title: "",
              description: "",
              type: "BANKING",
              price: "",
              formFields: {},
            });
            setFormFields({});
            setSelectedPaymentMethods([]);
            setEditDialogOpen(true);
          }}
        >
          <PlusCircle className="w-4 h-4 mr-2" />
          Add Service
        </Button>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search services..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Types</SelectItem>
            <SelectItem value="BANKING">Banking</SelectItem>
            <SelectItem value="IREMBO">Irembo</SelectItem>
            <SelectItem value="WRITING">Writing</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("title")}
                  className="font-medium"
                >
                  Title
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("type")}
                  className="font-medium"
                >
                  Type
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("price")}
                  className="font-medium"
                >
                  Price
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("createdAt")}
                  className="font-medium"
                >
                  Created At
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredServices.map((service) => (
              <TableRow key={service.id}>
                <TableCell className="font-medium">{service.title}</TableCell>
                <TableCell>{service.type}</TableCell>
                <TableCell>${service.price}</TableCell>
                <TableCell>
                  {new Date(service.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setEditingService(service);
                      setFormData({
                        title: service.title,
                        description: service.description,
                        type: service.type,
                        price: service.price.toString(),
                        formFields: service.formFields,
                      });
                      setFormFields(service.formFields);
                      setSelectedPaymentMethods(service.paymentMethods);
                      setEditDialogOpen(true);
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(service.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              {editingService ? "Edit Service" : "Create Service"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="type">Type</Label>
              <Select
                value={formData.type}
                onValueChange={(value: "BANKING" | "IREMBO" | "WRITING") =>
                  setFormData({ ...formData, type: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BANKING">Banking</SelectItem>
                  <SelectItem value="IREMBO">Irembo</SelectItem>
                  <SelectItem value="WRITING">Writing</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label>Form Fields</Label>
              {Object.entries(formFields).map(([fieldId, field]) => (
                <div key={fieldId} className="flex gap-2 items-end">
                  <div className="grid gap-2 flex-1">
                    <Input
                      placeholder="Field Label"
                      value={field.label}
                      onChange={(e) =>
                        handleFieldChange(fieldId, "label", e.target.value)
                      }
                    />
                  </div>
                  <Select
                    value={field.type}
                    onValueChange={(value) =>
                      handleFieldChange(fieldId, "type", value)
                    }
                  >
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Field Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="text">Text</SelectItem>
                      <SelectItem value="number">Number</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="tel">Phone</SelectItem>
                      <SelectItem value="date">Date</SelectItem>
                      <SelectItem value="file">File</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveField(fieldId)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                onClick={handleAddField}
                className="mt-2"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Field
              </Button>
            </div>
            <div className="grid gap-2">
              <Label>Payment Methods</Label>
              <PaymentSelector
                selectedMethods={selectedPaymentMethods}
                onChange={setSelectedPaymentMethods}
              />
            </div>
          </div>
          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() =>
                editingService
                  ? handleUpdateService(editingService.id)
                  : handleCreateService()
              }
              disabled={loading}
            >
              {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {editingService ? "Update" : "Create"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
