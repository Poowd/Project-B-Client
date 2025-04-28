"use client";

import { useClose } from "@headlessui/react";
import { useEffect, useState, useTransition } from "react";
import { v4 as uuidv4 } from "uuid";
import PetForms from "../../components/package/PetForms";
import LabeledInput from "./input/LabeledInput";

export default function AddRewards({ fetchOnFinish, types, ID }) {
  const close = useClose();
  const [isPending, startTransition] = useTransition();

  const [data, setData] = useState({
    Reward: "",
    Value: 0,
    Type: types[0][1] || "None",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    startTransition(async () => {
      if (true) {
        try {
          const response = await fetch("/api/add_rewards", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              row: [uuidv4(), ID, data.Reward, data.Value, data.Type, "TRUE"],
            }),
          });

          // Parse the response content
          const res = await response.json();

          console.log(res);
          fetchOnFinish();

          close();
          return;
        } catch (error) {
          console.log(error);
        }
      }
    });
    return;
  };

  return (
    <PetForms
      handleSubmit={handleSubmit}
      title={"Add Rewards"}
      isPending={isPending}
    >
      <LabeledInput
        label={"Reward"}
        id={"Reward"}
        required={true}
        onChange={(e) =>
          setData((prev) => ({
            ...prev,
            [e.target.id]: e.target.value,
          }))
        }
      ></LabeledInput>
      <LabeledInput
        label={"Value"}
        id={"Value"}
        type={"number"}
        required={true}
        onChange={(e) =>
          setData((prev) => ({
            ...prev,
            [e.target.id]: e.target.value,
          }))
        }
      ></LabeledInput>

      <div className="flex flex-col text-start">
        <label htmlFor={"Type"} className="text-sm mb-1">
          Type
        </label>
        <select
          className="py-2 px-3 outline outline-neutral-300  rounded bg-neutral-900"
          name="Type"
          id="Type"
          required
          onChange={(e) =>
            setData((prev) => ({
              ...prev,
              [e.target.id]: e.target.value,
            }))
          }
        >
          {types.map((type) => (
            <option key={type[0]} value={type[1]}>
              {type[1]}
            </option>
          ))}
        </select>
      </div>
    </PetForms>
  );
}
