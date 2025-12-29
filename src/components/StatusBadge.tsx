import { statusLabels } from '../data/static';
import type { OrderStatus } from '../hooks/useOrders';

const statusColor: Record<OrderStatus, string> = {
  payment_pending: 'bg-amber-100 text-amber-800',
  paid: 'bg-emerald-100 text-emerald-800',
  production: 'bg-blue-100 text-blue-800',
  shipping: 'bg-indigo-100 text-indigo-800',
  delivered: 'bg-slate-100 text-slate-800',
  cancelled: 'bg-rose-100 text-rose-800',
};

export const StatusBadge = ({ status }: { status: OrderStatus }) => (
  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColor[status]}`}>{statusLabels[status]}</span>
);
