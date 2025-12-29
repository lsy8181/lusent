import { FormEvent, useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';

export const SignupPage = () => {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirect = new URLSearchParams(location.search).get('redirect') || '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    document.title = '회원가입 | Lucent';
  }, []);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const result = await signUp(email, password);
    if (result?.error) {
      setError(result.error);
    } else {
      alert('가입 완료! 메일 인증을 확인해주세요.');
      navigate(redirect);
    }
  };

  return (
    <div className="max-w-md mx-auto card space-y-4">
      <h1 className="text-2xl font-bold">회원가입</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <div>
          <label className="block text-sm font-semibold text-slate-800">이메일</label>
          <input
            className="w-full rounded-md border border-slate-200 px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-800">비밀번호</label>
          <input
            className="w-full rounded-md border border-slate-200 px-3 py-2"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="text-sm text-rose-600">{error}</p>}
        <button type="submit" className="button-primary w-full">
          회원가입
        </button>
      </form>
    </div>
  );
};
