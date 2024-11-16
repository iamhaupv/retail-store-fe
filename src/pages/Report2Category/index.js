import React from 'react'

export default function Report2Category() {
  return (
    <>
      <div className="overflow-x-auto">
        <h1 className="w-full flex items-center justify-start">
          Hiển thị trong{" "}
          <select class="select select-bordered w-32 select-sm ml-2 mr-2 mb-2">
            <option selected>7 ngày</option>
            <option>30 ngày</option>
            <option>365 ngày</option>
          </select>
          (so sánh với lần báo cáo trước đó)
        </h1>
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>Tên ngành hàng</th>
              <th>Số lượng đã bán</th>
              <th>Tổng doanh thu</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <td>
                Nước ngọt
              </td>
              <td>
                <div className="lg:tooltip" data-tip="Tăng 13 Sản phẩm">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="size-4 text-green-400 mr-1"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
                      />
                    </svg>
                    123
                  </div>
                </div>
              </td>
              <td>
                <div className="lg:tooltip" data-tip="Tăng 13.000 đ">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="size-4 text-green-400 mr-1"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
                      />
                    </svg>
                    200.000 đ
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th className="font-bold text-lg text-black">Tổng</th>
              <th className="font-bold text-lg text-black">1.000</th>
              <th className="font-bold text-lg text-black">1.200.000 đ</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  )
}
