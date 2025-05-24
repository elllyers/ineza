# Services Page Specification

## Overview

Create a comprehensive services section for the Ineza platform using Next.js App Router (v13+) that displays available services and allows users to request them through dynamic forms, with admin capabilities and payment integration.

## Project Structure

The services feature should be implemented within the existing project structure:

- Root path: `/app/(root)/(home)/(services)/services/`
- Current service pages: banking, irembo, writings

## Core Requirements

### 1. Authentication & Authorization (Clerk Integration)

- Integrate Clerk for user authentication
- Define user roles:
  - Admin: Can manage services and view all requests
  - Client: Can request services and view their own requests
- Protect admin routes using Clerk middleware
- Add user context to service requests

### 2. Services Sidebar

- Create a persistent sidebar component that remains visible across all service routes
- Display a list of all available services with clickable links
- Highlight the currently active service
- Make sidebar responsive (collapsible on mobile)
- Show admin options when logged in as admin

### 3. Dynamic Service Routes

- Implement dynamic routing at
- Each service page should load content based on its ID
- Existing services (banking, irembo, writings) should be integrated into this system

### 4. Service Content Display

For each service page, display:

- Service title (prominent heading)
- Service description (detailed paragraph)
- Service price and available payment methods
- Custom request form with fields specific to that service

### 5. Payment Integration

- Display service pricing prominently
- Implement payment method selection:
  - Mobile Money (MTN, Airtel)
  - Bank Transfer
  - Credit/Debit Card
- Show payment status and history
- Handle payment confirmations

### 6. Service-Specific Dynamic Forms

- Create unique forms for each service type with appropriate fields:

  - **Banking Services**:

    - Account number (text)
    - Bank name (select)
    - ID number (text)
    - Phone number (tel)
    - Transaction type (select: deposit, withdrawal, transfer)
    - Amount (number)
    - Purpose (textarea, optional)

  - **Irembo Services**:

    - Service type (select: certificate, permit, license)
    - Full name (text)
    - National ID (text)
    - Phone number (tel)
    - District (select)
    - Sector (select, dependent on district)
    - Additional details (textarea, optional)
    - Document upload (file, optional)

  - **Writing Services**:
    - Document type (select: essay, report, letter)
    - Topic/Subject (text)
    - Word count (number)
    - Deadline (date)
    - Special instructions (textarea, optional)
    - Reference materials (file upload, optional)

- Implement form validation specific to each service type
- Auto-populate fields when possible from user profile
- Include conditional fields that appear based on previous selections
- "Get Service" button that initiates payment flow

### 7. Admin Dashboard

- Protected route for admin access only
- Features:
  - Add new services
  - Edit existing services and their form requirements
  - View all service requests
  - Manage pricing
  - View payment status
  - Generate reports

### 8. Data Structure

Create a data file at `/data/services.ts` with the following structure:

```typescript
export interface PaymentMethod {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
}

export interface ServiceRequirement {
  name: string; // Field name (e.g., "accountNumber")
  label: string; // Display label (e.g., "Account Number")
  type: string; // Input type (e.g., "text", "email", "select", "textarea", "file", "tel", "number", "date")
  options?: string[]; // For select inputs only
  required?: boolean; // Whether field is required
  placeholder?: string; // Placeholder text
  validation?: {
    // Validation rules
    pattern?: string; // Regex pattern
    minLength?: number;
    maxLength?: number;
    min?: number; // For number inputs
    max?: number; // For number inputs
    errorMessage?: string; // Custom error message
  };
  dependsOn?: {
    // For conditional fields
    field: string; // Field name this depends on
    value: any; // Value that triggers this field to show
  };
}

export interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  requirements: ServiceRequirement[];
  availablePaymentMethods: string[]; // IDs of payment methods
  createdAt: Date;
  updatedAt: Date;
  createdBy: string; // Admin's Clerk ID
  active: boolean;
}

export interface ServiceRequest {
  id: string;
  serviceId: string;
  userId: string; // Clerk user ID
  formData: Record<string, any>;
  status: "pending" | "paid" | "processing" | "completed" | "cancelled";
  paymentMethod: string;
  paymentStatus: "pending" | "completed" | "failed";
  amount: number;
  createdAt: Date;
  updatedAt: Date;
}

// Example service definitions
export const services: Service[] = [
  {
    id: "banking",
    title: "Banking Services",
    description:
      "Secure banking services including deposits, withdrawals, and transfers.",
    price: 5000,
    currency: "RWF",
    requirements: [
      {
        name: "accountNumber",
        label: "Account Number",
        type: "text",
        required: true,
        validation: {
          pattern: "^[0-9]{10,16}$",
          errorMessage: "Please enter a valid account number",
        },
      },
      // Additional fields as specified above
    ],
    // Other properties
  },
  // Other services
];
```

### 9. Components to Build

1. `Sidebar.tsx`: Navigation component showing all services
2. `ServiceForm.tsx`: Dynamic form generator based on service requirements
3. `ServiceDetails.tsx`: Component to display service title, description, and pricing
4. `PaymentSelector.tsx`: Component for selecting payment method
5. `AdminDashboard.tsx`: Admin interface for managing services
6. `ServiceEditor.tsx`: Form for adding/editing services
7. `app/services/[serviceId]/page.tsx`: Page that fetches and displays the selected service
8. `app/services/admin/page.tsx`: Admin dashboard page
9. `FormField.tsx`: Reusable component for rendering different form field types

### 10. Styling

- Use Tailwind CSS for all styling
- Ensure consistent design with the rest of the application
- Make all components fully responsive
- Use the existing dark theme (black background)

### 11. API Routes

- `/api/services`: CRUD operations for services (admin only)
- `/api/requests`: Handle service requests
- `/api/payments`: Handle payment processing
- `/api/admin/stats`: Get admin dashboard statistics

## Optional Enhancements

- Create a `not-found.tsx` page for handling unknown service IDs
- Add smooth transitions between service pages
- Implement form submission feedback (success/error messages)
- Add loading states during page transitions
- Email notifications for service requests and payments
- PDF generation for receipts
- Service request tracking system
- Save draft functionality for complex forms

## Implementation Notes

- Ensure the sidebar remains visible when navigating between services
- Maintain the existing layout structure with the black background
- Integrate with the current project structure and styling approach
- Use Clerk's user roles and permissions for admin access
- Implement proper error handling for payment processing
- Add request rate limiting for API routes
- Ensure proper validation for all admin operations
- Use React Hook Form for form state management and validation
