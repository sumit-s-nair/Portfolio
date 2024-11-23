import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

// Initialize Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export interface CloudinaryResource {
  secure_url: string;
  public_id: string;
}

export interface CloudinaryImage {
  src: string;
  alt: string;
}

export async function GET() {
  try {
    // Fetch resources from the "Gallery" folder
    const response = await cloudinary.api.resources({
      type: "upload",
      prefix: "",
    });

    const resources: CloudinaryImage[] = response.resources.map((resource: CloudinaryResource) => ({
      src: resource.secure_url,
      alt: resource.public_id,
    }));
    
    return NextResponse.json(resources);
  } catch (error) {
    console.error("Error fetching images:", error);

    return NextResponse.json(
      { error: "Failed to fetch images" },
      { status: 500 }
    );
  }
}
