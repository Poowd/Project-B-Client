"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [pets, setPets] = useState([]);

  const updateAnother = async () => {
    try {
      const response = await fetch(`./api/update-test`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Updated: pets,
        }),
      });

      // Parse the response content
      const petsFetched = await response.json();

      console.log(petsFetched.data.pets);

      return setPets(petsFetched.data.pets);
    } catch (error) {
      console.log(error);
    }
  };

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
    <main className="w-full h-screen flex flex-col justify-center items-center bg-neutral-50">
      <div className="text-2xl font-bold">
        Welcome to the Home Page {pets[0]?.name}!
      </div>
      <div>
        {pets?.map((pet) => (
          <div key={pet.id} className="text-lg font-semibold">
            {pet.name}
          </div>
        ))}
      </div>
      <button
        onClick={() => {
          updateAnother();
        }}
        className="border rounded"
      >
        Change Spiwit to Dwargo
      </button>
    </main>
  );
}
