import { NextResponse } from "next/server";
import { ZodError, ZodSchema } from "zod";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export type ApiError = {
  error: string;
  code?: string;
  details?: unknown;
  validationErrors?: Record<string, string[]>;
};

export type ApiResponse<T> = {
  data?: T;
  error?: ApiError;
  metadata?: {
    page?: number;
    perPage?: number;
    total?: number;
  };
};

export class ApiValidationError extends Error {
  constructor(
    message: string,
    public validationErrors: Record<string, string[]>
  ) {
    super(message);
    this.name = "ApiValidationError";
  }
}

export class ApiAuthorizationError extends Error {
  constructor(message: string = "Unauthorized") {
    super(message);
    this.name = "ApiAuthorizationError";
  }
}

export function createApiResponse<T>(
  data: T,
  status = 200,
  headers?: Record<string, string>,
  metadata?: ApiResponse<T>["metadata"]
) {
  return NextResponse.json(
    { data, ...(metadata ? { metadata } : {}) },
    {
      status,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    }
  );
}

export function createApiError(
  error: Error | string,
  status = 500,
  code?: string,
  details?: unknown
) {
  let errorResponse: ApiError;

  if (error instanceof ApiValidationError) {
    status = 400;
    errorResponse = {
      error: error.message,
      code: "VALIDATION_ERROR",
      validationErrors: error.validationErrors,
    };
  } else if (error instanceof ApiAuthorizationError) {
    status = 401;
    errorResponse = {
      error: error.message,
      code: "UNAUTHORIZED",
    };
  } else if (error instanceof ZodError) {
    status = 400;
    errorResponse = {
      error: "Validation failed",
      code: "VALIDATION_ERROR",
      validationErrors: formatZodError(error),
    };
  } else if (error instanceof PrismaClientKnownRequestError) {
    errorResponse = handlePrismaError(error);
  } else {
    errorResponse = {
      error: typeof error === "string" ? error : error.message,
      ...(code ? { code } : {}),
      ...(details ? { details } : {}),
    };
  }

  return NextResponse.json(errorResponse, {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export async function validateJsonRequest<T>(
  request: Request,
  schema?: ZodSchema<T>
): Promise<T> {
  const contentType = request.headers.get("content-type");
  if (!contentType?.includes("application/json")) {
    throw new ApiValidationError(
      "Invalid content type. Expected application/json",
      {}
    );
  }

  try {
    const data = await request.json();
    if (schema) {
      return schema.parse(data);
    }
    return data;
  } catch (error) {
    if (error instanceof ZodError) {
      throw new ApiValidationError("Validation failed", formatZodError(error));
    }
    throw new Error("Invalid JSON payload");
  }
}

export function validateRequiredFields<T extends Record<string, unknown>>(
  data: T,
  requiredFields: (keyof T)[]
): void {
  const missingFields = requiredFields.filter((field) => !(field in data));
  if (missingFields.length > 0) {
    throw new ApiValidationError("Missing required fields", {
      fields: missingFields.map(
        (field) => `Field "${String(field)}" is required`
      ),
    });
  }
}

export const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
  "Cache-Control": "no-store, max-age=0",
} as const;

function formatZodError(error: ZodError): Record<string, string[]> {
  const errors: Record<string, string[]> = {};

  for (const issue of error.errors) {
    const path = issue.path.join(".");
    if (!errors[path]) {
      errors[path] = [];
    }
    errors[path].push(issue.message);
  }

  return errors;
}

function handlePrismaError(error: any): ApiError {
  // Cast to Prisma error type
  const prismaError = error as {
    code: string;
    meta?: { target?: string[]; field_name?: string };
  };

  switch (prismaError.code) {
    case "P2002":
      return {
        error: "A unique constraint would be violated.",
        code: "UNIQUE_CONSTRAINT_VIOLATION",
        details: {
          fields: prismaError.meta?.target,
        },
      };
    case "P2025":
      return {
        error: "Record not found.",
        code: "NOT_FOUND",
      };
    case "P2003":
      return {
        error: "Foreign key constraint failed.",
        code: "FOREIGN_KEY_CONSTRAINT",
        details: {
          fields: prismaError.meta?.field_name,
        },
      };
    default:
      return {
        error: "An unexpected database error occurred.",
        code: prismaError.code,
        details: error.message,
      };
  }
}

export function isValidUUID(uuid: string): boolean {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
}
