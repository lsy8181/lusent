import { useEffect } from 'react';

export const ProjectDripsPage = () => {
  useEffect(() => {
    document.title = 'Drips 프로젝트 | Lucent';
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-extrabold">Drips 프로젝트</h1>
      <p className="text-lg text-slate-700">
        실험적인 사운드와 비주얼을 결합한 아트 프로젝트입니다. 여러 아티스트와 협업하여 새로운 경험을 제공합니다.
      </p>
      <div className="card space-y-2">
        <p className="text-slate-700">참여 아티스트: Wavely, Aria, Nightfall 등</p>
        <p className="text-sm text-amber-700 bg-amber-50 px-3 py-2 rounded-md inline-flex items-center gap-2">Goods Coming Soon</p>
      </div>
    </div>
  );
};
