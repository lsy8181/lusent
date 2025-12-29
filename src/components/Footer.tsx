import { Link } from 'react-router-dom';

export const Footer = () => (
  <footer className="mt-16 border-t border-slate-200 bg-white">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid gap-6 md:grid-cols-3">
      <div>
        <h3 className="text-lg font-bold text-slate-900">Lucent Management</h3>
        <p className="text-sm text-slate-600 mt-2">창작자를 위한 굿즈/보이스팩 유통 매니지먼트.</p>
      </div>
      <div className="flex flex-col gap-2 text-sm text-slate-600">
        <Link to="/terms" className="hover:text-brand-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-dark">
          이용약관
        </Link>
        <Link to="/privacy" className="hover:text-brand-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-dark">
          개인정보처리방침
        </Link>
      </div>
      <div className="flex items-start">
        <a
          href="https://x.com"
          target="_blank"
          rel="noreferrer"
          className="button-primary"
        >
          공식 X 바로가기
        </a>
      </div>
    </div>
  </footer>
);
