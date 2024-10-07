import { NextResponse } from "next/server";
import { v4 as uuid } from "uuid";
import s3Client from "@/lib/s3Client";
import { ObjectCannedACL, PutObjectCommand } from "@aws-sdk/client-s3";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const data = await req.formData();
    const image: File | null = data.get("image") as File;
    const name = data.get("name") as string;
    const make = data.get("make") as string;
    const description = data.get("description") as string;
    const price = parseFloat(data.get("price") as string);
    const price2 = parseFloat(data.get("price2") as string);
    const price3 = parseFloat(data.get("price3") as string);
    const stock = parseInt(data.get("stock") as string) || 0;

    if (!image) {
      return NextResponse.json(
        { success: false, message: "No image provided" },
        { status: 400 }
      );
    }

    if (image.size > 10000000) {
      return NextResponse.json(
        { success: false, message: "The image is too large (max 10MB)" },
        { status: 400 }
      );
    }

    // Create the medicine record first
    const medicine = await prisma.medicine.create({
      data: {
        name,
        make,
        description,
        price,
        price2,
        price3,
        stock,
      },
    });

    let fileExtension = image.name.split(".").pop();
    let bytes = await image.arrayBuffer();
    let buffer = Buffer.from(bytes);

    const bucketParams = {
      Bucket: "farmacia-guadalajara",
      Key: `medicines/${medicine.id}-${uuid()}.${fileExtension}`,
      Body: buffer,
      ACL: ObjectCannedACL.public_read,
    };

    await s3Client.send(new PutObjectCommand(bucketParams));

    const imageUrl = `https://farmacia-guadalajara.nyc3.digitaloceanspaces.com/${bucketParams.Key}`;

    // Update the medicine record with the new image URL
    const updatedMedicine = await prisma.medicine.update({
      where: { id: medicine.id },
      data: { imageUrl: imageUrl },
    });

    return NextResponse.json({ success: true, medicine: updatedMedicine });
  } catch (error) {
    console.error("Failed to create medicine: ", error);
    return NextResponse.json(
      { success: false, message: "Failed to create medicine" },
      { status: 500 }
    );
  }
}

export async function GET() {
  const medicines = await prisma.medicine.findMany();
  return NextResponse.json({ medicines });
}
