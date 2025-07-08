"use client";

import { useState } from "react";
import Dropdown from "../../../components/dropdown/Dropdown";

const aeShop = [
  {
    category: "Active",
    cost: 640,
  },
  {
    category: "Elite",
    cost: 1600,
  },
  {
    category: "Ultimate",
    cost: 3200,
  },
  {
    category: "Legendary",
    cost: 12800,
  },
  {
    category: "Transcendent",
    cost: 32000,
  },
  {
    category: "Demigod",
    cost: 52000,
  },
];

export default function Page() {
  const [aeCategory, setAECategory] = useState(aeShop[0]);
  const [xpBudget, setXPBudget] = useState(0);

  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ", ");
  };

  return (
    <main className="w-[90%] lg:w-[40%] mx-auto py-20">
      <header className="text-center mb-5">
        <h1 className={`text-4xl font-bold mb-2.5`}>Advance Enchantments</h1>
      </header>
      <section className="bg-neutral-900 p-10 rounded-2xl">
        <div className="w-full mb-5">
          <label>
            <h3 className="text-xl text-neutral-400 mb-2.5">AE Shop</h3>
          </label>
          <div className="h-10 flex items-center">
            <Dropdown
              button={
                <main className="h-full min-w-40 w-fit px-4 bg-neutral-800 rounded-l-full flex justify-center items-center">
                  {aeCategory?.category}
                </main>
              }
              panelStyle={"bg-neutral-800 p-2.5"}
              options={aeShop}
              onSelect={(e) => setAECategory(e)}
            ></Dropdown>
            <input
              type="number"
              className="border border-neutral-800 h-full w-full rounded-r-full text-center"
              placeholder="Input Experience Points Here"
              onChange={(e) => setXPBudget(e.target.value)}
            ></input>
          </div>
        </div>
        <div className="flex justify-center gap-2.5">
          <p className="text-center bg-neutral-800 py-1 px-5 rounded-full text-sm">{`Can Buy: ${formatNumber(
            parseInt(xpBudget / aeCategory?.cost)
          )} AE Book/s`}</p>
        </div>
      </section>
    </main>
  );
}
