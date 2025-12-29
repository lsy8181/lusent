import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useOrders, type OrderRecord } from '../hooks/useOrders';
import { depositInfo, statusLabels } from '../data/static';
import { StatusBadge } from '../components/StatusBadge';

export const MyPage = () => {
  const { user } = useAuth();
  const { listMyOrders } = useOrders();
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = '마이페이지 | Lucent';
    const fetchOrders = async () => {
      try {
        const data = await listMyOrders();
        setOrders(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [listMyOrders]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-extrabold">마이페이지</h1>
      <p className="text-slate-700">{user?.email} 님의 주문 목록</p>
      {loading ? (
        <p>불러오는 중...</p>
      ) : orders.length === 0 ? (
        <p className="text-slate-600">아직 주문이 없습니다.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="card space-y-2">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-slate-500">주문번호 {order.id.slice(0, 8).toUpperCase()}</p>
                  <p className="font-semibold text-slate-900">{new Date(order.created_at).toLocaleString()}</p>
                </div>
                <StatusBadge status={order.status} />
              </div>
              <p className="text-sm text-slate-700">입금자명: {order.deposit_name || '미입력'}</p>
              <p className="text-sm text-slate-700">총액: ₩{order.total?.toLocaleString() ?? '0'}</p>
              <div className="rounded-lg bg-slate-50 border border-slate-200 p-3 text-sm">
                <p className="font-semibold text-slate-800">입금 안내</p>
                <p>은행: {depositInfo.bankName}</p>
                <p>계좌: {depositInfo.accountNumber} ({depositInfo.accountHolder})</p>
                <p className="text-slate-700 mt-1">입금 확인 후 제작/발송이 진행됩니다.</p>
                {order.status !== 'payment_pending' && order.status !== 'paid' ? (
                  <p className="text-emerald-700 font-semibold">입금 확인 완료. {statusLabels[order.status]}</p>
                ) : null}
              </div>
              {order.status !== 'payment_pending' && (
                <button className="button-secondary" onClick={() => alert('보이스팩 준비중입니다.')}>
                  보이스팩 다운로드 (준비중)
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
