import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import clsx from "clsx";
import { useEffect, useState } from "react";

export default function Autocomplete({ suggestion, onchange, placeholder, defaultValue}) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null); 

  useEffect(() => {
    if (defaultValue) {
      const defaultObj = suggestion.find(item => item.name === defaultValue);
      if (defaultObj) {
        setSelected(defaultObj);  // Nếu có giá trị mặc định, set selected
        setQuery(defaultValue);   // Và set query để ô nhập có giá trị mặc định
      }
    }
  }, [defaultValue, suggestion]);
  const filteredSuggestion =
  query === ""
    ? suggestion
    : suggestion.filter((object) => {
        // Chuyển object.name về dạng chuỗi, nếu nó là số hay giá trị khác
        const name = String(object.name);  // Chuyển bất kỳ giá trị nào thành chuỗi
        return name.toLowerCase().includes(query.toLowerCase());
      });

  
  const clearValues = () => {
    setQuery("");
    setSelected(null);
    onchange(""); 
  };

  return (
    <div className="mx-auto h-full w-full">
      <Combobox
        value={selected}
        onChange={(value) => {
          setSelected(value);
          if (onchange && value) {
            onchange(value.name);
          }
        }}
        onClose={() => setQuery("")}
      >
        <div className="relative">
          <ComboboxInput
            className={clsx(
              "w-full rounded-lg border py-1.5 pr-8 pl-3 text-sm/6 text-black",
              "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black"
            )}
            displayValue={(object) => object?.name}
            onChange={(event) => {
              const value = event.target.value;
              setQuery(value);
              onchange(value ? value : ""); 
            }}
            placeholder={placeholder}
          />
          <ComboboxButton 
          className="group absolute inset-y-0 right-0 px-2.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-4 fill-white/60 group-data-[hover]:bg-slate-100"
              onClick={clearValues} // Gọi hàm clear khi nhấn nút
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
            "w-[var(--input-width)] rounded-xl border bg-white p-1 [--anchor-gap:var(--spacing-1)] empty:invisible",
            "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0"
          )}
        >
          {filteredSuggestion.map((object) => (
            <ComboboxOption
              key={object.id}
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

              <div className="text-sm/6">{object.name}</div>
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </Combobox>
    </div>
  );
}
