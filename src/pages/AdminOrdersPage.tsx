import { useEffect, useState } from 'react';
import { StatusBadge } from '../components/StatusBadge';
import { useOrders, type OrderRecord, type OrderStatus } from '../hooks/useOrders';
import { statusLabels } from '../data/static';

export const AdminOrdersPage = () => {
  const { listAllOrders, updateOrderStatus } = useOrders();
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [filter, setFilter] = useState<OrderStatus | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = '주문 관리 | Admin';
    fetchOrders();
  }, [filter]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await listAllOrders(filter);
      setOrders(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (id: string, status: OrderStatus) => {
    await updateOrderStatus(id, status);
    fetchOrders();
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-extrabold">주문 관리</h1>
      <div className="flex flex-wrap gap-2">
        {(['payment_pending', 'paid', 'production', 'shipping', 'delivered', 'cancelled'] as OrderStatus[]).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s === filter ? undefined : s)}
            className={`px-3 py-2 rounded-md text-sm border ${filter === s ? 'bg-brand text-white' : 'bg-white hover:bg-slate-50'}`}
          >
            {statusLabels[s]}
          </button>
        ))}
      </div>
      {loading ? (
        <p>불러오는 중...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-slate-200 rounded-lg">
            <thead className="bg-slate-50 text-left">
              <tr>
                <th className="px-4 py-2 text-sm">주문일</th>
                <th className="px-4 py-2 text-sm">주문번호</th>
                <th className="px-4 py-2 text-sm">입금자명</th>
                <th className="px-4 py-2 text-sm">총액</th>
                <th className="px-4 py-2 text-sm">상태</th>
                <th className="px-4 py-2 text-sm">액션</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-t">
                  <td className="px-4 py-3 text-sm">{new Date(order.created_at).toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm font-mono">{order.id.slice(0, 8).toUpperCase()}</td>
                  <td className="px-4 py-3 text-sm">{order.deposit_name || '-'}</td>
                  <td className="px-4 py-3 text-sm">₩{order.total?.toLocaleString() ?? '0'}</td>
                  <td className="px-4 py-3 text-sm">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="px-4 py-3 text-sm space-x-2">
                    {order.status === 'payment_pending' && (
                      <button className="button-primary" onClick={() => handleUpdate(order.id, 'paid')}>
                        입금 확인
                      </button>
                    )}
                    {order.status === 'paid' && (
                      <button className="button-secondary" onClick={() => handleUpdate(order.id, 'production')}>
                        제작중
                      </button>
                    )}
                    {order.status === 'production' && (
                      <button className="button-secondary" onClick={() => handleUpdate(order.id, 'shipping')}>
                        발송중
                      </button>
                    )}
                    {order.status === 'shipping' && (
                      <button className="button-secondary" onClick={() => handleUpdate(order.id, 'delivered')}>
                        배송완료
                      </button>
                    )}
                    {order.status !== 'cancelled' && (
                      <button className="text-rose-600 underline" onClick={() => handleUpdate(order.id, 'cancelled')}>
                        취소
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
