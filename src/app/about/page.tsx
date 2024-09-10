import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

function AboutPage() {
  return (
    <div
      style={{
        backgroundImage: 'url("/farmacia.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh", // Adjust the height as needed
        // Make the background more transparent
        backgroundColor: "rgba(255, 255, 255, 1)",
      }}
      className="flex flex-col items-center p-5"
    >
      <Link href={"/"} className="self-start">
        <ArrowLeftIcon size={80} color="blue" className="ml-1 mt-2" />
      </Link>
      <h1 className="font-bold text-5xl text-yellow-400 pb-10">
        Quiénes somos:
      </h1>
      <p className="text-2xl text-gray-800 font-bold">
        Somos una farmacia que se preocupa por la salud de sus clientes. Nuestro
        objetivo es ofrecer medicamentos de calidad a precios accesibles para
        todos. Contamos con un equipo de profesionales que te ayudarán a
        encontrar el medicamento que necesitas. ¡Visítanos y descubre todo lo
        que tenemos para ti!
      </p>
    </div>
  );
}

export default AboutPage;
