"use client";

import { useClose } from "@headlessui/react";
import { useState, useTransition } from "react";
import LabeledInput from "./input/LabeledInput";
import PetForms from "../../components/package/PetForms";

export default function StatusBuildComp({ fetchOnFinish, ID }) {
  const close = useClose();
  const [isPending, startTransition] = useTransition();

  const [data, setData] = useState({
    Status: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    startTransition(async () => {
      if (true) {
        try {
          const response = await fetch(`/../api/status_buildcomp`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: ID, // match column A
              columnIndex: 7, // column B is index 1
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
