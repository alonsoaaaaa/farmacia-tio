"use client";
import React, { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

const popularMakes = [
  "Diabetes",
  "Hipertension",
  "Estomacal",
  "Anticonceptivo",
  "Otro",
];

function Dashboard() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [displayImages, setDisplayImages] = useState<File[]>([]);
  const [imagesNames, setImagesNames] = useState<{ name: string }[]>([]);
  const [imageURLS, setImageURLS] = useState<string[]>([]);
  const [submittingImg, setSubmittingImg] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);
  const insuranceRef = useRef(null);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const createImageUrl = async (image: File): Promise<string> => {
    // Implement this function to create and return an image URL
    // This is a placeholder implementation
    return URL.createObjectURL(image);
  };

  const handleImageSubmit = async (image: File) => {
    try {
      console.log("Imagen recibida en el handleImageSubmit: ", image);
      let url = await createImageUrl(image);
      setImagesNames((prev) => [...prev, { name: image.name }]);
      setSubmittingImg(false);
      console.log("imagesNames: ", imagesNames);
      setImageURLS((prev) => [...prev, url]);
      setImageError(null);
    } catch (error) {
      setImageError("Error al subir la imagen");
    }
  };

  const onSubmit = async (data: any) => {
    try {
      if (imagesNames.length === 0) {
        setImageError("Necesitas subir al menos una imágen");
        return;
      }
      data.image = imageURLS;
      data.features = data.features.split(",");
      const res = await fetch(`/api/availablecars`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data }),
      });
      const { email, contact_number } = await res.json();
      reset();
      if (isClient) {
        router.push(`add/success`);
      }
    } catch (error) {
      console.error("Error al mandar los datos al BACK", error);
      if (isClient) {
        router.push("add/error");
      }
    }
  };

  if (!isClient) {
    return null; // or a loading spinner
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <Card className="mx-auto max-w-sm">
        <Link href={"/"}>
          <ArrowLeftIcon size={40} color="blue" className="ml-1 mt-2" />
        </Link>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle className="text-xl">Añade una medicina</CardTitle>
            <CardDescription>
              Rellena los campos para añadir una medicina disponible a la lista
              de coches en venta, hay algunos campos que son opcionales
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label>Categoria</Label>
                <select
                  {...register("make", {
                    required: {
                      value: true,
                      message: "Coloque la categoria de la medicina",
                    },
                  })}
                >
                  {popularMakes.map((make) => (
                    <option key={make} value={make}>
                      {make}
                    </option>
                  ))}
                </select>
                {errors.make && (
                  <span className="text-red-500">
                    {errors.make.message as string}
                  </span>
                )}
              </div>

              <div className="grid gap-2">
                <Label>Nombre</Label>
                <Input
                  {...register("name", {
                    required: {
                      value: true,
                      message: "Coloque el nombre de la medicina",
                    },
                  })}
                  placeholder="Nombre"
                />
                {errors.name && (
                  <span className="text-red-500">
                    {errors.name.message as string}
                  </span>
                )}
              </div>
              <div className="grid gap-2">
                <Label>Marca</Label>
                <Input
                  {...register("make", {
                    required: {
                      value: true,
                      message: "Coloque el link de la marca",
                    },
                  })}
                  placeholder="Marca"
                />
                {errors.link && (
                  <span className="text-red-500">
                    {errors.link.message as string}
                  </span>
                )}
              </div>
              <div className="grid gap-2">
                <Label>
                  Fotos <span className="font-light">(al menos una)</span>
                </Label>
                <Input
                  type="file"
                  placeholder="Imágenes"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={(e) => {
                    if (!e.target.files || !e.target.files[0]) return;
                    setDisplayImages((prev) => {
                      if (e.target.files && e.target.files.length > 0) {
                        return [...prev, e.target.files[0]];
                      }
                      return prev;
                    });
                  }}
                />
                <ul className="flex flex-col">
                  {displayImages.map((image) => (
                    <div
                      key={image.name}
                      className="flex justify-between gap-1 items-center mb-1"
                    >
                      <div>
                        <li className="text-blue-600">{image.name}</li>
                      </div>
                      {imagesNames.find((img) => img.name === image.name) ? (
                        <p className="flex text-green-700 min-w-fit">
                          Imagen subida
                        </p>
                      ) : (
                        <div className="flex gap-1">
                          <Button
                            variant={"ghost"}
                            className="bg-green-400 hover:bg-green-500"
                            onClick={async () => {
                              setSubmittingImg(true);
                              try {
                                await handleImageSubmit(image);
                              } catch (error) {
                                console.error(
                                  "Error al subir la imagen",
                                  error
                                );
                              }
                            }}
                            disabled={submittingImg}
                          >
                            Subir
                          </Button>
                          <Button
                            variant={"destructive"}
                            className="bg-red-400 hover:bg-red-500"
                            onClick={() => {
                              setDisplayImages(
                                displayImages.filter((img) => img !== image)
                              );
                            }}
                            disabled={submittingImg}
                          >
                            Eliminar
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </ul>
                {imageError && (
                  <div className="flex text-red-500">{imageError}</div>
                )}
              </div>

              <Button
                type="submit"
                className="w-full disabled:bg-gray-500"
                disabled={submittingImg}
              >
                Enviar
              </Button>
            </div>
          </CardContent>
        </form>
      </Card>
      <Image src={"/medicina.png"} alt="" width={100} height={100} />
    </div>
  );
}

export default Dashboard;
