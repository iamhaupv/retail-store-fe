import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import clsx from "clsx";
import { useState, useEffect } from "react";

export default function ChangeInput({
  suggestion,
  value,
  onchange,
  placeholder,
}) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  
  // Cập nhật khi nhận giá trị mới từ prop `value`
  useEffect(() => {
    if (value) {
      setQuery(value); // Cập nhật query để hiển thị đúng trong input
    } else {
      setQuery("");
    }
  }, [value]);

  // Lọc gợi ý dựa trên query
  const filteredSuggestion =
    query === ""
      ? suggestion
      : suggestion.filter(
          (item) => item.name?.toLowerCase().includes(query.toLowerCase()) // Kiểm tra item.name có tồn tại
        );

  // Xử lý khi chọn một mục từ danh sách
  const handleSelect = (item) => {
    if (item) {
      // Kiểm tra item không phải là null hoặc undefined
      setSelected(item);
      setQuery(item.name || ""); // Kiểm tra item.name trước khi hiển thị
      onchange(item.name || ""); // Cập nhật giá trị cha
    } else {
      setSelected(null);
      setQuery("");
      onchange("");
    }
  };

  return (
    <div className="mx-auto h-full w-full relative"> {/* relative để tạo không gian cho absolute */}
      <Combobox
        value={selected}
        onChange={handleSelect} // Xử lý khi chọn mục từ danh sách
      >
        <div className="w-fit items-center justify-center rounded-lg border-2 border-gray-100" > {/* Đảm bảo các thành phần con có position relative */}
          <ComboboxInput
            className={clsx(
              "w-72 rounded-lg border-none py-1.5 pr-8 pl-3 text-sm text-black",
              "focus: border-none"
            )}
            onChange={(event) => {
              const inputValue = event.target.value;
              setQuery(inputValue); // Cập nhật giá trị người dùng nhập
              onchange(inputValue); // Cập nhật giá trị cha khi nhập
            }}
            placeholder={placeholder}
            value={query} // Đảm bảo giá trị của input là query
          />
          <ComboboxButton
            className=" mr-2"
            onClick={() => setQuery("")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-4 fill-white/60 group-hover:bg-slate-100"
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
          className={clsx(
            "w-full max-w-xs rounded-xl  bg-white p-1",
            "transition duration-100 ease-in",
            "overflow-y-auto max-h-48", // Giới hạn chiều cao và thanh cuộn
            "absolute left-0 top-full z-10" // Đảm bảo ComboboxOptions không bị đè lên
          )}
        >
          {filteredSuggestion.length === 0 ? (
            <div className="py-2 px-3 text-gray-500">Không tìm thấy.</div>
          ) : (
            filteredSuggestion.map((object) => (
              <ComboboxOption
                key={object._id}
                value={object}
                className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none"
              >
                <div className="text-sm">{object.name || "Unnamed"}</div>{" "}
                {/* Hiển thị "Unnamed" nếu name rỗng */}
              </ComboboxOption>
            ))
          )}
        </ComboboxOptions>
      </Combobox>
    </div>
  );
}
