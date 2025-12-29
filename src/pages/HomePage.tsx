import { useEffect } from 'react';
import { Hero } from '../components/Hero';
import { miruruPromos } from '../data/static';
import { Link } from 'react-router-dom';

export const HomePage = () => {
  useEffect(() => {
    document.title = 'Lucent Management | Home';
  }, []);

  return (
    <div className="space-y-12">
      <Hero />
      <section className="grid md:grid-cols-2 gap-6" id="projects">
        <div className="card">
          <h2 className="section-title">Projects Preview</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">Miruru</p>
                <p className="text-sm text-slate-600">굿즈 & 보이스팩 출시</p>
              </div>
              <Link to="/projects/miruru" className="button-secondary">
                자세히 보기
              </Link>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">Drips</p>
                <p className="text-sm text-slate-600">콘텐츠 프로젝트</p>
              </div>
              <Link to="/projects/drips" className="button-secondary">
                프로젝트 보기
              </Link>
            </div>
          </div>
        </div>
        <div className="card" id="about">
          <h2 className="section-title">About Lucent</h2>
          <p className="text-slate-700 leading-relaxed">
            Lucent Management는 창작자를 위한 굿즈/보이스팩 제작과 유통을 지원합니다. 투명한 정산과 부드러운 커뮤니케이션으로
            팬들에게 가장 좋은 형태로 작품을 전달합니다.
          </p>
          <div className="mt-4 space-y-3">
            {miruruPromos.map((promo) => (
              <div key={promo.title} className="p-4 rounded-lg bg-brand-light/40 border border-brand/30">
                <p className="font-semibold text-brand-dark">{promo.title}</p>
                <p className="text-sm text-slate-700">{promo.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="card" id="social">
        <h2 className="section-title">Social</h2>
        <p className="text-slate-700">실시간 업데이트는 공식 X에서 확인하세요.</p>
        <a
          className="button-primary inline-flex items-center gap-2 mt-4"
          href="https://x.com"
          target="_blank"
          rel="noreferrer"
        >
          공식 X 바로가기
          <span aria-hidden>↗</span>
        </a>
      </section>
    </div>
  );
};
