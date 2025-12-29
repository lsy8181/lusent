import { useEffect, useState } from 'react';
import { useOrders, type OrderRecord } from '../hooks/useOrders';
import { Link } from 'react-router-dom';

export const AdminHomePage = () => {
  const { listAllOrders } = useOrders();
  const [orders, setOrders] = useState<OrderRecord[]>([]);

  useEffect(() => {
    document.title = 'Admin | Lucent';
    const fetchOrders = async () => {
      try {
        const data = await listAllOrders();
        setOrders(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchOrders();
  }, [listAllOrders]);

  const count = (status: OrderRecord['status']) => orders.filter((o) => o.status === status).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-extrabold">관리자 홈</h1>
        <Link to="/admin/orders" className="button-primary">
          주문 관리로 이동
        </Link>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="card">
          <p className="text-sm text-slate-600">입금확인중</p>
          <p className="text-3xl font-bold text-amber-600">{count('payment_pending')}</p>
        </div>
        <div className="card">
          <p className="text-sm text-slate-600">제작중</p>
          <p className="text-3xl font-bold text-blue-600">{count('production')}</p>
        </div>
        <div className="card">
          <p className="text-sm text-slate-600">발송중/완료</p>
          <p className="text-3xl font-bold text-emerald-600">{count('shipping') + count('delivered')}</p>
        </div>
      </div>
    </div>
  );
};
