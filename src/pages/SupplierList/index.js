import React, { useEffect, useState } from "react";
import SupplyTableDetail from "../../components/SupplyTableDetail";
import { Link } from "react-router-dom";
import ChangeInput from "../../components/ChangeInput";
import apiGetListBrands from "../../apis/apiGetListBrand";
import apiFilterBrandByMultiCondition from "../../apis/apiFilterBrandByMultiCondition";
import InputPhone from "../../components/InputPhone";
import InputSupplyName from "../../components/InputSupplyName";
import Autocomplete from "../../components/AutoComplete";

export default function SupplierList({role}) {
  const [brands, setBrands] = useState([]);
  const [id, setId] = useState("")
  const [brandSupplyName, setBrandSupplyName] = useState("");
  const [brandPhone, setBrandPhone] = useState("");
  const [brandByName, setBrandByName] = useState("");
  const [brandsByMultiCondition, setBrandsByMultiCondition] = useState([]);
  const fetchBrandsByMultiCondition = async () => {
    try {
      if(id === "" && brandByName === "" && brandSupplyName === "" && brandPhone === "") return
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Token is invalid!");
      const response = await apiFilterBrandByMultiCondition(token, {
        name: brandByName,
        supplyName: brandSupplyName,
        phone: brandPhone,
        id: id
      });
      setBrandsByMultiCondition(
        Array.isArray(response.brands) ? response.brands : []
      );
    } catch (error) {
      console.log("fetch brand by name is error" + error);
    }
  };
  useEffect(() => {
    fetchBrandsByMultiCondition();
  }, [brandByName, brandPhone, brandSupplyName, id]);
  const fetchBrands = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Token is invalid!");
      const response = await apiGetListBrands(token);
      setBrands(Array.isArray(response.brands) ? response.brands : []);
    } catch (error) {
      console.log("fetch brand is error" + error);
    }
  };
  const listBrands = () => {
    return brands.map((brand) => ({
      _id: brand._id,
      name: brand.name,
    }));
  };
  const listBrandPhone = () => {
    return brands.map((brand) => ({
      _id: brand._id,
      phone: brand.phone,
    }));
  };
  const listId = () => {
    return brands.map((brand) => ({
      _id: brand._id,
      name: brand.id,
    }));
  };
  const listBrandSupplyName = () => {
    return brands.map((brand) => ({
      _id: brand._id,
      supplyName: brand.supplyName,
    }));
  };
  useEffect(() => {
    fetchBrands();
  }, []);
  const handleChangeBrand = async (e) => {
    if (e) setBrandByName(e);
    else setBrandByName("");
  };
  const handleChangeBrandPhone = async (e) => {
    if (e) setBrandPhone(e);
    else setBrandPhone("");
  };
  const handleChangeId = async (e) => {
    if (e) setId(e);
    else setId("");
  };
  const handleChangeBrandSupplyName = async (e) => {
    if (e) setBrandSupplyName(e);
    else setBrandSupplyName("");
  };
  return (
    <>
      <div
        className="w-11/12 h-sceen justify-center flex"
        style={{ backgroundColor: "#F5F5F5" }}
      >
        <div
          className="w-full card bg-white rounded-none mt-2  ml-2 mr-2 animate__animated animate__fadeInRight"
          style={{
            height: "calc(100vh - 85px)",
          }}
        >
          <div className="w-full flex">
          <div className="ml-4 mt-4 w-2/12">
              <Autocomplete
                onchange={handleChangeId}
                value={id}
                suggestion={listId()}
                placeholder={"Nhập mã nhà cung cấp"}
              />
              </div>
            <div className="ml-4 mt-4 w-2/12 ">
              <ChangeInput
                onchange={handleChangeBrand}
                value={brandByName}
                suggestion={listBrands()}
                placeholder={"Nhập tên nhà cung cấp"}
              />
            </div>
            <div className="ml-4 mt-4 w-2/12">
              <InputPhone
                onchange={handleChangeBrandPhone}
                value={brandPhone}
                suggestion={listBrandPhone()}
                placeholder={"Nhập số điện thoại"}
              />
            </div>
            <div className="ml-4 mt-4 w-2/12">
              <InputSupplyName
                onchange={handleChangeBrandSupplyName}
                value={brandSupplyName}
                suggestion={listBrandSupplyName()}
                placeholder={"Nhập người cung cấp"}
              />
            </div>
          </div>
          <div className="flex justify-between mt-6 items-center">
            <h4 className="font-bold text-xl  ml-4">{id === "" && brandByName === "" && brandPhone === "" && brandSupplyName ===""
            ? brands.length : brandsByMultiCondition.length}  Nhà cung cấp </h4>
             <Link to="/supply">
                <button className="btn btn-success text-white w-36 mr-4">
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
                  Thêm mới
                </button>
              </Link>
          </div>
          <div
            className="overflow-y-auto  mt-7"
            style={{
              height: "calc(90vh - 220px)",
            }}
          >
            <table className="table table-pin-rows">
              {/* head */}
              <thead>
                <tr>
                  <th>Mã</th>
                  <th>Nhà cung cấp</th>
                  <th>Địa chỉ</th>
                  <th>Số điện thoại</th>
                  <th>Tên người cung cấp</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {brandByName === "" &&
                brandPhone === "" &&
                brandSupplyName === "" && id === "" ? (
                  <SupplyTableDetail brands={brands} />
                ) : brandsByMultiCondition.length > 0 ? (
                  <SupplyTableDetail brands={brandsByMultiCondition} />
                ) : (
                  <div>Khong tim thay</div>
                )}
              </tbody>
              <tfoot>
                <tr></tr>
              </tfoot>
            </table>
          </div>
          {/* pagination */}
        </div>
      </div>
    </>
  );
}
