import { useBarcode } from "@createnextapp/react-barcode";
import React from "react";

export default function OrderTableDetail() {
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
        <td>
          <div>
            <div className="font-bold">ASM001</div>
            <svg ref={inputRef} />
          </div>
        </td>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask rounded h-12 w-12">
                <img
                  src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                  alt="Avatar Tailwind CSS Component"
                />
              </div>
            </div>
            <div className="font-bold">Nước ngọt Pepsi</div>
          </div>
        </td>
        <td >
        <div className="font-bold ">10</div>
        </td>
        <td>
        <div className="font-bold">20.000 VNĐ</div>
        </td>
        <td>
        <div className="font-bold" style={{color:"#f13612"}}>200.000 VNĐ</div>
        </td>
      </tr>
    </>
  );
}
