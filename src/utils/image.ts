import { IkatMaterial } from '@/types';

export async function loadImageDimensions(material: IkatMaterial): Promise<IkatMaterial> {
  try {
    const img = new Image();
    img.src = material.imageUrl;
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = reject;
    });
    return {
      ...material,
      width: img.naturalWidth,
      height: img.naturalHeight,
    };
  } catch {
    return material;
  }
}

export async function loadImageDimensionsBatch(materials: IkatMaterial[]): Promise<IkatMaterial[]> {
  return Promise.all(materials.map(loadImageDimensions));
}
