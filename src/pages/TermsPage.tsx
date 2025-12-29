import { useEffect } from 'react';

export const TermsPage = () => {
  useEffect(() => {
    document.title = '이용약관 | Lucent';
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-extrabold">이용약관</h1>
      <p className="text-slate-700">본 서비스 이용을 위한 기본 약관입니다. 실제 서비스 운영 시 상세 약관을 업데이트하세요.</p>
      <ul className="list-disc pl-5 text-slate-700 space-y-2">
        <li>회원은 본인의 계정 정보를 안전하게 관리할 책임이 있습니다.</li>
        <li>무통장 입금 결제는 입금 확인 후 주문이 진행됩니다.</li>
        <li>주문 취소 및 환불은 운영 정책에 따릅니다.</li>
      </ul>
    </div>
  );
};
