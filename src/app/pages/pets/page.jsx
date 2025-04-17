"use client";

import Input from "@/app/forms/input/Input";
import PetInformation from "@/components/package/PetInformation";
import PaginationButton from "@/components/single/button/PaginationButton";
import useFetchList from "@/hooks/useFetchList";
import { useEffect, useState } from "react";

export default function Page() {
  const [page, setPage] = useState({ min: 0, max: 25 });
  const [pets, petSize, petStatus, getPets] = useFetchList("archetopia_pets");
  const [search, setSearch] = useState("");

  const loadData = async () => {
    const getpets = await getPets(page.min, page.max);
    console.log(getpets);
    return getpets;
  };

  useEffect(() => {
    loadData();
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

      {!petStatus && (
        <main className="h-full w-full flex flex-col gap-2 border rounded border-neutral-300 bg-neutral-100 text-center">
          <section className="py-3">
            <p>Getting Pets. Please Wait.</p>
          </section>
        </main>
      )}

      <section className="w-full mb-5 grid grid-cols-3 lg:grid-cols-7 gap-3">
        {pets &&
          pets.map(
            (pet, petkey) =>
              (pet.Name.toLowerCase().includes(search.toLowerCase()) ||
                search == null) && (
                <PetInformation key={petkey} pet={pet}></PetInformation>
              )
          )}
      </section>
      <hr className="my-5 text-neutral-200" />
      <section className="flex gap-3">
        <PaginationButton
          action={() => {
            setPage({ min: page.min - 25, max: page.min });
            getPets(page.min - 25, page.min);
          }}
          disableIn={page.min - 25 < 0}
        >
          prev
        </PaginationButton>
        <PaginationButton
          action={() => {
            setPage({ min: page.max, max: page.max + 25 });
            getPets(page.max, page.max + 25);
          }}
          disableIn={petSize !== page.max}
        >
          next
        </PaginationButton>
      </section>
    </main>
  );
}
