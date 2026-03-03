import { eq } from "drizzle-orm";
import { getDb } from "coze-coding-dev-sdk";
import { image, insertImageSchema } from "./shared/schema";
import type { Image, InsertImage } from "./shared/schema";

export class ImageManager {
  /**
   * 获取所有图片素材
   */
  async getAllImages(): Promise<Image[]> {
    const db = await getDb();
    const images = await db.select().from(image).orderBy(image.id);
    return images;
  }

  /**
   * 根据 ID 获取图片
   */
  async getImageById(id: number): Promise<Image | null> {
    const db = await getDb();
    const [img] = await db.select().from(image).where(eq(image.id, id));
    return img || null;
  }

  /**
   * 创建新图片记录
   */
  async createImage(data: InsertImage): Promise<Image> {
    const db = await getDb();
    const validated = insertImageSchema.parse(data);
    const [newImage] = await db.insert(image).values(validated).returning();
    return newImage;
  }

  /**
   * 删除图片记录
   */
  async deleteImage(id: number): Promise<boolean> {
    const db = await getDb();
    const result = await db.delete(image).where(eq(image.id, id));
    return (result.rowCount ?? 0) > 0;
  }
}

export const imageManager = new ImageManager();
