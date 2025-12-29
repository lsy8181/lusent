import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export const ProjectsPage = () => {
  useEffect(() => {
    document.title = 'Projects | Lucent';
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-extrabold">Projects</h1>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="card space-y-2">
          <h2 className="text-xl font-bold">Miruru</h2>
          <p className="text-slate-700">따뜻한 하늘색 무드의 VTuber, 미루루 굿즈 & 보이스팩 프로젝트.</p>
          <Link to="/projects/miruru" className="button-primary inline-flex items-center gap-2">
            프로젝트 보기 <span aria-hidden>→</span>
          </Link>
        </div>
        <div className="card space-y-2">
          <h2 className="text-xl font-bold">Drips</h2>
          <p className="text-slate-700">다양한 아티스트와 협업하는 실험적 콘텐츠 프로젝트.</p>
          <Link to="/projects/drips" className="button-secondary inline-flex items-center gap-2">
            상세 보기 <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
