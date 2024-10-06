"use client";
import Image from "next/image";
import ComparisonList from "@/components/ComparisonList";
import Header from "@/components/Header";
import Search from "@/components/Search";
import Filtering from "@/components/Filtering";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { link } from "fs";
import { PrismaClient } from "@prisma/client";
import { FetchAvailableMedicines } from "@/app/dashboard/actions";
export default function Home() {
  let sections = ["Diabetes", "Colesterol", "Presion"];
  const [selectedSection, setSelectedSection] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const res = await fetch("/api/medicines");
        if (!res.ok) {
          throw new Error(`Error: ${res.status}`);
        }
        const data = await res.json();
        setItems(data.medicines); // Access `medicines` from the response
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMedicines();
  }, []);
  // const filteredItems = selectedSection
  //   ? items.filter((item) => item.section === selectedSection)
  //   : items;
  const handleSectionChange = (value: any) => {
    setSelectedSection(value);
  };

  return (
    <div>
      <Header />
      <Filtering
        sections={sections}
        selectedSection={selectedSection}
        onSectionChange={handleSectionChange}
      />
      <Search />
      <div>
        <Link href={"/dashboard"}>
          <Button className="bg-blue-500">Colocar producto</Button>
        </Link>
        <Link href={"/about"}>
          <Button className="bg-green-600">Conócenos</Button>
        </Link>
      </div>
      <ComparisonList items={items} />
    </div>
  );
}
