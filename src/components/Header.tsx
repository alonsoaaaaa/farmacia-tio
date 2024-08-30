import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CoinsIcon } from "lucide-react";
import Image from "next/image";

const GamingDealsHeader = () => {
  return (
    <Card className="bg-blue-600 text-white p-2 sm:p-4 mb-3 sm:mb-6 relative overflow-hidden">
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <div className="flex flex-col sm:flex-row items-center mb-2 sm:mb-0">
          <h2 className="text-xl sm:text-2xl font-bold mb-1">
            Farmacia Renacimiento
          </h2>
          <p className="text-lg sm:text-3xl text-center sm:text-left sm:ml-4 text-yellow-400">
            Los mejores precios de Amecameca
          </p>
          <CoinsIcon
            size={32}
            className="text-yellow-400 mt-2 sm:mt-0 sm:ml-2"
          />
        </div>
        <div className="text-center sm:text-right mt-2 sm:mt-0">
          <h1 className="text-xl sm:text-3xl font-bold mb-1 text-lime-400">
            Compara los precios
          </h1>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white">
            Ofertas
          </Button>
        </div>
      </div>
      {/* Hide decorative elements on small screens */}
      <div className="hidden sm:block absolute top-1/2 left-1/4 transform-translate-y-1/2 -rotate-12 text-5xl sm:text-7xl font-bold opacity-30">
        $50
      </div>
      <div className="hidden sm:block absolute top-1/2 right-1/4 transform -translate-y-1/2 rotate-12 text-5xl sm:text-7xl font-bold opacity-30">
        $100
      </div>
      <div className="absolute top-0 right-0 bg-blue-500 text-white px-2 py-1 text-xs sm:text-base sm:px-3 sm:py-1 rounded-bl-lg">
        -15%
      </div>
      <div className="absolute bottom-0 left-0 bg-blue-500 text-white px-2 py-1 text-xs sm:text-base sm:px-3 sm:py-1 rounded-tr-lg">
        -30%
      </div>
    </Card>
  );
};

export default GamingDealsHeader;
