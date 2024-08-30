"use client";
import Image from "next/image";
import ComparisonList from "@/components/ComparisonList";
import Header from "@/components/Header";
import Search from "@/components/Search";
import Filtering from "@/components/Filtering";
import { useState } from "react";
export default function Home() {
  let sections = ["Diabetes", "Colesterol", "Presion"];
  const [selectedSection, setSelectedSection] = useState("");
  let items = [
    {
      name: "pylopac",
      link: "/pylopac.jpeg",
      price1: 10.99,
      price2: 9.99,
      price3: 1.99,
      section: "diabetes",
    },
    {
      name: "Glucovance",
      link: "/glucovance.jpeg",
      price1: 15.99,
      price2: 12.99,
      price3: 2.88,
      sections: "presion",
    },
    {
      name: "Galvus Met",
      link: "/galvus-met.jpeg",
      price1: 15.99,
      price2: 12.99,
      price3: 2.88,
      sections: "presion",
    },
    {
      name: "Vilzermet",
      link: "/vilzermet.jpg",
      price1: 15.99,
      price2: 12.99,
      price3: 2.88,
      sections: "presion",
    },
    {
      name: "Daplagliflozina",
      link: "/medicina.jpg",
      price1: 15.99,
      price2: 12.99,
      price3: 2.88,
      sections: "presion",
    },
    // {
    //   name: "Jardiance",
    //   link: "/jardiance.jpeg",
    //   price1: 15.99,
    //   price2: 12.99,
    //   price3: 2.88,
    //   sections: "presion",
    // },
    // {
    //   name: "Lantus",
    //   link: "/lantus.jpeg",
    //   price1: 15.99,
    //   price2: 12.99,
    //   price3: 2.88,
    //   sections: "presion",
    // },
    // {
    //   name: "Metformina",
    //   link: "/metformina.jpeg",
    //   price1: 15.99,
    //   price2: 12.99,
    //   price3: 2.88,
    //   sections: "presion",
    // },
    // {
    //   name: "Onglyza",
    //   link: "/onglyza.jpeg",
    //   price1: 15.99,
    //   price2: 12.99,
    //   price3: 2.88,
    //   sections: "presion",
    // },
    // {
    //   name: "Saxagliptina",
    //   link: "/saxagliptina.jpeg",
    //   price1: 15.99,
    //   price2: 12.99,
    //   price3: 2.88,
    //   sections: "presion",
    // },
    // {
    //   name: "Sitagliptina",
    //   link: "/sitagliptina.jpeg",
    //   price1: 15.99,
    //   price2: 12.99,
    //   price3: 2.88,
    //   sections: "presion",
    // },
    // {
    //   name: "Toujeo",
    //   link: "/toujeo.jpeg",
    //   price1: 15.99,
    //   price2: 12.99,
    //   price3: 2.88,
    //   sections: "presion",
    // },
    // {
    //   name: "Trulicity",
    //   link: "/trulicity.jpeg",
    //   price1: 15.99,
    //   price2: 12.99,
    //   price3: 2.88,
    //   sections: "presion",
    // },
    // {
    //   name: "Victoza",
    //   link: "/victoza.jpeg",
    //   price1: 15.99,
    //   price2: 12.99,
    //   price3: 2.88,
    //   sections: "presion",
    // },
  ];

  const filteredItems = selectedSection
    ? items.filter((item) => item.section === selectedSection)
    : items;

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
      <ComparisonList items={items} />
    </div>
  );
}
