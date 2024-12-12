import { useState } from "react";
import apiUnit from "../../apis/apiUnit";

export default function CategoryTableDetail({ units, setIsUpdate }) {
  const [isOpen, setIsOpen] = useState(false);
  const [unitCurrent, setUnitCurrent] = useState(null);
  const handleIsDisplay = async () => {
    // try {
      
    //   const token = localStorage.getItem("accessToken");
    //   if (!token) throw new Error("Token is invalid!");
    //   const id = unitCurrent._id
    //   const response = await apiUnit.apiIsDisplay(token, {id});
    //   setIsOpen(false);
    //   setIsUpdate(true);
    // } catch (error) {
    //   console.log("handle is display is error", error);
    // }
    console.log("hfslsjsl");
    
  };
  
  return (
    <>
      {units.map((unit) => (
        <tr className="hover:bg-slate-100">
          <td key={unit._id}>{unit.name}</td>
          <td>{unit.convertQuantity}</td>
          <td>
            <button
              className=" w-6 h-6 rounded-lg mr-2"
              style={{ backgroundColor: "#ebf3fe", outline: "" }}
              onClick={() => setIsUpdate({ status: true, unit })}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
                style={{ color: "#2f80ed" }}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
            </button>
            <button
              className="w-6 h-6 rounded-lg "
              style={{ backgroundColor: "#feebe8", outline: "" }}
              
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                style={{ color: "#f13612" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </td>
        </tr>
      ))}
    </>
  );
}
