"use client";

import { useClose } from "@headlessui/react";
import { useEffect, useState, useTransition } from "react";
import { v4 as uuidv4 } from "uuid";
import PetForms from "../../components/package/PetForms";
import LabeledInput from "./input/LabeledInput";
import LabeledFileInput from "./input/LabeledFileInput";
import LabeledTextAreaInput from "./input/LabeledTextAreaInput";

export default function AddPet({ fetchOnFinish, totalPets, categories }) {
  const close = useClose();
  const [isPending, startTransition] = useTransition();
  const [file, setFile] = useState(null);

  const [data, setData] = useState({
    Name: "",
    Title: "",
    Type: categories[0][1],
    Lore: "",
    Image: "",
  });

  useEffect(() => {
    setData((prev) => ({ ...prev, Image: file?.name }));
  }, [file]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    startTransition(async () => {
      if (true) {
        try {
          const response = await fetch("/api/add_cubiods", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              row: [
                uuidv4(),
                data.Name,
                data.Title,
                data.Type,
                data.Image,
                data.Lore,
                "TRUE",
              ],
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
      title={"Add Pet"}
      isPending={isPending}
    >
      <LabeledInput
        label={"Name"}
        id={"Name"}
        required={true}
        onChange={(e) =>
          setData((prev) => ({
            ...prev,
            [e.target.id]: e.target.value,
          }))
        }
      ></LabeledInput>
      <LabeledInput
        label={"Title"}
        id={"Title"}
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
          className="py-2 px-3 outline outline-neutral-300  rounded"
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
          {categories.map((category) => (
            <option key={category[0]} value={category[1]}>
              {category[1]}
            </option>
          ))}
        </select>
      </div>

      <LabeledInput
        label={"Image"}
        id={"Image"}
        required={true}
        onChange={(e) =>
          setData((prev) => ({
            ...prev,
            [e.target.id]: e.target.value,
          }))
        }
      ></LabeledInput>

      <LabeledTextAreaInput
        label={"Lore"}
        id={"Lore"}
        onChange={(e) =>
          setData((prev) => ({
            ...prev,
            [e.target.id]: e.target.value,
          }))
        }
        required={true}
      ></LabeledTextAreaInput>
    </PetForms>
  );
}
