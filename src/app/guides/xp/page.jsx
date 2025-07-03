"use client";

import { useState } from "react";

export default function Page() {
  const [currentLevel, setLevel] = useState(0);

  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ", ");
  };

  const getXP = () => {
    if (currentLevel <= 15) {
      return {
        level: currentLevel,
        xp: Math.pow(currentLevel, 2) + 6 * currentLevel,
        xprequired: 2 * currentLevel + 7,
      };
    }
    if (currentLevel >= 16 && currentLevel <= 30) {
      return {
        level: currentLevel,
        xp: 2.5 * Math.pow(currentLevel, 2) - 40.5 * currentLevel + 360,
        xprequired: 5 * currentLevel - 38,
      };
    }
    if (currentLevel >= 31) {
      return {
        level: currentLevel,
        xp: 4.5 * Math.pow(currentLevel, 2) - 162.5 * currentLevel + 2220,
        xprequired: 9 * currentLevel - 158,
      };
    }
  };

  return (
    <main className="w-[90%] lg:w-[40%] mx-auto py-20">
      <header className="text-center mb-5">
        <h1 className={`text-4xl font-bold mb-2.5`}>Experience</h1>
      </header>
      <section className="bg-neutral-900 p-10 rounded-2xl mb-5">
        <div className="w-full mb-5">
          <label>
            <h3 className="text-xl text-neutral-400 mb-2.5">
              Experience Level
            </h3>
          </label>
          <input
            type="number"
            className="border border-neutral-800 h-10 w-full rounded-full text-center"
            placeholder="Input Level Here"
            onChange={(e) => setLevel(e.target.value)}
          ></input>
        </div>
        <div className="flex justify-center gap-2.5">
          <p className="text-center bg-neutral-800 py-1 px-5 rounded-full text-sm">{`Lvl: ${
            getXP().level
          }`}</p>
          <p className="text-center bg-neutral-800 py-1 px-5 rounded-full text-sm">{`XP: ${formatNumber(
            getXP().xp
          )}`}</p>
          <p className="text-center bg-neutral-800 py-1 px-5 rounded-full text-sm">{`Next: ${formatNumber(
            getXP().xprequired
          )}`}</p>
        </div>
      </section>
    </main>
  );
}
