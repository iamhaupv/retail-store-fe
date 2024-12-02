import React from "react";

export default function OrderTableDetail({ order }) {
  console.log(order);
  
  return (
    <>
      {order && order.products.map((product, index) => {
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
            <div className="font-bold">{product.unit.name}</div>
            </td>
            <td>
              <div className="font-bold">{(product.product.price * product.unit.convertQuantity).toLocaleString()} đ</div>
            </td>
            <td>
              <div className="font-bold" style={{ color: "#f13612" }}>
                {(product.quantity * product.unit.convertQuantity * product.product.price).toLocaleString()} đ
              </div>
            </td>
          </tr>
        );
      })}
    </>
  );
}
