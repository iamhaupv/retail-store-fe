import React, { useState } from "react";

export default function CurrencyInput() {
  const [value, setValue] = useState("");

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  const handleBlur = () => {
    const numericValue = parseFloat(value.replace(/,/g, ""));
    if (!isNaN(numericValue)) {
      setValue(formatCurrency(numericValue));
    }
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <input
      type="text"
      value={value}
      onBlur={handleBlur}
      onChange={handleChange}
      placeholder="Nhập số tiền"
    />
  );
}
