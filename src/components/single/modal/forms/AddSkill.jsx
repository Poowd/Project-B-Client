"use client";

import { useClose } from "@headlessui/react";
import { useState, useTransition } from "react";
import LabeledInput from "./input/LabeledInput";
import LabeledTextAreaInput from "./input/LabeledTextAreaInput";
import PetForms from "@/components/package/PetForms";

export default function AddSkill({ onSubmitCommand, pet }) {
  const close = useClose();
  const [isPending, startTransition] = useTransition();

  const [skill, setSkill] = useState({
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
          const response = await fetch(`/../api/add_archetopia_skills`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              Pet: pet?.PETID,
              Skill: skill.value,
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
      title={`Add ${pet?.Name}'s Skill`}
      isPending={isPending}
    >
      <LabeledInput
        label={"Skill"}
        style={skill.style}
        id={"skill"}
        onChange={(e) =>
          setSkill((value) => ({ ...value, value: e.target.value }))
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
