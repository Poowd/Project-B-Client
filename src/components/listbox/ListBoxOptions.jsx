"use client";

import { ListboxOption } from "@headlessui/react";

export const SpecialtyOptions = () => {
  return specialtyList.map((specialty) => (
    <ListboxOption
      key={specialty}
      value={specialty}
      className="data-focus:bg-neutral-900 py-1.5 px-5 min-w-40 rounded-lg"
    >
      {specialty}
    </ListboxOption>
  ));
};

export const SpecimenOptions = () => {
  return specimenList.map((specimen) => (
    <ListboxOption
      key={specimen.type}
      value={specimen.type}
      className="data-focus:bg-neutral-900 py-1.5 px-5 min-w-40 rounded-lg"
    >
      {specimen.type}
    </ListboxOption>
  ));
};

export const specialtyList = [
  "Nitwit",
  "PvP",
  "PvE",
  "Trading",
  "Exploration",
  "Gathering",
  "Crafting",
  "Support",
  "Utility",
];

export const specimenList = [
  { type: "Basic", color: "", colorCode: "", skills: [] },
  {
    type: "Normal",
    color: "text-gray-600",
    colorCode: "&7",
    skills: [
      {
        name: "Pet Skill",
        level: 0,
        description: "The Skill's Description.",
      },
    ],
  },
  {
    type: "Highbreed",
    color: "text-red-600",
    colorCode: "&4",
    skills: [
      {
        name: "Pet Skill",
        level: 0,
        description: "The Skill's Description.",
      },
      {
        name: "Pet Skill",
        level: 0,
        description: "The Skill's Description.",
      },
    ],
  },
  {
    type: "Mechanical",
    color: "text-green-600",
    colorCode: "&2",
    skills: [
      {
        name: "Pet Skill",
        level: 0,
        description: "The Skill's Description.",
      },
      {
        name: "Pet Skill",
        level: 0,
        description: "The Skill's Description.",
      },
    ],
  },
  {
    type: "Elemental",
    color: "text-orange-600",
    colorCode: "&6",
    skills: [
      {
        name: "Pet Skill",
        level: 0,
        description: "The Skill's Description.",
      },
      {
        name: "Pet Skill",
        level: 0,
        description: "The Skill's Description.",
      },
    ],
  },
  {
    type: "Genteel",
    color: "text-cyan-600",
    colorCode: "&b",
    skills: [
      {
        name: "Pet Skill",
        level: 0,
        description: "The Skill's Description.",
      },
      {
        name: "Pet Skill",
        level: 0,
        description: "The Skill's Description.",
      },
      {
        name: "Pet Skill",
        level: 0,
        description: "The Skill's Description.",
      },
    ],
  },
  {
    type: "Fairy",
    color: "text-purple-600",
    colorCode: "&d",
    skills: [
      {
        name: "Pet Skill",
        level: 0,
        description: "The Skill's Description.",
      },
      {
        name: "Pet Skill",
        level: 0,
        description: "The Skill's Description.",
      },
      {
        name: "Pet Skill",
        level: 0,
        description: "The Skill's Description.",
      },
      {
        name: "Pet Skill",
        level: 0,
        description: "The Skill's Description.",
      },
    ],
  },
];
