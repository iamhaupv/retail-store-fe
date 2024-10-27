import React, { useEffect, useState } from "react";
// import ListProductInventory from "../../components/ListProductInventory";
import ListProductWareHouse from "../../components/ListProductWareHouse";
import TableDetailWarehouse from "../../components/TableDetailWarehouse";
import Autocomplete from "../../components/AutoComplete";
import apiGetAllProduct from "../../apis/apiGetAllProducts";

export default function WarehouseReceipt() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [products, setProducts] = useState([])
  const fetchPrducts = async () => {
    try {
      const token = localStorage.getItem("accessToken")
      if(!token) throw new Error("Token is invalid")
      const response = await apiGetAllProduct(token);
      setProducts(response.products);
    } catch (error) {
      throw new Error(error);
    }
  };
  useEffect(() => {
    fetchPrducts();
  }, []);

  const [isClicked, setIsClicked] = useState(false);
  const placeHolderBrand = "Nhà cung cấp..";
  const placeHolderCategory = "loại sản phẩm..";

  const suggestion = [
    { id: 1, name: "Nước ngọt " },
    { id: 2, name: "Nước ép trái cây" },
    { id: 3, name: "Nước tăng lực" },
    { id: 4, name: "Nước trà" },
    { id: 5, name: "Cà phê hòa tan" },
    { id: 6, name: "Cà phê pha phin" },
    { id: 7, name: "Cà phê lon" },
  ];

  return (
    <>
      {/* <Content component={Receipt}/> */}
      <div
        className="w-11/12 h-auto justify-center flex overflow-y-auto"
        style={{ backgroundColor: "#F5F5F5" }}
      >
        <div className="w-11/12 mr-4 animate__animated animate__fadeInRight">
          <div className="w-full mr-4 rounded-sm">
            {/* Thông tin sản phẩm */}

            <div className="card bg-white rounded-lg top-7 grid  ">
              <h4 className="font-bold text-xl w-full ml-4">
                Tạo phiếu nhập kho
              </h4>

              <h4 className="font-medium text-base w-11/12 ml-4 mb-2 mt-3">
                Mã phiếu
              </h4>
              <input
                type="text"
                placeholder="Mã phiếu"
                className="input input-bordered w-11/12 h-10 ml-4"
                disabled
              />

              <h4 className="font-medium text-base w-11/12 ml-4 mb-2 mt-3">
                Người lập
              </h4>
              <input
                type="text"
                placeholder="Người lập"
                className="input input-bordered w-11/12 h-10 ml-4 mb-4"
                disabled
              />
            </div>
          </div>
          {/* Hình ảnh sản phẩm */}
          <div className="w-full h-fit mr-4 rounded-sm pt-4 pb-8">
            <div className="card bg-white h-fit rounded-sm top-7 grid pt-6 ">
              <h4 className="font-bold text-xl w-full ml-4">
                Danh sách mặt hàng 
              </h4>
              <div className="flex pt-8 h-fit w-full  pb-2">
                {/* Ảnh SP đại diện */}
                {/* Hình 1 */}
                {/* <div className='w-4/12'> */}
                <button
                  className="hidden"
                  onClick={openModal}
                  id="FileMain"
                />

                {isClicked ? (
                  // tableWareHouseReceipt
                  <div className="overflow-y-auto w-full h-96">
                    <table className="table table-pin-rows">
                      {/* head */}
                      <thead>
                        <tr>
                          <th>Mã sản phẩm</th>
                          <th>Tên sản phẩm</th>
                          <th>Số lượng</th>
                          <th>Đơn vị tính</th>
                          <th>Giá nhập</th>
                          <th>Ngày hết hạn</th>
                          <th>Thao tác</th>
                        </tr>
                      </thead>
                      <tbody>
                        <TableDetailWarehouse />
                        {/* row 2 */}
                        <TableDetailWarehouse />
                        {/* row 3 */}
                        <TableDetailWarehouse />
                        {/* row 4 */}
                        <TableDetailWarehouse />
                        <TableDetailWarehouse />
                        {/* row 2 */}
                        <TableDetailWarehouse />
                        {/* row 3 */}
                        <TableDetailWarehouse />
                        {/* row 4 */}
                        <TableDetailWarehouse />
                      </tbody>
                      {/* foot */}
                      <tfoot>
                        <tr></tr>
                      </tfoot>
                    </table>
                  </div>
                ) : (
                  <label
                    htmlFor="FileMain"
                    className=" border-2 border-dashed w-full h-1/6 ml-4 mr-4 "
                    style={{ borderColor: "#D9D9D9" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class=""
                      style={{ color: "#D9D9D9" }}
                      className="w-full h-36 items-center"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
                  </label>
                )}
                {/* </div> */}
              </div>
            </div>
          </div>
          {/* Button Thêm và Hủy */}
          <div className="flex mt-5 mb-5 h-32">
            <button
              class="btn w-28 text-white "
              style={{ backgroundColor: "#f13612" }}
            >
              Thêm
            </button>
            <button
              class="btn w-28 ml-4"
              style={{ backgroundColor: "#e0e0e0" }}
            >
              Hủy
            </button>
          </div>
        </div>

        {/* <div className="w-3/12 rounded-md ml-7">
          <div className="card bg-white rounded-sm top-7 grid  ">
            
          </div>
        </div> */}
      </div>
      {isModalOpen && (
       <div className="fixed w-screen  inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="modal-box w-full  max-w-6xl h-full overflow-y-hidden ">
          <h3 className="font-bold text-lg mb-6">Danh sách sản phẩm</h3>
          <div className="flex items-center mb-4">
            {/* Brand */}
            <div className="w-52 ">
              <Autocomplete
                suggestion={suggestion}
                placeholder="Nhà cung cấp.."
              />
            </div>
            {/* Product */}
            <div className="w-52 ml-3 mr-3">
              <Autocomplete
                suggestion={suggestion}
                placeholder="Loại sản phẩm.."
              />
            </div>
            {/* Search Input  */}
            <div className="w-52  mr-3">
              <Autocomplete suggestion={suggestion} placeholder="Tìm kiếm" />
            </div>
          </div>
          {/* table product  */}
          <div className=" overflow-y-scroll h-4/6">
            <table className="table table-pin-rows">              
              <thead>
                <tr>
                  <th></th>
                  <th>Mã sản phẩm</th>
                  <th>Sản phẩm</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr className="hover:bg-slate-100">
                    <th key={product._id}>
                      <label>
                        <input type="checkbox" class="checkbox" />
                      </label>
                    </th>
                    <td>
                      <div>
                        <div className="font-bold">ASM001</div>
                      </div>
                    </td>
                    <td>
                      <div class="flex items-center gap-3">
                        <div class="avatar">
                          <div class="mask mask-squircle h-12 w-12">
                            <img
                              src={product.images[0]}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                        <div>
                          <div class="font-bold">{product.title}</div>
                          <div class="text-sm opacity-50">{product.title}</div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot></tfoot>
            </table>
          </div>

          <div className="modal-action ">
            <div className="flex w-full">
              <form method="dialog">
                <button
                  class="btn w-28 text-white"
                  style={{ backgroundColor: "#f13612" }}
                  onClick={() => setIsClicked(true)}
                >
                  Thêm
                </button>
                {/* if there is a button in form, it will close the modal */}
                <button
                  class="btn w-28 ml-4"
                  style={{ backgroundColor: "#e0e0e0" }}
                  onClick={closeModal}
                >
                  Hủy
                </button>
              </form>
            </div>
          </div>
        </div>
        </div>
      )}
    </>
  );
}
