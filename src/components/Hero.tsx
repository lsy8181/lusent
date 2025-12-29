import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { heroSlides } from '../data/static';

export const Hero = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % heroSlides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const current = heroSlides[index];

  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-brand-light via-white to-white shadow-sm border border-slate-100">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#e0f2fe,transparent_35%)]" aria-hidden />
      <div className="grid md:grid-cols-2 gap-8 p-10 items-center">
        <div className="space-y-4">
          <p className="text-sm font-semibold text-brand-dark">Lucent Management</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900">{current.title}</h1>
          <p className="text-lg text-slate-700">{current.subtitle}</p>
          <Link to={current.href} className="button-primary inline-flex items-center gap-2">
            {current.cta}
            <span aria-hidden>→</span>
          </Link>
        </div>
        <div className="h-64 md:h-72 rounded-2xl bg-gradient-to-br from-white to-brand-light flex items-center justify-center text-brand-dark font-bold text-2xl border border-brand/30 shadow-inner">
          미루루 굿즈 & 보이스팩
        </div>
      </div>
    </section>
  );
};
