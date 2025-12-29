export const depositInfo = {
  bankName: '카카오뱅크',
  accountNumber: '3333-12-3456789',
  accountHolder: '루센트 매니지먼트',
};

export type ProductType = 'voice_pack' | 'physical';

export interface Product {
  id: string;
  artist_slug: 'miruru';
  type: ProductType;
  title: string;
  description: string;
  price_krw: number;
  duration_sec?: number | null;
  cover_url?: string | null;
  is_active?: boolean;
}

export const statusLabels: Record<string, string> = {
  payment_pending: '입금확인중',
  paid: '입금확인',
  production: '제작중',
  shipping: '발송중',
  delivered: '배송완료',
  cancelled: '취소됨',
};

export const heroSlides = [
  {
    title: 'Lucent Management',
    subtitle: '창작자를 위한 온/오프라인 굿즈 & 보이스팩 매니지먼트',
    cta: '프로젝트 보기',
    href: '/projects',
  },
  {
    title: 'Miruru Voice & Goods',
    subtitle: '포근한 하늘색 감성, 미루루의 굿즈와 보이스팩을 만나보세요.',
    cta: '미루루 굿즈샵',
    href: '/goods/miruru',
  },
];

export const miruruPromos = [
  {
    title: '미루루 1st Voice Pack',
    description: '마음이 편안해지는 나른한 음성 수록',
  },
  {
    title: '미루루 굿즈 세트',
    description: '포근한 파스텔 톤 굿즈 구성',
  },
];

export const miruruProducts: Product[] = [
  {
    id: 'voice-1',
    artist_slug: 'miruru',
    type: 'voice_pack',
    title: 'Miruru Voice Pack 01',
    description: '잔잔한 응원/인사 보이스 12종',
    price_krw: 12000,
    duration_sec: 420,
  },
  {
    id: 'voice-2',
    artist_slug: 'miruru',
    type: 'voice_pack',
    title: 'Miruru Voice Pack 02',
    description: '포근한 수면 유도 보이스 8종',
    price_krw: 14000,
    duration_sec: 360,
  },
  {
    id: 'voice-3',
    artist_slug: 'miruru',
    type: 'voice_pack',
    title: 'Miruru Voice Pack 03',
    description: '게임/스트리밍 알림용 보이스 10종',
    price_krw: 15000,
    duration_sec: 400,
  },
  {
    id: 'physical-1',
    artist_slug: 'miruru',
    type: 'physical',
    title: 'Miruru 아크릴 스탠드',
    description: '하늘색 배경의 포근한 일러스트',
    price_krw: 18000,
  },
  {
    id: 'physical-2',
    artist_slug: 'miruru',
    type: 'physical',
    title: 'Miruru 키링',
    description: '말랑한 촉감의 하늘색 키링',
    price_krw: 9000,
  },
  {
    id: 'physical-3',
    artist_slug: 'miruru',
    type: 'physical',
    title: 'Miruru 포스터',
    description: 'A3 사이즈 고퀄리티 포스터',
    price_krw: 7000,
  },
];
