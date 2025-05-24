"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertCircle,
  ArrowDown,
  ArrowUp,
  Eye,
  MoreVertical,
  RefreshCw,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { RequestStatus, PaymentStatus } from "@/types/service";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import debounce from "lodash/debounce";

interface ServiceRequest {
  id: string;
  serviceId: string;
  userId: string;
  formData: Record<string, unknown>;
  status: RequestStatus;
  paymentMethod: string;
  paymentStatus: PaymentStatus;
  amount: number;
  createdAt: string;
  updatedAt: string;
  service: {
    title: string;
    description: string;
  };
  user: {
    name: string;
    email: string;
  };
}

interface ServiceRequestsProps {
  status?: string;
}

const statusColors = {
  PENDING: "bg-yellow-500/20 text-yellow-500",
  PROCESSING: "bg-purple-500/20 text-purple-500",
  COMPLETED: "bg-emerald-500/20 text-emerald-500",
  CANCELLED: "bg-red-500/20 text-red-500",
} as const;

const paymentStatusColors = {
  PENDING: "bg-yellow-500/20 text-yellow-500",
  PAID: "bg-emerald-500/20 text-emerald-500",
  FAILED: "bg-red-500/20 text-red-500",
  REFUNDED: "bg-blue-500/20 text-blue-500",
} as const;

type RequestStatusKey = keyof typeof statusColors;
type PaymentStatusKey = keyof typeof paymentStatusColors;

export default function ServiceRequests({
  status = "all",
}: ServiceRequestsProps) {
  const { user, isLoaded } = useUser();
  const { toast } = useToast();
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retrying, setRetrying] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState<string>("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 10;

  // Debounced search function
  const debouncedSearch = debounce((query: string) => {
    setPage(1); // Reset to first page on new search
    setSearchQuery(query);
  }, 300);

  useEffect(() => {
    if (isLoaded && user) {
      fetchRequests();
    }
  }, [isLoaded, user, status, page, searchQuery, sortBy, sortOrder]);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      setError(null);
      const url = new URL("/api/service-requests", window.location.origin);

      // Add query parameters
      if (status !== "all") {
        url.searchParams.append("status", status);
      }
      if (searchQuery) {
        url.searchParams.append("query", searchQuery);
      }
      url.searchParams.append("page", page.toString());
      url.searchParams.append("limit", itemsPerPage.toString());
      url.searchParams.append("sortBy", sortBy);
      url.searchParams.append("sortOrder", sortOrder);

      const response = await fetch(url.toString());
      if (!response.ok) {
        throw new Error(`Failed to fetch requests: ${response.statusText}`);
      }

      const result = await response.json();
      if ("error" in result) {
        throw new Error(result.error);
      }

      setRequests(result.data || []);
      setTotalItems(result.metadata.total);
      setTotalPages(Math.ceil(result.metadata.total / itemsPerPage));
    } catch (error) {
      console.error("Failed to fetch service requests:", error);
      setError(
        error instanceof Error ? error.message : "Failed to load requests"
      );
    } finally {
      setLoading(false);
      setRetrying(false);
    }
  };

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleRetry = () => {
    setRetrying(true);
    fetchRequests();
  };

  if (!isLoaded || loading) {
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
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <Input
            placeholder="Search service requests..."
            value={searchQuery}
            onChange={(e) => debouncedSearch(e.target.value)}
            className="max-w-sm"
          />
        </div>
        <div className="mt-4 md:mt-0 md:ml-4">
          <Select
            onValueChange={(value) => setSortBy(value)}
            defaultValue={sortBy}
          >
            <SelectTrigger className="max-w-xs">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="createdAt">Date Created</SelectItem>
              <SelectItem value="amount">Amount</SelectItem>
              <SelectItem value="status">Status</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Table>
        <TableCaption>List of service requests</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Service</TableHead>
            <TableHead>User</TableHead>
            <TableHead>
              Status
              <Button
                variant="link"
                size="sm"
                onClick={() => handleSort("status")}
                className="ml-2"
              >
                {sortBy === "status" && sortOrder === "asc" ? (
                  <ArrowUp className="h-4 w-4" />
                ) : (
                  <ArrowDown className="h-4 w-4" />
                )}
              </Button>
            </TableHead>
            <TableHead>
              Payment
              <Button
                variant="link"
                size="sm"
                onClick={() => handleSort("paymentStatus")}
                className="ml-2"
              >
                {sortBy === "paymentStatus" && sortOrder === "asc" ? (
                  <ArrowUp className="h-4 w-4" />
                ) : (
                  <ArrowDown className="h-4 w-4" />
                )}
              </Button>
            </TableHead>
            <TableHead>
              Amount
              <Button
                variant="link"
                size="sm"
                onClick={() => handleSort("amount")}
                className="ml-2"
              >
                {sortBy === "amount" && sortOrder === "asc" ? (
                  <ArrowUp className="h-4 w-4" />
                ) : (
                  <ArrowDown className="h-4 w-4" />
                )}
              </Button>
            </TableHead>
            <TableHead>
              Date
              <Button
                variant="link"
                size="sm"
                onClick={() => handleSort("createdAt")}
                className="ml-2"
              >
                {sortBy === "createdAt" && sortOrder === "asc" ? (
                  <ArrowUp className="h-4 w-4" />
                ) : (
                  <ArrowDown className="h-4 w-4" />
                )}
              </Button>
            </TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.map((request) => (
            <TableRow key={request.id} className="hover:bg-gray-800/50">
              <TableCell className="font-medium">
                {request.service?.title}
              </TableCell>
              <TableCell>{request.user?.name}</TableCell>
              <TableCell>
                <Badge
                  className={statusColors[request.status as RequestStatusKey]}
                >
                  {request.status.toLowerCase()}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  className={
                    paymentStatusColors[
                      request.paymentStatus as PaymentStatusKey
                    ]
                  }
                >
                  {request.paymentStatus.toLowerCase()}
                </Badge>
              </TableCell>
              <TableCell>{request.amount.toLocaleString()} RWF</TableCell>
              <TableCell>
                {new Date(request.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hover:bg-gray-800"
                    title="View Details"
                    onClick={() =>
                      (window.location.href = `/dashboard/requests/${request.id}`)
                    }
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hover:bg-gray-800"
                    title="More Actions"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}

          {requests.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8">
                <p className="text-gray-400">No service requests found</p>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between py-4">
        <div className="flex-1 min-w-0">
          <p className="text-sm text-gray-500">
            Showing{" "}
            <span className="font-medium">{(page - 1) * itemsPerPage + 1}</span>
            {" - "}
            <span className="font-medium">
              {Math.min(page * itemsPerPage, totalItems)}
            </span>
            {" of "}
            <span className="font-medium">{totalItems}</span> results
          </p>
        </div>
        <div className="mt-4 md:mt-0 md:ml-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className="mr-2"
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
