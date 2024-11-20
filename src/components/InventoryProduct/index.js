import { useEffect, useState } from "react";
import ProductInventory from "../ProductInventory";
import apiGetListShelf from "../../apis/apiGetListShelf";
import { useShelfContext } from "../../contexts/ShelfContext";
import apiFilterProductByShelf from "../../apis/apiFilterProductByShelf";

export default function InventoryProduct({onChangeModal}) {
  const [shelfs, setShelfs] = useState([]);
  const { shelf, setShelf } = useShelfContext();
  const [products, setProducts] = useState([])
  const fetchProductByShelf = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Token is invalid!");
      const response = await apiFilterProductByShelf(token, {name: shelf})
      setProducts(response.products || [])
    } catch (error) {
      console.log("fetch product by shelf is error " + error);
    }
  }
  useEffect(() => {
    fetchProductByShelf();
  }, [shelf]);  
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
        <h4 className="font-bold text-xl w-32 ml-4">Hàng trên kệ</h4>
        <button
          className="btn btn-success text-white w-48"
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
              <th>Ngày hết hạn</th>
              <th>Số lượng</th>
              <th>Tổng SL</th>
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
    </div>
  );
}
