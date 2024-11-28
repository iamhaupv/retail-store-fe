import { useBarcode } from "@createnextapp/react-barcode";
import React from "react";

export default function BarcodeCreate({
  productCode,
  wareHouseReceiptCode,
  expiryDate,
}) {
  const barcodeValue = `${productCode}-${wareHouseReceiptCode}-${expiryDate}`;
  const { inputRef } = useBarcode({
    value: barcodeValue,
    options: {
      background: "#ffffff",
      lineColor: "#000000",
      displayValue: false,
      width: 1.5,
    },
  });
  return <svg ref={inputRef} />;
}
