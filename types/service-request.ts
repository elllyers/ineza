export interface ServiceRequest {
  id: string;
  serviceId: string;
  userId: string;
  formData: Record<string, any>;
  status: "pending" | "paid" | "processing" | "completed" | "cancelled";
  paymentMethod: string;
  paymentStatus: "pending" | "completed" | "failed";
  amount: number;
  createdAt: Date;
  updatedAt: Date;
  service?: {
    title: string;
    description: string;
  };
  user?: {
    name: string;
    email: string;
  };
}
