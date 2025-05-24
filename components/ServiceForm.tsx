"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { PaymentSelector } from "@/components/PaymentSelector";
import type { PaymentMethod } from "@/components/PaymentSelector";

const PaymentMethodEnum = z.enum([
  "MTN_MONEY",
  "AIRTEL_MONEY",
  "BANK_TRANSFER",
  "CARD",
] as const);

type PaymentMethodType = z.infer<typeof PaymentMethodEnum>;

interface ServiceFormProps {
  serviceId: string;
  formFields: Record<
    string,
    { type: string; label: string; required?: boolean }
  >;
  price: number;
}

interface FormData {
  [key: string]: string | number | PaymentMethodType;
  paymentMethod: PaymentMethodType;
}

const createFormSchema = (formFields: ServiceFormProps["formFields"]) => {
  const shape: Record<string, z.ZodType<any>> = {};

  Object.entries(formFields).forEach(([key, field]) => {
    let fieldSchema: z.ZodType<any>;

    switch (field.type) {
      case "number":
        fieldSchema = z
          .string()
          .refine((val) => !isNaN(Number(val)), "Must be a valid number")
          .transform(Number);
        break;
      case "email":
        fieldSchema = z.string().email("Must be a valid email");
        break;
      case "tel":
        fieldSchema = z
          .string()
          .regex(
            /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
            "Must be a valid phone number"
          );
        break;
      default:
        fieldSchema = z.string();
    }

    if (field.required) {
      fieldSchema = z
        .string()
        .min(1, `${field.label} is required`)
        .and(fieldSchema);
    } else {
      fieldSchema = fieldSchema.optional();
    }

    shape[key] = fieldSchema;
  });

  return z.object({
    ...shape,
    paymentMethod: PaymentMethodEnum,
  });
};

export function ServiceForm({
  serviceId,
  formFields,
  price,
}: ServiceFormProps) {
  const { user } = useUser();
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPaymentMethods, setSelectedPaymentMethods] = useState<
    PaymentMethod[]
  >([]);

  const schema = createFormSchema(formFields);
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      ...Object.keys(formFields).reduce(
        (acc, key) => ({
          ...acc,
          [key]: "",
        }),
        {}
      ),
      paymentMethod: "MTN_MONEY",
    },
  });
  const onSubmit = async (data: FormData) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to submit a service request",
        variant: "destructive",
      });
      return;
    }

    if (!selectedPaymentMethods.length) {
      toast({
        title: "Payment method required",
        description: "Please select a payment method",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/service-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId,
          formData: {
            ...data,
            paymentMethod: selectedPaymentMethods[0].type,
          },
          amount: price,
        }),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => null);
        throw new Error(error?.message || "Failed to submit request");
      }

      const result = await response.json();

      toast({
        title: "Success",
        description: "Your service request has been submitted successfully",
      });

      router.push(`/dashboard/requests/${result.id}`);
    } catch (error) {
      console.error("Service request submission error:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to submit service request",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePaymentMethodChange = (methods: PaymentMethod[]) => {
    setSelectedPaymentMethods(methods);
    if (methods.length > 0) {
      form.setValue("paymentMethod", methods[0].type as PaymentMethodType);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {Object.entries(formFields).map(([key, field]) => (
          <FormField
            key={key}
            control={form.control}
            name={key}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel>{field.label}</FormLabel>
                <FormControl>
                  <Input
                    {...formField}
                    type={field.type}
                    placeholder={field.label}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}{" "}
        <FormField
          control={form.control}
          name="paymentMethod"
          render={() => (
            <FormItem>
              <FormLabel>Payment Method</FormLabel>
              <FormControl>
                <PaymentSelector
                  selectedMethods={selectedPaymentMethods}
                  onChange={handlePaymentMethodChange}
                  mode="single"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Total Amount</p>
            <p className="text-2xl font-bold">${price.toFixed(2)}</p>
          </div>
          <Button
            type="submit"
            disabled={isSubmitting || !selectedPaymentMethods.length}
          >
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isSubmitting ? "Submitting..." : "Submit Request"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
