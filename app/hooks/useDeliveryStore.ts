"use client";

import { useState, useEffect } from 'react';
import {
  fetchAvailableOrders,
  fetchAssignedOrders,
  fetchDeliveryHistory,
  claimDeliveryOrder,
  markOrderPickedUp,
  markOrderDelivered,
  tryFormatAddress,
  formatCurrency,
  BackendOrder,
} from "@/lib/delivery";

export type DeliveryOrder = {
  id: string;
  status: 'pending' | 'accepted' | 'picked_up' | 'awaiting_otp' | 'delivered' | 'cancelled';
  distance: string;
  pickupAddress: string;
  deliveryAddress: string;
  customerName: string;
  earnings: string;
};

function mapBackendOrderToDeliveryOrder(order: BackendOrder): DeliveryOrder {
  const pickupAddr = tryFormatAddress(order.shop?.address);
  const deliveryAddr = tryFormatAddress(order.deliveryInfo?.address);
  const currency = order.pricing?.currency || 'INR';
  const earning = formatCurrency(order.pricing?.deliveryFee ?? 0, currency);
  // Map backend status to UI status
  const uiStatus: DeliveryOrder['status'] =
    order.status === 'DELIVERED'
      ? 'delivered'
      : order.status === 'OUT_FOR_DELIVERY'
      ? 'accepted'
      : 'pending';

  return {
    id: order.id,
    status: uiStatus,
    distance: '—',
    pickupAddress: pickupAddr,
    deliveryAddress: deliveryAddr,
    customerName: order.customer?.name || '',
    earnings: earning,
  };
}

export const useDeliveryStore = () => {
  const [orders, setOrders] = useState<DeliveryOrder[]>([]);
  const [activeOrder, setActiveOrder] = useState<DeliveryOrder | null>(null);
  const [completedOrders, setCompletedOrders] = useState<DeliveryOrder[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      try {
        // Available orders
        const available = await fetchAvailableOrders(1, 10);
        setOrders(available.orders.map(mapBackendOrderToDeliveryOrder));

        // Assigned (in-progress) orders -> pick first as active
        const assigned = await fetchAssignedOrders(1, 10);
        const assignedOrders = assigned.orders.map(mapBackendOrderToDeliveryOrder);
        if (assignedOrders.length > 0) {
          // Mark as accepted in UI
          setActiveOrder({ ...assignedOrders[0], status: 'accepted' });
        }

        // History -> completed orders list
        const history = await fetchDeliveryHistory(1, 10);
        setCompletedOrders(
          history.orders.map(mapBackendOrderToDeliveryOrder).map(o => ({ ...o, status: 'delivered' }))
        );
      } catch (e) {
        console.error('Failed to initialize delivery store', e);
      } finally {
        setIsInitialized(true);
        setLoading(false);
      }
    };
    init();
  }, []);

  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem('delivery_activeOrder', JSON.stringify(activeOrder));
      localStorage.setItem('delivery_completedOrders', JSON.stringify(completedOrders));
    } catch (e) {
      console.error('Could not save delivery state to localStorage', e);
    }
  }, [activeOrder, completedOrders, isInitialized]);

  const acceptOrder = async (orderId: string) => {
    if (activeOrder) return false;
    try {
      const serverOrder = await claimDeliveryOrder(orderId);
      const uiOrder = mapBackendOrderToDeliveryOrder(serverOrder);
      const updatedOrder = { ...uiOrder, status: 'accepted' as const };
      setActiveOrder(updatedOrder);
      setOrders(current => current.filter(o => o.id !== orderId));
      return true;
    } catch (e) {
      console.error('Failed to claim order', e);
      return false;
    }
  };

  const updateActiveOrderStatus = async (newStatus: 'picked_up' | 'awaiting_otp' | 'cancelled') => {
    if (!activeOrder) return false;
    try {
      if (newStatus === 'picked_up') {
        await markOrderPickedUp(activeOrder.id);
      }
      // 'awaiting_otp' is a client-side intermediate step before delivery confirmation
      const updatedOrder = { ...activeOrder, status: newStatus };
      if (newStatus === 'cancelled') {
        setCompletedOrders(current => [updatedOrder, ...current]);
        setActiveOrder(null);
      } else {
        setActiveOrder(updatedOrder);
      }
      return true;
    } catch (e) {
      console.error('Failed to update order status', e);
      return false;
    }
  };

  const confirmDeliveryWithOtp = async (otp: string) => {
    if (!activeOrder || otp.length !== 4) return false;
    try {
      await markOrderDelivered(activeOrder.id);
      const updatedOrder = { ...activeOrder, status: 'delivered' as const };
      setCompletedOrders(current => [updatedOrder, ...current]);
      setActiveOrder(null);
      return true;
    } catch (e) {
      console.error('Failed to confirm delivery', e);
      return false;
    }
  };

  return { orders, activeOrder, completedOrders, acceptOrder, updateActiveOrderStatus, confirmDeliveryWithOtp, loading };
};

