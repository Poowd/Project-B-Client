"use client";

import { useClose } from "@headlessui/react";
import { useEffect, useState, useTransition } from "react";
import { v4 as uuidv4 } from "uuid";
import PetForms from "../../components/package/PetForms";
import LabeledInput from "./input/LabeledInput";
import { colors } from "../../hooks/data/colors";

export default function AddCategory({ fetchOnFinish, totalPets }) {
  const close = useClose();
  const [isPending, startTransition] = useTransition();
  const [file, setFile] = useState(null);

  const [data, setData] = useState({
    Category: "",
    Level: "",
    Color: "",
  });

  useEffect(() => {
    setData((prev) => ({ ...prev, Image: file?.name }));
  }, [file]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    startTransition(async () => {
      if (true) {
        try {
          const response = await fetch("/api/add_category", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              row: [uuidv4(), data.Category, data.Level, data.Color, "TRUE"],
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
      title={"Add Category"}
      isPending={isPending}
    >
      <LabeledInput
        label={"Category"}
        id={"Category"}
        required={true}
        onChange={(e) =>
          setData((prev) => ({
            ...prev,
            [e.target.id]: e.target.value,
          }))
        }
      ></LabeledInput>
      <LabeledInput
        label={"Level"}
        id={"Level"}
        required={true}
        onChange={(e) =>
          setData((prev) => ({
            ...prev,
            [e.target.id]: e.target.value,
          }))
        }
      ></LabeledInput>

      <div className="flex flex-col text-start">
        <label htmlFor={"Color"} className="text-sm mb-1">
          Color
        </label>
        <select
          className="py-2 px-3 border border-neutral-800 focus:border-cyan-300 rounded"
          name="Color"
          id="Color"
          defaultValue={colors[0].color}
          onChange={(e) =>
            setData((prev) => ({
              ...prev,
              [e.target.id]: e.target.value,
            }))
          }
        >
          {colors.map((color) => (
            <option key={color.color} value={color.color}>
              {color.display}
            </option>
          ))}
        </select>
      </div>
    </PetForms>
  );
}
