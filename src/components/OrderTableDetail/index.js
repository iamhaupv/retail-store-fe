import React from "react";

export default function OrderTableDetail({ order }) {

  return (
    <>
      {order && order.products.map((product, index) => {
        const productTotalAmount = product.quantity * product.product.price;
        return (
          <tr key={index} className="hover:bg-slate-100">
            <td>
              <div>
                {product.product.id}
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
              <div className="font-bold">{product.product.price.toLocaleString()} VNĐ</div>
            </td>
            <td>
              <div className="font-bold" style={{ color: "#f13612" }}>
                {productTotalAmount.toLocaleString()} VNĐ
              </div>
            </td>
          </tr>
        );
      })}
    </>
  );
}
