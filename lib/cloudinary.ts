import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export { cloudinary };

export async function uploadImageToCloudinary(
  fileBuffer: Buffer,
  folder = "portfolio-projects"
) {
  return new Promise<{
    secure_url: string;
    public_id: string;
    width: number;
    height: number;
  }>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
        transformation: [{ quality: "auto", fetch_format: "auto" }],
      },
      (error, result) => {
        if (error || !result) {
          reject(error ?? new Error("Cloudinary upload failed"));
          return;
        }

        resolve({
          secure_url: result.secure_url,
          public_id: result.public_id,
          width: result.width ?? 0,
          height: result.height ?? 0,
        });
      }
    );

    stream.end(fileBuffer);
  });
}

export async function uploadFileToCloudinary(
  fileBuffer: Buffer,
  options: {
    folder?: string;
    resourceType?: "image" | "raw" | "auto";
    filename?: string;
  } = {}
) {
  const {
    folder = "portfolio-files",
    resourceType = "auto",
    filename,
  } = options;

  return new Promise<{
    secure_url: string;
    public_id: string;
    resource_type: string;
    format?: string;
  }>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: resourceType,
        public_id: filename
          ? filename.replace(/\.[^/.]+$/, "")
          : undefined,
        use_filename: Boolean(filename),
        unique_filename: true,
      },
      (error, result) => {
        if (error || !result) {
          reject(error ?? new Error("Cloudinary upload failed"));
          return;
        }

        resolve({
          secure_url: result.secure_url,
          public_id: result.public_id,
          resource_type: result.resource_type ?? resourceType,
          format: result.format,
        });
      }
    );

    stream.end(fileBuffer);
  });
}
