import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";

const PriceComparisonList = ({ items }: any) => {
  const calculateDifference = (price1: any, price2: any) => {
    const diff = price1 - price2;
    return diff > 0 ? `+$${diff}` : `-$${Math.abs(diff)}`;
  };
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-green-600">Medicina</TableHead>
            <TableHead>
              <Image
                src="/guadalajara.png"
                width={60}
                height={15}
                alt="Similares"
              />
            </TableHead>
            <TableHead>
              <Image
                src="/farmaciasdelahorro.png"
                width={40}
                height={15}
                alt="Similares"
              />
            </TableHead>
            <TableHead>
              <Image
                src="/logo_tio.png"
                width={60}
                height={45}
                alt="Similares"
              />
            </TableHead>
            <TableHead className="text-orange-500">Ahorras</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item: any, index: any) => (
            <TableRow key={index}>
              <TableCell>
                <div className="flex flex-col items-center sm:flex-row">
                  <Image
                    src={item.imageUrl}
                    width={100}
                    height={150}
                    className="rounded-md mb-2 sm:mb-0 sm:mr-2"
                    alt="Medicina"
                  />
                  <div className="font-bold uppercase text-center sm:text-left">
                    {item.name}
                  </div>
                </div>
              </TableCell>
              <TableCell className="font-bold underline">
                ${item.price}
              </TableCell>
              <TableCell className="font-bold underline">
                ${item.price2}
              </TableCell>
              <TableCell className="font-bold underline">
                ${item.price3}
              </TableCell>
              <TableCell className="flex flex-col font-bold">
                <Badge className="w-fit bg-green-500">
                  {calculateDifference(item.price, item.price2)}
                </Badge>
                <Link href={""} className="text-blue-500 underline">
                  Comprar
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PriceComparisonList;
