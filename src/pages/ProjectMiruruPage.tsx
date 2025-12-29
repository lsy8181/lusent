import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export const ProjectMiruruPage = () => {
  useEffect(() => {
    document.title = 'Miruru 프로젝트 | Lucent';
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-extrabold">미루루 프로젝트</h1>
      <p className="text-lg text-slate-700">
        포근한 파스텔 하늘색 무드의 VTuber 미루루와 함께하는 굿즈 & 보이스팩 프로젝트입니다. 팬들의 일상을 따뜻하게 만들어 줄
        음성과 굿즈를 준비했습니다.
      </p>
      <div className="card space-y-3">
        <h2 className="text-xl font-bold">주요 콘텐츠</h2>
        <ul className="list-disc pl-5 text-slate-700 space-y-1">
          <li>Voice Pack 3종 (응원/수면/알림)</li>
          <li>Physical Goods 3종 (아크릴 스탠드, 키링, 포스터)</li>
          <li>팬 요청을 반영한 지속 업데이트</li>
        </ul>
        <Link to="/goods/miruru" className="button-primary inline-flex items-center gap-2">
          미루루 굿즈샵 가기 <span aria-hidden>→</span>
        </Link>
      </div>
    </div>
  );
};
