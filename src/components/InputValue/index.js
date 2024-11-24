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
    <div className="mx-auto h-full w-full">
      <Combobox value={selected} onChange={handleSelect}>
        <div className="relative">
          <ComboboxInput
            className={clsx(
              "w-full rounded-lg border py-1.5 pr-8 pl-3 text-sm/6 text-black",
              "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black"
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
            className="group absolute inset-y-0 right-0 px-2.5"
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
            "w-[var(--input-width)] z-40 rounded-xl border bg-white p-1 [--anchor-gap:var(--spacing-1)] empty:invisible",
            "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0"
          )}
        >
          {filteredSuggestion.length === 0 ? (
            <div className="py-2 px-3 text-gray-500">No suggestions found.</div>
          ) : (
            filteredSuggestion.map((object) => (
              <ComboboxOption
                key={object._id}
                value={object}
                className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="invisible size-4 group-data-[selected]:visible"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m4.5 12.75 6 6 9-13.5"
                  />
                </svg>
                <div className="text-sm/6">
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
