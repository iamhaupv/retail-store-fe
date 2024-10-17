import { useBarcode } from "@createnextapp/react-barcode";
import React from "react";

export default function ListProductWareHouse() {
  const { inputRef } = useBarcode({
    value: "ASM001",
    options: {
      displayValue: false,
      background: "#ffffff",
      width: 1,
      height: 25,
    },
  });
  return (
    <>
      <tr className="hover:bg-slate-100">
        <th>
          <label>
            <input type="checkbox" class="checkbox" />
          </label>
        </th>
        <td>
          <div>
            <div className="font-bold">ASM001</div>
            <svg ref={inputRef} />
          </div>
        </td>
        <td>
          <div class="flex items-center gap-3">
            <div class="avatar">
              <div class="mask mask-squircle h-12 w-12">
                <img
                  src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                  alt="Avatar Tailwind CSS Component"
                />
              </div>
            </div>
            <div>
              <div class="font-bold">Nước ngọt pepsi dung tích 120ml</div>
              <span class="badge badge-ghost badge-sm">Nước giải khát</span>
            </div>
          </div>
        </td>
      </tr>
    </>
  );
}
