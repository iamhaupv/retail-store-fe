import React, { useRef } from 'react'
import { Link } from 'react-router-dom';
import logo_form from "../../Image/LogoForm.png";
import html2canvas from 'html2canvas-pro';
import jsPDF from 'jspdf';

export default function Reciept() {
    const contentRef = useRef();
    const handleDownloadPdf = () => {
        const element = contentRef.current;
        html2canvas(element).then((canvas) => {
          const imgData = canvas.toDataURL("image/png");
          const pdf = new jsPDF("p", "mm", "a4");
          const imgWidth = 210; // A4 width in mm
          const pageHeight = 297; // A4 height in mm
          const imgHeight = (canvas.height * imgWidth) / canvas.width;
          let heightLeft = imgHeight;
          let position = 0;
    
          pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
    
          while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
          }
    
          pdf.save("document.pdf");
        });
      };
  return (
    <>
       
    </>
  )
}
