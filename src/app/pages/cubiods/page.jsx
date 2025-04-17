"use client";

import Input from "@/app/forms/input/Input";
import PetInformation from "@/components/package/PetInformation";
import { useEffect, useState } from "react";

export default function Page() {
  const [pets, setPets] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getList = async () => {
      try {
        const response = await fetch(`../../api/pets`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        // Parse the response content
        const petsFetched = await response.json();
        console.log(petsFetched.data.pets);

        return setPets(petsFetched.data.pets);
      } catch (error) {
        console.log(error);
      }
    };

    getList();
  }, []);

  return (
    <main>
      <header className="w-full h-fit bg-white border border-neutral-300 rounded-full p-2 mb-5 flex items-center gap-2">
        <section className="flex-1">
          <Input
            style={
              "outline-0 border border-neutral-300 bg-neutral-50 w-full py-2 px-5 text-sm rounded-full"
            }
            id={"search"}
            placeholder={"Search"}
            onChange={(e) => setSearch(e.target.value)}
          ></Input>
        </section>
        <section className="flex-none flex flex-row-reverse gap-2"></section>
      </header>

      <section className="w-full mb-5 grid grid-cols-3 lg:grid-cols-7 gap-3">
        {pets?.map(
          (pet) =>
            (pet.Name.toLowerCase().includes(search.toLowerCase()) ||
              search == null) && (
              <PetInformation key={pet.ID} pet={pet}></PetInformation>
            )
        )}
      </section>
    </main>
  );
}
