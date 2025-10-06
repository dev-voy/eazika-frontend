import axiosInstance, { isAxiosError } from "./axios";

export interface BackendOrderItem {
  id: string;
  quantity: number;
  price: number;
}

export interface BackendOrder {
  id: string;
  orderNumber: string;
  status: string;
  createdAt?: string;
  deliveredAt?: string | null;
  customer?: { id: string; name?: string | null; phone?: string | null };
  shop?: { id: string; name?: string | null; address?: any };
  orderItems?: BackendOrderItem[];
  pricing?: { subtotal?: number; deliveryFee?: number; totalAmount?: number; currency?: string };
  deliveryInfo?: { address?: any; notes?: string | null } & Record<string, unknown>;
}

export interface PaginatedResponse<T> {
  orders: T[];
  pagination: { page: number; limit: number; total: number; pages: number };
}

export async function fetchAvailableOrders(page = 1, limit = 10) {
  const response = await axiosInstance.get<{ data: PaginatedResponse<BackendOrder> }>(
    `/delivery/orders/available`,
    { params: { page, limit } }
  );
  return response.data.data;
}

export async function claimDeliveryOrder(orderId: string) {
  const response = await axiosInstance.patch<{ data: BackendOrder }>(
    `/delivery/orders/${orderId}/claim`
  );
  return response.data.data;
}

export async function markOrderPickedUp(orderId: string) {
  const response = await axiosInstance.patch<{ data: BackendOrder }>(
    `/delivery/orders/${orderId}/pickedup`
  );
  return response.data.data;
}

export async function markOrderDelivered(orderId: string) {
  const response = await axiosInstance.patch<{ data: BackendOrder }>(
    `/delivery/orders/${orderId}/delivered`
  );
  return response.data.data;
}

export async function fetchAssignedOrders(page = 1, limit = 10) {
  const response = await axiosInstance.get<{ data: PaginatedResponse<BackendOrder> }>(
    `/delivery/orders/assigned`,
    { params: { page, limit } }
  );
  return response.data.data;
}

export async function fetchDeliveryHistory(page = 1, limit = 10) {
  const response = await axiosInstance.get<{ data: PaginatedResponse<BackendOrder> }>(
    `/delivery/orders/history`,
    { params: { page, limit } }
  );
  return response.data.data;
}

export function tryFormatAddress(address: any): string {
  if (!address) return "";
  try {
    const line1 = address.line1 || address.addressLine1 || "";
    const line2 = address.line2 || address.addressLine2 || "";
    const city = address.city || "";
    const state = address.state || "";
    const pincode = address.pincode || address.postalCode || "";
    return [line1, line2, city, state, pincode].filter(Boolean).join(", ");
  } catch (_) {
    return typeof address === "string" ? address : "";
  }
}

export function formatCurrency(amount?: number, currency: string = "INR"): string {
  if (typeof amount !== "number") return "₹0.00";
  try {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch (_) {
    return `₹${amount.toFixed(2)}`;
  }
}


