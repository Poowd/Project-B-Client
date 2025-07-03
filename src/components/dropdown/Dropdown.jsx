"use client";

import { useState } from "react";

export default function Dropdown({ button, panelStyle, options, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative h-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-full hover:cursor-pointer"
      >
        {button}
      </button>
      {isOpen && (
        <div
          className={`absolute top-full left-0 mt-1 min-w-40 w-56 max-w-96 ${panelStyle}`}
        >
          <ul>
            {options.map((option) => (
              <li
                key={option.category}
                className="px-4 py-2 hover:cursor-pointer"
                onClick={() => {
                  onSelect(option);
                  setIsOpen(false);
                }}
              >
                {option.category}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
