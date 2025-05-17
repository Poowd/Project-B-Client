"use client";
import { useEffect, useState, useTransition } from "react";
import Card3 from "../../components/single/card/Card3";
import DashboardContent from "../../components/pages/DashboardContent";

export default function Home() {
  const [isPending, startTransition] = useTransition();
  const [cubiods, setCubiods] = useState(0);

  const getGoogleSheetData = () => {
    startTransition(async () => {
      try {
        const response = await fetch(`../../api/dashboard`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        // Parse the response content
        const fetchData = await response.json();

        setCubiods(fetchData.cubiods);
        return;
      } catch (error) {
        console.log(error);
      }
    });
  };

  useEffect(() => {
    getGoogleSheetData();
  }, []);

  return (
    <DashboardContent
      cards={
        <>
          <Card3 data={cubiods}>Cubiods</Card3>
          <Card3 data={0}>Build Competitions</Card3>
          <Card3 data={0}>Parkours</Card3>
          <Card3 data={0}>Realms</Card3>
        </>
      }
    >
      <main className="flex-1 border border-neutral-800"></main>
      <main className="flex-none w-2/6 border border-neutral-800"></main>
    </DashboardContent>
  );
}
