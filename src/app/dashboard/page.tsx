"use client";
import React, { useState } from "react";
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
  const [image, setImage] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = async (data: any) => {
    if (!image) {
      setError("Please upload an image");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("make", data.make);
      formData.append("description", data.description || "");
      formData.append("price", data.price);
      formData.append("price2", data.price2);
      formData.append("price3", data.price3);
      formData.append("stock", data.stock || "0");
      formData.append("image", image);

      const response = await fetch("/api/medicines", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        reset();
        setImage(null);
        setImagePreviewUrl(null);
        router.push(`/add/success`);
      } else {
        setError(result.message || "Error creating medicine");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("An unexpected error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setImagePreviewUrl(URL.createObjectURL(file));
    }
  };
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
              de medicinas en venta
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label>Categoria</Label>
                <select
                  {...register("make", {
                    required: "Seleccione una categoría",
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
                  {...register("name", { required: "Nombre es requerido" })}
                  placeholder="Nombre"
                />
                {errors.name && (
                  <span className="text-red-500">
                    {errors.name.message as string}
                  </span>
                )}
              </div>

              <div className="grid gap-2">
                <Label>Descripción</Label>
                <Input
                  {...register("description")}
                  placeholder="Descripción (opcional)"
                />
              </div>

              <div className="grid gap-2">
                <Label>Precio</Label>
                <Input
                  {...register("price", { required: "Precio es requerido" })}
                  placeholder="Precio"
                  type="number"
                  step="0.01"
                />
                {errors.price && (
                  <span className="text-red-500">
                    {errors.price.message as string}
                  </span>
                )}
              </div>

              <div className="grid gap-2">
                <Label>Precio Super Farmacia</Label>
                <Input
                  {...register("price2", { required: "Precio 2 es requerido" })}
                  placeholder="Precio Super Farmacia"
                  type="number"
                  step="0.01"
                />
                {errors.price2 && (
                  <span className="text-red-500">
                    {errors.price2.message as string}
                  </span>
                )}
              </div>

              <div className="grid gap-2">
                <Label>Precio Farmacias del Ahorro</Label>
                <Input
                  {...register("price3", { required: "Precio 3 es requerido" })}
                  placeholder="Precio Farmacia Renacimiento"
                  type="number"
                  step="0.01"
                />
                {errors.price3 && (
                  <span className="text-red-500">
                    {errors.price3.message as string}
                  </span>
                )}
              </div>

              <div className="grid gap-2">
                <Label>Stock</Label>
                <Input
                  {...register("stock")}
                  placeholder="Stock (opcional)"
                  type="number"
                />
              </div>

              <div className="grid gap-2">
                <Label>Foto</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {imagePreviewUrl && (
                  <img
                    src={imagePreviewUrl}
                    alt="Preview"
                    className="mt-2 max-w-full h-auto"
                  />
                )}
              </div>

              {error && <div className="text-red-500">{error}</div>}

              <Button type="submit" className="w-full" disabled={submitting}>
                {submitting ? "Enviando..." : "Enviar"}
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
