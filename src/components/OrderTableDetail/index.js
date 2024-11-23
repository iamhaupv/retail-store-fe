import { useBarcode } from "@createnextapp/react-barcode";
import React from "react";

export default function OrderTableDetail({ order }) {
  // const { inputRef } = useBarcode({
  //   value: "ASM001",
  //   options: {
  //     displayValue: false,
  //     background: "#ffffff",
  //     width: 1,
  //     height: 25,
  //   },
  // });

  return (
    <>
      {order && order.products.map((product, index) => {
        const productTotalAmount = product.quantity * product.product.price;
        return (
          <tr key={index} className="hover:bg-slate-100">
            <td>
              <div>
                <div className="font-bold">ASM001</div>
                {/* <svg ref={inputRef} /> */}
              </div>
            </td>
            <td>
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="mask rounded h-12 w-12">
                    <img
                      src={`${product.product.images[0]}`}
                      alt={product.product.title}
                    />
                  </div>
                </div>
                <div className="font-bold">{product.product.title}</div>
              </div>
            </td>
            <td>
              <div className="font-bold">{product.quantity}</div>
            </td>
            <td>
              <div className="font-bold">{product.product.price} VNĐ</div>
            </td>
            <td>
              <div className="font-bold" style={{ color: "#f13612" }}>
                {productTotalAmount} VNĐ
              </div>
            </td>
          </tr>
        );
      })}
    </>
  );
}
