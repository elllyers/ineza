import { useAuth } from "@clerk/nextjs";

const getAdminIds = () => {
  const adminIds = process.env.ADMIN_IDS;
  if (!adminIds) {
    console.warn("ADMIN_IDS environment variable is not set");
    return [];
  }
  return adminIds.split(",").map((id) => id.trim());
};

export function isAdmin(userId?: string | null) {
  try {
    if (!userId) {
      const { userId: clerkUserId } = useAuth();
      userId = clerkUserId;
    }

    if (!userId) return false;

    const adminIds = getAdminIds();
    return adminIds.includes(userId);
  } catch (error) {
    console.error("Error checking admin status:", error);
    return false;
  }
}

export async function requireAdmin() {
  const isUserAdmin = await isAdmin();
  if (!isUserAdmin) {
    throw new Error("Unauthorized: Admin access required");
  }
}

export type AdminError = {
  code: string;
  message: string;
  status: number;
};

export function createAdminError(
  code: string,
  message = "Unauthorized",
  status = 403
): AdminError {
  return { code, message, status };
}
