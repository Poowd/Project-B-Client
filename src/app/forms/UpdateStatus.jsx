"use client";

import { useClose } from "@headlessui/react";
import { useEffect, useState, useTransition } from "react";
import LabeledInput from "./input/LabeledInput";
import PetForms from "../../components/package/PetForms";

export default function UpdateStatus({ fetchOnFinish, entry }) {
  const close = useClose();
  const [isPending, startTransition] = useTransition();

  const [data, setData] = useState({
    ID: "",
    Name: "",
    Title: "",
    Type: "",
    Lore: "",
    Image: "",
    Status: "",
  });

  useEffect(() => {
    setData(entry);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    startTransition(async () => {
      if (true) {
        try {
          const response = await fetch(`/../api/status_cubiods`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: data.ID, // match column A
              columnIndex: 6, // column B is index 1
              newValue: data.Status,
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
        label={"Status"}
        id={"Status"}
        value={data?.Status}
        placeholder={data?.Status}
        onChange={(e) =>
          setData((prev) => ({
            ...prev,
            [e.target.id]: e.target.value,
          }))
        }
      ></LabeledInput>
    </PetForms>
  );
}
