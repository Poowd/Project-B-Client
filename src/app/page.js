"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const getList = async () => {
      try {
        const response = await fetch(`./api/pets`, {
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
      <header className="w-full h-fit flex items-center gap-2">
        <main className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <section className="h-40 border border-neutral-300 rounded p-5 text-center flex flex-col justify-center gap-3">
            <h3 className="text-lg">Cubiods</h3>
            <h1 className="text-4xl font-bold text-cyan-600">{pets.length}</h1>
          </section>
          <section className="h-40 border border-neutral-300 rounded p-5 text-center flex flex-col justify-center gap-3">
            <h3 className="text-lg">Build Competitions</h3>
            <h1 className="text-4xl font-bold text-cyan-600">0</h1>
          </section>
          <section className="h-40 border border-neutral-300 rounded p-5 text-center flex flex-col justify-center gap-3">
            <h3 className="text-lg">Parkours</h3>
            <h1 className="text-4xl font-bold text-cyan-600">0</h1>
          </section>
          <section className="h-40 border border-neutral-300 rounded p-5 text-center flex flex-col justify-center gap-3">
            <h3 className="text-lg">Areas</h3>
            <h1 className="text-4xl font-bold text-cyan-600">0</h1>
          </section>
        </main>
      </header>

      <section className="w-full mb-5 grid grid-cols-3 lg:grid-cols-7 gap-3"></section>
    </main>
  );
}
