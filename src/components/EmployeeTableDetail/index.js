import React from "react";

export default function EmployeeTableDetail() {
  return (
    <>
      <tr>
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
                  src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                  alt="Avatar Tailwind CSS Component"
                />
              </div>
            </div>
            <div>
              <div className="font-bold">Nguyễn Thanh Khoa</div>
              {/* <span className="badge badge-ghost badge-sm">
                Desktop Support Technician
              </span> */}
            </div>
          </div>
        </td>
        <td>
          <div className="font-bold">nguyenthanhkhoa8888@gmail.com</div>
        </td>
        <td>
          <div className="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
              />
            </svg>

            <div className="font-bold">0378251351</div>
          </div>
        </td>
        <td>
          <div className="font-bold">200 phan van tri,p12 TpHCM</div>
        </td>
        <td>
          <div className="font-bold">01/01/2002</div>
        </td>
        <td>
          <div className="font-bold">Nam</div>
        </td>
        <td>
          <div className="flex w-fit">
            <button
              id="btn__delete"
              className="w-6 h-6 rounded-sm "
              style={{ backgroundColor: "#feebe8", outline: "" }}
              onClick={() => document.getElementById("Delete").showModal()}
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
          </div>
          {/* Alert Delete */}
        </td>
      </tr>
    </>
  );
}
