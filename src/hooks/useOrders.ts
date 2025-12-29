import { useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { Product } from '../data/static';

export type OrderStatus =
  | 'payment_pending'
  | 'paid'
  | 'production'
  | 'shipping'
  | 'delivered'
  | 'cancelled';

export interface OrderItemInput {
  product: Product;
  qty: number;
}

export interface OrderRecord {
  id: string;
  status: OrderStatus;
  deposit_name: string | null;
  deposit_due_at: string | null;
  memo: string | null;
  created_at: string;
  total?: number;
  user_id?: string;
}

export const useOrders = () => {
  const createOrder = useCallback(async (items: OrderItemInput[], memo?: string, depositName?: string) => {
    const total = items.reduce((sum, item) => sum + item.product.price_krw * item.qty, 0);
    const { data: order, error } = await supabase
      .from('orders')
      .insert({ status: 'payment_pending', memo, deposit_name: depositName })
      .select('*')
      .single();

    if (error) throw error;
    const orderItems = items.map((item) => ({
      order_id: order.id,
      product_id: item.product.id,
      qty: item.qty,
      unit_price_krw: item.product.price_krw,
    }));
    const { error: itemError } = await supabase.from('order_items').insert(orderItems);
    if (itemError) throw itemError;
    return { ...order, total } as OrderRecord;
  }, []);

  const updateDepositName = useCallback(async (orderId: string, depositName: string) => {
    const { error } = await supabase.from('orders').update({ deposit_name: depositName }).eq('id', orderId);
    if (error) throw error;
  }, []);

  const listMyOrders = useCallback(async () => {
    const { data, error } = await supabase
      .from('orders')
      .select('*, order_items(unit_price_krw, qty)')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return (data ?? []).map((order) => ({
      ...order,
      total: order.order_items?.reduce(
        (sum: number, item: { unit_price_krw: number; qty: number }) => sum + item.unit_price_krw * item.qty,
        0,
      ) ?? 0,
    })) as OrderRecord[];
  }, []);

  const listAllOrders = useCallback(async (status?: OrderStatus) => {
    let query = supabase.from('orders').select('*, order_items(unit_price_krw, qty), profiles:auth.users(email)').order('created_at', {
      ascending: false,
    });
    if (status) {
      query = query.eq('status', status);
    }
    const { data, error } = await query;
    if (error) throw error;
    return (data ?? []).map((order) => ({
      ...order,
      total: order.order_items?.reduce(
        (sum: number, item: { unit_price_krw: number; qty: number }) => sum + item.unit_price_krw * item.qty,
        0,
      ) ?? 0,
    })) as OrderRecord[];
  }, []);

  const updateOrderStatus = useCallback(async (orderId: string, status: OrderStatus) => {
    const { error } = await supabase.from('orders').update({ status }).eq('id', orderId);
    if (error) throw error;
  }, []);

  return { createOrder, updateDepositName, listMyOrders, listAllOrders, updateOrderStatus };
};
