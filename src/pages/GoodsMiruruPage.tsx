import { useEffect, useState } from 'react';
import { miruruProducts } from '../data/static';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { OrderModal } from '../components/OrderModal';
import { StatusBadge } from '../components/StatusBadge';
import { useOrders } from '../hooks/useOrders';

export const GoodsMiruruPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { createOrder, updateDepositName } = useOrders();
  const [orderId, setOrderId] = useState<string | null>(null);
  const [orderStatus, setOrderStatus] = useState<'payment_pending' | 'paid' | 'production' | 'shipping' | 'delivered' | 'cancelled'>('payment_pending');
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    document.title = 'Miruru 굿즈샵 | Lucent';
  }, []);

  const handlePurchase = async (productId: string) => {
    const product = miruruProducts.find((p) => p.id === productId);
    if (!product) return;
    if (!user) {
      navigate(`/login?redirect=${encodeURIComponent('/goods/miruru')}`);
      return;
    }
    try {
      const order = await createOrder([{ product, qty: 1 }]);
      setOrderId(order.id);
      setOrderStatus(order.status);
      setModalOpen(true);
    } catch (error) {
      console.error(error);
      alert('주문 생성 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="space-y-8">
      <div className="rounded-3xl bg-gradient-to-r from-brand-light to-white p-6 md:p-10 border border-brand/20 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-brand-dark">Miruru</p>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">미루루 굿즈샵</h1>
            <p className="text-slate-700">포근/다정/동물의 숲 느낌의 말랑한 하늘색 무드</p>
          </div>
          <div className="flex gap-3">
            <StatusBadge status="payment_pending" />
            <StatusBadge status="paid" />
          </div>
        </div>
      </div>

      <section className="card">
        <h2 className="section-title">프로모션</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="rounded-xl bg-white border border-brand/30 p-4 shadow-sm">
            <p className="font-semibold text-brand-dark">하늘색 테마</p>
            <p className="text-sm text-slate-700">부드러운 파스텔 톤 UI로 미루루의 분위기를 담았어요.</p>
          </div>
          <div className="rounded-xl bg-white border border-brand/30 p-4 shadow-sm">
            <p className="font-semibold text-brand-dark">보이스팩 재생 UI</p>
            <p className="text-sm text-slate-700">CD 플레이어 스타일의 플레이스홀더로 감성을 살렸어요.</p>
          </div>
          <div className="rounded-xl bg-white border border-brand/30 p-4 shadow-sm">
            <p className="font-semibold text-brand-dark">무통장 입금</p>
            <p className="text-sm text-slate-700">주문 후 바로 입금 안내를 제공합니다.</p>
          </div>
        </div>
      </section>

      <section className="card space-y-4">
        <h2 className="section-title">Voice Pack</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {miruruProducts
            .filter((p) => p.type === 'voice_pack')
            .map((product) => (
              <div key={product.id} className="rounded-xl bg-white border border-slate-100 shadow-sm p-4 flex flex-col gap-3">
                <div className="h-32 rounded-lg bg-gradient-to-br from-brand-light to-white flex items-center justify-center text-brand-dark font-semibold">
                  CD Player Placeholder
                </div>
                <div>
                  <p className="font-bold text-lg">{product.title}</p>
                  <p className="text-sm text-slate-700">{product.description}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-brand-dark">₩{product.price_krw.toLocaleString()}</p>
                  <button className="button-primary" onClick={() => handlePurchase(product.id)}>
                    구매
                  </button>
                </div>
              </div>
            ))}
        </div>
      </section>

      <section className="card space-y-4">
        <h2 className="section-title">Physical Goods</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {miruruProducts
            .filter((p) => p.type === 'physical')
            .map((product) => (
              <div key={product.id} className="rounded-xl bg-white border border-slate-100 shadow-sm p-4 flex flex-col gap-3">
                <div className="h-32 rounded-lg bg-gradient-to-br from-white to-brand-light flex items-center justify-center text-brand-dark font-semibold">
                  Miruru Illustration
                </div>
                <div>
                  <p className="font-bold text-lg">{product.title}</p>
                  <p className="text-sm text-slate-700">{product.description}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-brand-dark">₩{product.price_krw.toLocaleString()}</p>
                  <button className="button-primary" onClick={() => handlePurchase(product.id)}>
                    구매
                  </button>
                </div>
              </div>
            ))}
        </div>
      </section>

      {modalOpen && orderId && (
        <OrderModal
          order={{ id: orderId, status: orderStatus, deposit_name: null, deposit_due_at: null, memo: null, created_at: '' }}
          onClose={() => setModalOpen(false)}
          onDepositNameUpdate={async (value) => {
            await updateDepositName(orderId, value);
          }}
        />
      )}
    </div>
  );
};
