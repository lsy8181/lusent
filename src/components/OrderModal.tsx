import { useState } from 'react';
import { depositInfo, statusLabels } from '../data/static';
import type { OrderRecord } from '../hooks/useOrders';

interface Props {
  order: OrderRecord;
  onClose: () => void;
  onDepositNameUpdate: (value: string) => Promise<void>;
}

export const OrderModal = ({ order, onClose, onDepositNameUpdate }: Props) => {
  const [depositName, setDepositName] = useState(order.deposit_name ?? '');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await onDepositNameUpdate(depositName);
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-40 px-4">
      <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6 space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-semibold text-brand-dark">주문번호</p>
            <p className="text-lg font-bold text-slate-900">{order.id.slice(0, 8).toUpperCase()}</p>
            <p className="text-sm text-slate-600">상태: {statusLabels[order.status]}</p>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-dark">
            닫기
          </button>
        </div>
        <div className="card space-y-2">
          <h3 className="text-lg font-bold">무통장 입금 안내</h3>
          <p className="text-sm text-slate-700">입금 확인 후 제작/발송이 진행됩니다.</p>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <span className="text-slate-600">은행명</span>
            <span className="font-semibold text-slate-900">{depositInfo.bankName}</span>
            <span className="text-slate-600">계좌번호</span>
            <span className="font-semibold text-slate-900">{depositInfo.accountNumber}</span>
            <span className="text-slate-600">예금주</span>
            <span className="font-semibold text-slate-900">{depositInfo.accountHolder}</span>
          </div>
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-800">입금자명</label>
          <input
            value={depositName}
            onChange={(e) => setDepositName(e.target.value)}
            className="w-full rounded-md border border-slate-200 px-3 py-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-dark"
            placeholder="입금자명"
          />
          <button disabled={saving} onClick={handleSave} className="button-primary w-full">
            {saving ? '저장중...' : '입금자명 저장'}
          </button>
        </div>
      </div>
    </div>
  );
};
