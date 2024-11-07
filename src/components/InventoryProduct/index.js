import { useEffect, useState } from "react";
import ProductInventory from "../ProductInventory";
import apiGetListShelf from "../../apis/apiGetListShelf";
import apiGetProductsByShelf from "../../apis/apiProductByShelfName";

export default function InventoryProduct({onChangeModal}) {
  const [shelfs, setShelfs] = useState([]);
  const [shelf, setShelf] = useState('')
  const [products, setProducts] = useState([])
  const fetchProductByShelf = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Token is invalid!");
      const response = await apiGetProductsByShelf(token, {name: shelf})
      setProducts(response.products || [])
    } catch (error) {
      console.log("fetch product by shelf is error " + error);
    }
  }
  useEffect(() => {
    fetchProductByShelf();
  }, [shelf]);  
  console.log(shelf);
  
  const fetchShelfs = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Token is invalid!");
      const response = await apiGetListShelf(token);
      setShelfs(response.shelfs);
    } catch (error) {
      console.log("fetch shelfs is error " + error);
    }
  };
  useEffect(() => {
    fetchShelfs();
  }, []);  
  const handleChangeInput = (e) => {
    setShelf(e.target.value)
  }
  console.log(products);
  
  return (
    <div className="w-auto">
      <select value={shelf} onChange={handleChangeInput} className="select-sm select-bordered w-32">
        <option disabled selected>
          Kệ
        </option>
        {shelfs ? shelfs.map((shelf) => (
          <option key={shelf._id} value={shelf.name}>{shelf.name}</option>
        )) : <div>Chưa có kệ</div>}
      </select>
      <div className="flex justify-between items-center pt-5">
        <h4 className="font-bold text-xl w-32 ml-4">Hàng tồn kho</h4>
        <button
          className="btn btn-success text-white w-48"
          // onClick={openModal}
          onClick={onChangeModal}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Thêm hàng vào kệ
        </button>
      </div>
      {/* TableInventory */}
      <div className="overflow-y-auto h-80 mt-7">
        <table className="table table-pin-rows">
          <thead>
            <tr>
              <th>Mã sản phẩm</th>
              <th>Mã phiếu</th>
              <th>Sản phẩm</th>
              <th>Tình trạng</th>
              <th>Ngày Nhập</th>
              <th>Ngày hết hạn</th>
              <th>Số lượng</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
          {products.length > 0 ? (
              <ProductInventory products={products} />
            ) : (
              <tr>
                <td colSpan="8" className="text-center">Không có sản phẩm nào</td>
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr></tr>
          </tfoot>
        </table>
      </div>

      {/* {isModalOpen && (
       <div className="fixed w-screen z-40 inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="modal-box w-full max-w-6xl h-full overflow-y-hidden  ">
          <h3 className="font-bold text-lg mb-6">Danh sách sản phẩm</h3>
          <div className="flex items-center mb-4 w-full">
            <label className="input input-bordered w-52 h-12 flex  items-center gap-2">
              <input type="text" className="grow" placeholder="Tên sản phẩm" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </label>
            <select className="select select-bordered w-52 ml-3 mr-3">
              <option disabled selected>
                Loại sản phẩm
              </option>
              <option>Đồ ăn</option>
              <option>Thức uống</option>
            </select>
            <select className="select select-bordered h-12 w-52 ">
              <option disabled selected>
                Thương hiệu
              </option>
              <option>KFC</option>
              <option>Pepsi</option>
            </select>
          </div>
          <div className=" overflow-y-scroll h-4/6">
            <table className="table">
              <thead>
                <tr>
                  <th></th>
                  <th>Mã sản phẩm</th>
                  <th>Mã phiếu</th>
                  <th>Sản phẩm</th>
                  <th>Nhà cung cấp</th>
                  <th>Số lượng</th>
                </tr>
              </thead>
              <tbody>
                <ListProductInventory />
                <ListProductInventory />
                <ListProductInventory />
                <ListProductInventory />
                <ListProductInventory />
              </tbody>
              <tfoot></tfoot>
            </table>
          </div>

          <div className="modal-action ">
            <div className="flex w-full">
              <button
                class="btn w-28 text-white"
                style={{ backgroundColor: "#f13612" }}
              >
                Thêm
              </button>
              <form method="dialog">

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
      )} */}
    </div>
  );
}
