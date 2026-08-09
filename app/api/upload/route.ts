import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import {
  uploadFileToCloudinary,
  uploadImageToCloudinary,
} from "@/lib/cloudinary";

const MAX_IMAGE_SIZE = 8 * 1024 * 1024;
const MAX_FILE_SIZE = 15 * 1024 * 1024;
const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const DOC_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const kind = String(formData.get("kind") || "image");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    if (kind === "cv" || kind === "document") {
      if (!DOC_TYPES.includes(file.type) && !file.name.toLowerCase().endsWith(".pdf")) {
        return NextResponse.json(
          { error: "Only PDF or Word documents are allowed for CV upload" },
          { status: 400 }
        );
      }

      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { error: "Document must be smaller than 15MB" },
          { status: 400 }
        );
      }

      const result = await uploadFileToCloudinary(buffer, {
        folder: "portfolio-cv",
        resourceType: "raw",
        filename: file.name,
      });

      return NextResponse.json({
        url: result.secure_url,
        publicId: result.public_id,
        resourceType: result.resource_type,
      });
    }

    if (!IMAGE_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Only JPEG, PNG, WebP, and GIF images are allowed" },
        { status: 400 }
      );
    }

    if (file.size > MAX_IMAGE_SIZE) {
      return NextResponse.json(
        { error: "Image must be smaller than 8MB" },
        { status: 400 }
      );
    }

    const result = await uploadImageToCloudinary(buffer);

    return NextResponse.json({
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
