import { IkatMaterial } from '@/types';

const getPic = (id: number) => `https://picsum.photos/seed/ikat${id}/450/800`;

const ORIGINAL_MATERIALS: IkatMaterial[] = [
  { id: 'm-1', imageUrl: getPic(101) },
  { id: 'm-2', imageUrl: getPic(230) },
  { id: 'm-3', imageUrl: getPic(305) },
  { id: 'm-4', imageUrl: getPic(412) },
  { id: 'm-5', imageUrl: getPic(555) },
  { id: 'm-6', imageUrl: getPic(621) },
  { id: 'm-7', imageUrl: getPic(789) },
  { id: 'm-8', imageUrl: getPic(810) },
];

export const MOCK_MATERIALS: IkatMaterial[] = [
  ...ORIGINAL_MATERIALS,
  ...Array.from({ length: 22 }).map((_, i) => ({
    id: `m-extra-${i}`,
    imageUrl: getPic(1000 + i)
  }))
];

