import { useEffect } from 'react';

export const PrivacyPage = () => {
  useEffect(() => {
    document.title = '개인정보처리방침 | Lucent';
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-extrabold">개인정보처리방침</h1>
      <p className="text-slate-700">사용자 개인정보 보호를 위한 기본 방침을 요약합니다. 실제 서비스 운영 시 최신 정책을 반영하세요.</p>
      <ul className="list-disc pl-5 text-slate-700 space-y-2">
        <li>회원 가입 시 수집되는 정보: 이메일, 비밀번호</li>
        <li>주문 처리 시 수집되는 정보: 입금자명, 주문 내역</li>
        <li>데이터는 Supabase를 통해 안전하게 보관합니다.</li>
      </ul>
    </div>
  );
};
