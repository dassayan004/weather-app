"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaSearch } from "react-icons/fa";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function SearchForm() {
  const [city, setCity] = useState("");
  const router = useRouter();

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (city.trim()) {
      router.push(`/?city=${city}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center space-x-2">
      <Input
        type="search"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="bg-accent"
      />
      <Button type="submit" variant={"secondary"}>
        <FaSearch /> Search
      </Button>
    </form>
  );
}
