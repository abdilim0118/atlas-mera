import { NextResponse } from "next/server";
import { imageManager } from "@/storage/database";

const DEV_IMAGE_URLS = [
  "https://atlas-mera.tos-cn-beijing.volces.com/atlas_image/1%204.png",
  "https://atlas-mera.tos-cn-beijing.volces.com/atlas_image/1%205.png",
  "https://atlas-mera.tos-cn-beijing.volces.com/atlas_image/081ace5bc4df798ee42faeb1cad035ad.jpg",
  "https://atlas-mera.tos-cn-beijing.volces.com/atlas_image/0c3fe5adf65e1403380e7f7d2260f8e4.jpg",
  "https://atlas-mera.tos-cn-beijing.volces.com/atlas_image/6554102.jpg",
  "https://atlas-mera.tos-cn-beijing.volces.com/atlas_image/ae6f9a326af3a891b2a773b9a6ff8603.jpg",
  "https://atlas-mera.tos-cn-beijing.volces.com/atlas_image/b8b406432f6eae121053926090ba3adf.jpg"
];

export async function GET() {
  try {
    let images = await imageManager.getAllImages();

    // Dev bootstrap: initialize image table when empty.
    if (images.length === 0) {
      await Promise.all(
        DEV_IMAGE_URLS.map((imageUrl) => imageManager.createImage({ imageUrl }))
      );
      images = await imageManager.getAllImages();
    }

    return NextResponse.json({
      success: true,
      data: images
    });
  } catch (error) {
    console.error("Error fetching images:", error);
    // Dev fallback: if DB is not configured, still return demo images.
    const fallbackImages = DEV_IMAGE_URLS.map((imageUrl, index) => ({
      id: index + 1,
      imageUrl
    }));
    return NextResponse.json({
      success: true,
      data: fallbackImages
    });
  }
}
