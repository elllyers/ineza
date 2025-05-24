import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type SearchParams = {
  query?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};

export function buildSearchQuery(params: SearchParams) {
  const { query, sortBy, sortOrder } = params;
  let where = {};

  if (query) {
    where = {
      OR: [
        { title: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
      ],
    };
  }

  const orderBy = sortBy ? { [sortBy]: sortOrder || "asc" } : undefined;

  return {
    where,
    orderBy,
    skip: params.page ? (params.page - 1) * (params.limit || 10) : 0,
    take: params.limit || 10,
  };
}
