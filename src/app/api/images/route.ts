import { NextResponse } from "next/server";
import { ListObjectsV2Command, S3Client } from "@aws-sdk/client-s3";
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

const IMAGE_EXT_RE = /\.(jpg|jpeg|png|webp|gif|bmp|avif)$/i;

function getPublicImageUrl(key: string): string {
  const base = (
    process.env.TOS_PUBLIC_BASE_URL || "https://atlas-mera.tos-cn-beijing.volces.com"
  ).replace(/\/+$/, "");
  return `${base}/${key
    .split("/")
    .map((part) => encodeURIComponent(part))
    .join("/")}`;
}

async function listBucketImages() {
  const accessKeyId = process.env.TOS_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey =
    process.env.TOS_SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY;
  const endpoint = process.env.TOS_ENDPOINT || "https://tos-s3-cn-beijing.volces.com";
  const region = process.env.TOS_REGION || "cn-beijing";
  const bucket = process.env.TOS_BUCKET || "atlas-mera";
  const prefix = process.env.TOS_PREFIX || "atlas_image/";

  if (!accessKeyId || !secretAccessKey) {
    throw new Error("Missing TOS credentials");
  }

  const client = new S3Client({
    region,
    endpoint,
    forcePathStyle: false,
    credentials: {
      accessKeyId,
      secretAccessKey
    }
  });

  const result = await client.send(
    new ListObjectsV2Command({
      Bucket: bucket,
      Prefix: prefix,
      MaxKeys: 1000
    })
  );

  const keys =
    result.Contents?.map((item) => item.Key || "")
      .filter((key) => key && !key.endsWith("/") && IMAGE_EXT_RE.test(key))
      .sort() || [];

  return keys.map((key, index) => ({
    id: index + 1,
    imageUrl: getPublicImageUrl(key)
  }));
}

export async function GET() {
  const isProduction = process.env.NODE_ENV === "production";

  if (isProduction) {
    try {
      const bucketImages = await listBucketImages();
      return NextResponse.json({
        success: true,
        data: bucketImages
      });
    } catch (error) {
      console.error("Error listing bucket images:", error);
      return NextResponse.json({
        success: true,
        data: []
      });
    }
  }

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
