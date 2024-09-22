import React from "react";
import "./Receipt.css";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import HeaderDetailStockReceipt from "../HeaderDetailStockReceipt";
export default function Receipt() {
  return (
    <>
    <div><HeaderDetailStockReceipt/>
      <div className="container__content">
        <div className="page__name p-[30px]">
          {/* <div>
            <Link>Nhập kho</Link>
          </div>
          <div className="ml-[55px]">
            <Link>Xuất kho</Link>
          </div> */}
          <div role="tablist" className="tabs tabs-bordered">
  <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Tab 1" />
  <div role="tabpanel" className="tab-content p-10">Tab content 1</div>

  <input
    type="radio"
    name="my_tabs_1"
    role="tab"
    className="tab"
    aria-label="Tab 2"
    defaultChecked />
  <div role="tabpanel" className="tab-content p-10">Tab content 2</div>

  <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Tab 3" />
  <div role="tabpanel" className="tab-content p-10">Tab content 3</div>
</div>
{/*  */}
        </div>
        <div className="receipt__above p-[30px] h-[70px]">
          <div class="max-w-sm w-full">
            <label for="search" class="sr-only">
              Search
            </label>
            <div class="relative">
              <input
                type="search"
                id="search"
                name="search"
                placeholder="Search..."
                class="block w-full pl-10 pr-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
              />
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </div>
            </div>
          </div>
          <div class="flex gap-4 max-w-sm w-full items-start">
            <label
              for="date"
              class="mt-3 text-gray-700 text-sm font-bold whitespace-nowrap"
            >
              Ngày lập
            </label>
            <input
              type="date"
              id="date"
              name="date"
              class="bg-white border border-gray-300 rounded-lg shadow-sm px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out flex-grow"
              placeholder="Select a date"
            />
          </div>
        </div>
        <div className="receipt__above p-[30px]">
          <div>
            <span>Phiếu nhập kho</span>
          </div>
          <div>
            <button>+ Lập phiếu nhập kho</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 bg-white">
            <thead>
              <tr>
                <th>Số phiếu</th>
                <th>Ngày lập</th>
                <th>Người lập</th>
                <th>Tổng SP</th>
                <th>Tổng tiền (VNĐ)</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>1</th>
                <td>Cy Ganderton</td>
                <td>Quality Control Specialist</td>
                <td>Blue</td>
              </tr>
              <tr>
                <th>2</th>
                <td>Hart Hagerty</td>
                <td>Desktop Support Technician</td>
                <td>Purple</td>
              </tr>
              <tr>
                <th>3</th>
                <td>Brice Swyre</td>
                <td>Tax Accountant</td>
                <td>Red</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div></div>
    </>
  );
}
