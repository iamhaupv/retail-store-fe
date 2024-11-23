import React, { useState, useEffect } from "react";
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import clsx from "clsx";

export default function InputValue({
  suggestion,
  value,
  onchange,
  placeholder,
}) {
  const [query, setQuery] = useState(value || "");
  const [selected, setSelected] = useState(
    suggestion.find((item) => item._id === value) || null
  );

  useEffect(() => {
    setQuery(value || "");
    setSelected(suggestion.find((item) => item._id === value) || null);
  }, [value, suggestion]);

  const filteredSuggestion =
    query === ""
      ? suggestion
      : suggestion.filter((item) => {
          const name = item.name || "";
          return name.toLowerCase().includes(query.toLowerCase());
        });

  const handleSelect = (item) => {
    if (item) {
      setSelected(item);
      setQuery(item.name || "");
      onchange(item._id);
    }
  };

  return (
    <div className="relative border-black mx-auto w-full max-w-xs rounded-lg transition-all">
      <Combobox value={selected} onChange={handleSelect}>
        <div className="relative flex items-center">
          <ComboboxInput
            className={clsx(
              "w-full max-w-xs py-3 pr-10 pl-3 text-sm",
              "text-gray-800 bg-white placeholder-gray-500"
            )}
            onChange={(event) => {
              const inputValue = event.target.value;
              setQuery(inputValue);
              onchange(inputValue);
            }}
            placeholder={placeholder}
            value={query}
          />
          <ComboboxButton
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-600 "
            onClick={() => {
              setQuery("");
              setSelected(null);
              onchange("");
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </ComboboxButton>
        </div>

        <ComboboxOptions
          anchor="bottom"
          transition
          className={clsx(
            "absolute w-full max-w-xs mt-1",
            "bg-white rounded-lg  border border-gray-300",
            "overflow-y-auto max-h-48 ring-1 ring-gray-200",
            "transition-opacity duration-300 ease-in-out",
            "z-50"
          )}
        >
          {filteredSuggestion.length === 0 ? (
            <div className="py-2 px-3 text-gray-500">No suggestions found.</div>
          ) : (
            filteredSuggestion.map((object) => (
              <ComboboxOption
                key={object._id}
                value={object}
                className={clsx(
                  "group flex cursor-pointer items-center gap-2",
                  "py-2 px-3 rounded-lg",
                  "text-gray-700 hover:text-gray-900",
                  "transition duration-200 ease-in-out transform hover:scale-105"
                )}
              >
                <div className="text-sm font-medium">
                  {object.name || "Unnamed"}
                </div>
              </ComboboxOption>
            ))
          )}
        </ComboboxOptions>
      </Combobox>
    </div>
  );
}
