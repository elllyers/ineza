export type PaymentMethodType =
  | "MTN_MONEY"
  | "AIRTEL_MONEY"
  | "BANK_TRANSFER"
  | "CARD";
export type ServiceType = "BANKING" | "IREMBO" | "WRITING";
export type RequestStatus =
  | "PENDING"
  | "PROCESSING"
  | "COMPLETED"
  | "CANCELLED";
export type PaymentStatus = "PENDING" | "PAID" | "FAILED" | "REFUNDED";

export interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  type: ServiceType;
  createdAt: Date;
  updatedAt: Date;
  formFields: Record<string, unknown>;
  paymentMethods: PaymentMethod[];
}

export interface PaymentMethod {
  id: string;
  type: PaymentMethodType;
  serviceId: string;
  name: string;
  enabled: boolean;
}

export interface ServiceRequestData {
  serviceId: string;
  formData: Record<string, unknown>;
  paymentMethod: PaymentMethodType;
  amount: number;
}
