import { useBarcode } from "@createnextapp/react-barcode";

const Barcode = ({ value }) => {
    const { inputRef } = useBarcode({
      value,
      options: {
        displayValue: false,
        background: "#ffffff",
        lineColor: "#000000",
        width: 0.4,
        height: 25,
      },
    });
  
    return <svg ref={inputRef} />;
  };

  export default Barcode