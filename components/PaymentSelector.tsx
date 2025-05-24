"use client";

import { useState } from "react";

export interface PaymentMethod {
  id: string;
  type: string;
  name: string;
  enabled: boolean;
}

interface PaymentSelectorProps {
  selectedMethods: PaymentMethod[];
  onChange: (methods: PaymentMethod[]) => void;
  mode?: "single" | "multiple";
}

const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: "mtn",
    type: "MTN_MONEY",
    name: "MTN Mobile Money",
    enabled: false,
  },
  {
    id: "airtel",
    type: "AIRTEL_MONEY",
    name: "Airtel Money",
    enabled: false,
  },
  {
    id: "bank",
    type: "BANK_TRANSFER",
    name: "Bank Transfer",
    enabled: false,
  },
  {
    id: "card",
    type: "CARD",
    name: "Credit/Debit Card",
    enabled: false,
  },
];

export function PaymentSelector({
  selectedMethods,
  onChange,
  mode = "multiple",
}: PaymentSelectorProps) {
  const [methods, setMethods] = useState(
    PAYMENT_METHODS.map((method) => ({
      ...method,
      enabled: selectedMethods.some((m) => m.id === method.id),
    }))
  );

  const handleToggle = (methodId: string) => {
    if (mode === "single") {
      const updatedMethods = methods.map((method) => ({
        ...method,
        enabled: method.id === methodId,
      }));
      setMethods(updatedMethods);
      onChange(updatedMethods.filter((m) => m.enabled));
    } else {
      const updatedMethods = methods.map((method) =>
        method.id === methodId
          ? { ...method, enabled: !method.enabled }
          : method
      );
      setMethods(updatedMethods);
      onChange(updatedMethods.filter((m) => m.enabled));
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {methods.map((method) => (
        <div
          key={method.id}
          onClick={() => handleToggle(method.id)}
          className={`flex cursor-pointer items-center justify-between rounded-lg border-2 p-4 hover:bg-accent hover:text-accent-foreground ${
            method.enabled
              ? "border-primary bg-primary/5"
              : "border-muted bg-popover"
          }`}
        >
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-xl font-bold text-primary">
              {method.name.charAt(0)}
            </div>
            <div>
              <h3 className="font-semibold">{method.name}</h3>
              <p className="text-sm text-muted-foreground">
                {method.type.split("_").join(" ").toLowerCase()}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
