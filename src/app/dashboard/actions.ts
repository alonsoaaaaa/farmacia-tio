// "use server";

// import { revalidatePath } from "next/cache";
// import { writeFile } from "fs/promises";
// import path from "path";

// export async function submitMedicineData(formData: any) {
//   try {
//     // Extract data from formData
//     const name = formData.get("name");
//     const make = formData.get("make");
//     const price = formData.get("price");
//     const price2 = formData.get("price2");
//     const price3 = formData.get("price3");

//     // Handle image uploads
//     const images = [];
//     for (let i = 0; formData.get(`image${i}`); i++) {
//       const file = formData.get(`image${i}`);
//       const bytes = await file.arrayBuffer();
//       const buffer = Buffer.from(bytes);

//       // Save file to disk
//       const filename = `${Date.now()}_${file.name}`;
//       const filepath = path.join(process.cwd(), "public", "uploads", filename);
//       await writeFile(filepath, buffer);
//       images.push(`/uploads/${filename}`);
//     }

//     // Here you would typically save the data to your database
//     // For this example, we'll just log it
//     console.log("Received medicine data:", {
//       name,
//       make,
//       price,
//       price2,
//       price3,
//       images,
//     });

//     // Revalidate the page to reflect the changes
//     revalidatePath("/");

//     return { success: true };
//   } catch (error) {
//     console.error("Error processing medicine data:", error);

//     // Type guard to check if error is an instance of Error
//     if (error instanceof Error) {
//       return { success: false, error: error.message };
//     } else {
//       // Handle the case where the error is not an instance of Error
//       return { success: false, error: "An unknown error occurred" };
//     }
//   }
// }
// import { v4 as uuid } from "uuid";
// import s3Client from "@/lib/s3Client";
// import { ObjectCannedACL, PutObjectCommand } from "@aws-sdk/client-s3";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// export async function uploadMedicineImage(
//   medicineId: string,
//   image: File
// ): Promise<{ success: boolean; imageUrl?: string; error?: string }> {
//   try {
//     if (!image) {
//       return { success: false, error: "No image provided" };
//     }

//     if (image.size > 10000000) {
//       return { success: false, error: "The image is too large (max 10MB)" };
//     }

//     const fileExtension = image.name.split(".").pop();
//     const bytes = await image.arrayBuffer();
//     const buffer = Buffer.from(bytes);

//     const bucketParams = {
//       Bucket: "farmacia-guadalajara",
//       Key: `medicines/${medicineId}-${uuid()}.${fileExtension}`,
//       Body: buffer,
//       ACL: ObjectCannedACL.public_read,
//     };

//     await s3Client.send(new PutObjectCommand(bucketParams));

//     const imageUrl = `https://farmacia-guadalajara.nyc3.digitaloceanspaces.com/${bucketParams.Key}`;

//     // Update the medicine record with the new image URL
//     await prisma.medicine.update({
//       where: { id: medicineId },
//       data: { imageUrl: imageUrl },
//     });

//     return { success: true, imageUrl: imageUrl };
//   } catch (error) {
//     console.error("Failed to upload image: ", error);
//     return { success: false, error: "Failed to upload image" };
//   }
// }

// export async function createMedicineWithImage(
//   medicineData: {
//     name: string;
//     description: string;
//     price: number;
//     price2: number;
//     price3: number;
//     stock: number;
//   },
//   image: File
// ): Promise<{ success: boolean; medicine?: any; error?: string }> {
//   try {
//     // First, create the medicine record
//     const medicine = await prisma.medicine.create({
//       data: medicineData,
//     });

//     // Then, upload the image and update the medicine record
//     const uploadResult = await uploadMedicineImage(medicine.id, image);

//     if (!uploadResult.success) {
//       // If image upload fails, we might want to delete the medicine record
//       await prisma.medicine.delete({ where: { id: medicine.id } });
//       return { success: false, error: uploadResult.error };
//     }

//     return {
//       success: true,
//       medicine: { ...medicine, imageUrl: uploadResult.imageUrl },
//     };
//   } catch (error) {
//     console.error("Failed to create medicine with image: ", error);
//     return { success: false, error: "Failed to create medicine with image xd" };
//   }
// }
//TODO:AQUUI HACE FALTA LLMAR A ESTA ACTION EN EL DASHBOARD
import { v4 as uuid } from "uuid";
import s3Client from "@/lib/s3Client";
import { ObjectCannedACL, PutObjectCommand } from "@aws-sdk/client-s3";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createMedicine(
  formData: FormData
): Promise<{ success: boolean; medicine?: any; error?: string }> {
  try {
    // Extract data from formData
    const name = formData.get("name") as string;
    const make = formData.get("make") as string;
    const description = formData.get("description") as string;
    const price = parseFloat(formData.get("price") as string);
    const price2 = parseFloat(formData.get("price2") as string);
    const price3 = parseFloat(formData.get("price3") as string);
    const stock = parseInt(formData.get("stock") as string) || 0;
    const image = formData.get("image") as File;

    if (!image) {
      return { success: false, error: "No image provided" };
    }

    if (image.size > 10000000) {
      return { success: false, error: "The image is too large (max 10MB)" };
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

    // Upload image to S3
    const fileExtension = image.name.split(".").pop();
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

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

    return { success: true, medicine: updatedMedicine };
  } catch (error) {
    console.error("Failed to create medicine: ", error);
    return { success: false, error: "Failed to create medicine" };
  }
}

export async function FetchAvailableMedicines() {
  const medicines = await prisma.medicine.findMany();
  return medicines;
}
