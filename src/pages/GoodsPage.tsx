import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export const GoodsPage = () => {
  useEffect(() => {
    document.title = 'Goods | Lucent';
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-extrabold">Goods</h1>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="card space-y-2">
          <h2 className="text-xl font-bold">Miruru Goods</h2>
          <p className="text-slate-700">굿즈와 보이스팩을 바로 만나보세요.</p>
          <Link to="/goods/miruru" className="button-primary inline-flex items-center gap-2">
            샵으로 이동 <span aria-hidden>→</span>
          </Link>
        </div>
        <div className="card space-y-2 opacity-70">
          <h2 className="text-xl font-bold flex items-center gap-2">
            Drips Goods
            <span className="text-xs bg-slate-200 text-slate-700 px-2 py-1 rounded-full">Coming Soon</span>
          </h2>
          <p className="text-slate-700">준비중입니다.</p>
          <button className="button-secondary opacity-70 cursor-not-allowed" disabled>
            Coming Soon
          </button>
        </div>
      </div>
    </div>
  );
};
