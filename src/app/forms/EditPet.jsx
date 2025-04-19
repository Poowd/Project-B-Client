"use client";

import { useClose } from "@headlessui/react";
import { useEffect, useState, useTransition } from "react";
import LabeledInput from "./input/LabeledInput";
import LabeledTextAreaInput from "./input/LabeledTextAreaInput";
import PetForms from "@/components/package/PetForms";

export default function EditPet({ fetchOnFinish, entry }) {
  const close = useClose();
  const [isPending, startTransition] = useTransition();

  const [data, setData] = useState({
    ID: "",
    Name: "",
    Title: "",
    Type: "",
    Lore: "",
    Image: "",
  });

  useEffect(() => {
    setData(entry);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    startTransition(async () => {
      if (true) {
        try {
          const response = await fetch(`/../api/update_cubiods`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: data.ID, // match column A
              updatedValues: [
                data.Name,
                data.Title,
                data.Type,
                data.Image,
                data.Lore,
              ],
              startCol: 1, // column B is index 1
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
      title={"Modify Pet"}
      isPending={isPending}
    >
      <LabeledInput
        label={"Name"}
        id={"Name"}
        value={data?.Name}
        placeholder={data?.Name}
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
        value={data?.Title}
        onChange={(e) =>
          setData((prev) => ({
            ...prev,
            [e.target.id]: e.target.value,
          }))
        }
      ></LabeledInput>
      <LabeledInput
        label={"Type"}
        id={"Type"}
        value={data?.Type}
        onChange={(e) =>
          setData((prev) => ({
            ...prev,
            [e.target.id]: e.target.value,
          }))
        }
      ></LabeledInput>
      <LabeledInput
        label={"Image"}
        id={"Image"}
        value={data?.Image}
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
        value={data?.Lore}
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
