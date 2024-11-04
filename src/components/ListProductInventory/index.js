import { useBarcode } from "@createnextapp/react-barcode";
import React from "react";

export default function ListProductInventory() {
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
      <tr>
        <td>
          <label>
            <input type="checkbox" class="checkbox" />
          </label>
        </td>
        <td className="w-32">
          <div>
            <div className="font-bold">ASM001</div>
            <svg ref={inputRef} />
          </div>
        </td>
        <td className="w-32">
          <div>
            <div className="font-bold">PO9212</div>
          </div>
        </td>
        <td className="w-60">
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
              <div class="font-bold">Hart Hagerty</div>
              <span class="badge badge-ghost badge-sm">Nước giải khát</span>
              </div>
          </div>
        </td>
        <td>
          PepsiCo
        </td>
        <td>
          <h3 class="">30</h3>
        </td>
        <td>
          <input
            type="number"
            placeholder=""
            className="input input-bordered w-32"
          />
        </td>
      </tr>
    </>
  );
}
