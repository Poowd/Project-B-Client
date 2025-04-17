"use client";
import { useClose } from "@headlessui/react";
import { useState, useTransition } from "react";
import LabeledInput from "./input/LabeledInput";
import LabeledTextAreaInput from "./input/LabeledTextAreaInput";
import PetForms from "@/components/package/PetForms";

export default function AddTrait({ onSubmitCommand, pet }) {
  const close = useClose();
  const [isPending, startTransition] = useTransition();

  const [trait, setTrait] = useState({
    value: null,
    style: "",
    text_style: "",
    message: null,
  });
  const [level, setLevel] = useState({
    value: null,
    style: "",
    text_style: "",
    message: null,
  });
  const [description, setDescription] = useState({
    value: null,
    style: "",
    text_style: "",
    message: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    startTransition(async () => {
      if (true) {
        try {
          const response = await fetch(`/../api/add_archetopia_traits`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              Pet: pet?.PETID,
              Trait: trait.value,
              Level: level.value,
              Description: description.value,
            }),
          });

          // Parse the response content
          const res = await response.json();

          if (res.status === true) {
            onSubmitCommand();
            close();
            return;
          } else {
            console.log(res.status.details);
            return;
          }
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
      title={`Add ${pet?.Name}'s Trait`}
      isPending={isPending}
    >
      <LabeledInput
        label={"Trait"}
        style={trait.style}
        id={"trait"}
        onChange={(e) =>
          setTrait((value) => ({ ...value, value: e.target.value }))
        }
      ></LabeledInput>
      <LabeledInput
        label={"Level"}
        style={level.style}
        id={"level"}
        onChange={(e) =>
          setLevel((value) => ({ ...value, value: e.target.value }))
        }
      ></LabeledInput>
      <LabeledTextAreaInput
        label={"Description"}
        style={description.style}
        id={"description"}
        onChange={(e) =>
          setDescription((value) => ({
            ...value,
            value: e.target.value,
          }))
        }
      ></LabeledTextAreaInput>
    </PetForms>
  );
}
