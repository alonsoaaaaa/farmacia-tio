import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import Image from "next/image";
import { PhoneIcon } from "lucide-react";

const Filtering = ({ sections, selectedSection, onSectionChange }: any) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between p-2">
      <div className="flex flex-col sm:flex-row items-center mb-2 sm:mb-0">
        <h1 className="mb-1 sm:mb-0 sm:mr-2">Selecciona una sección...</h1>
        <Select value={selectedSection} onValueChange={onSectionChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Todos" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            {sections.map((section: any) => (
              <SelectItem key={section} value={section}>
                {section}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex justify-center space-x-4">
        <a href="tel:+5971154005" className="flex flex-col items-center">
          <PhoneIcon size={30} className="text-blue-500" />
          <span className="text-xs">Llamada Amecameca</span>
        </a>
        <Link
          href="https://www.facebook.com/p/Farmacia-Renacimiento-100072055362138/?locale=es_LA"
          className="flex flex-col items-center"
        >
          <Image
            src="/facebook.svg"
            priority
            alt="Facebook"
            width={30}
            height={30}
            className="bg-blue-500 rounded-full"
          />
          <span className="text-xs">Facebook</span>
        </Link>
        <Link
          href="https://www.google.com/maps/place/Farmacia+Renacimiento/@19.4923329,-99.6483957,10z/data=!4m10!1m2!2m1!1sfarmacia+renacimiento!3m6!1s0x85d1fb074d0ed0fb:0xf337f9f4cf772c5b!8m2!3d19.4923329!4d-99.0386545!15sChVmYXJtYWNpYSByZW5hY2ltaWVudG9aFyIVZmFybWFjaWEgcmVuYWNpbWllbnRvkgEIcGhhcm1hY3ngAQA!16s%2Fg%2F11h_xn51fw?entry=ttu&g_ep=EgoyMDI0MDgyMS4wIKXMDSoASAFQAw%3D%3D"
          className="flex flex-col items-center"
        >
          <Image
            src="/address.svg"
            priority
            alt="Ubicación"
            width={30}
            height={30}
            className="bg-yellow-300 rounded-full"
          />
          <span className="text-xs">Ubicación</span>
        </Link>
        <Link
          className="flex flex-col items-center"
          href={"https://wa.me/c/55 9046 7787 "}
        >
          <Image
            src="/whatsapp.svg"
            priority
            alt="WhatsApp"
            width={30}
            height={30}
            className="bg-green-500 rounded-full"
          />
          <h1 className="text-xs">WhatsApp</h1>
          <h1 className="text-xs">Neza, Iztapalapa</h1>
        </Link>
      </div>
    </div>
  );
};

export default Filtering;
