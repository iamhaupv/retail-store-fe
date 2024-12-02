import LayoutDefault from "../layout/LayoutDefault";
import Category from "../pages/Category";
import ChangePassWord from "../pages/ChangePassWord";
import CreateOrder from "../pages/CreateOrder";
import Employee from "../pages/Employee";
import Error404 from "../pages/Error404";
import Home from "../pages/Home";
import Information from "../pages/Information";
import Inventory from "../pages/Inventory";
import ListEmployee from "../pages/ListEmployee";
import ListProduct from "../pages/ListProduct";
import Order from "../pages/Order";
import Product from "../pages/Product";
import ResetPassword from "../pages/ResetPassword";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import SupplierList from "../pages/SupplierList";
import Supply from "../pages/Supply";
import WarehouseReceipt from "../pages/WarehouseReceipt";
import UpdateProduct from "../pages/UpdateProduct";
import EntryForm from "../pages/EntryForm";
import EmployeeSchedule from "../pages/EmployeeSchedule";
import Reciept from "../pages/Reciept";
import Report from "../pages/Report";
import ReportDetail from "../pages/ReportDetail";
import UpdateSupply from "../pages/UpdateSupply";
import UpdateUnit from "../pages/UpdateUnit";

export const routes = [
  { path: "/signin", element: <SignIn /> },
  { path: "/reset-password/:token", element: <ResetPassword /> },
  {
    path: "/",
    element: <LayoutDefault />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/supply-list",
        element: <SupplierList  />,
      },
      {
        path: "product-list",
        element: <ListProduct />,
      },
      {
        path: "product",
        element: <Product />,
      },
      {
        path: "update-product",
        element: <UpdateProduct />,
      },
      {
        path: "/category",
        element: <Category />,
      },
      { path: "/entry-form", 
        element: <EntryForm /> 
      },
      {
        path: "/employee",
        element: <Employee />,
      },
      {
        path: "/employeeSchedule",
        element: <EmployeeSchedule />,
      },

      {
        path: "/reciept",
        element: <Reciept />,
      },
      {
        path: "/employeelist",
        element: <ListEmployee />,
      },
      {
        path: "/supply",
        element: <Supply />,
      },
      {
        path: "/update-supply",
        element: <UpdateSupply />,
      },
      {
        path: "/update-unit",
        element: <UpdateUnit />,
      },
      {
        path: "/inventory",
        element: <Inventory />,
      },
      {
        path: "/order",
        element: <Order />,
      },
      {
        path: "/report",
        element: <Report />,
      },
      {
        path: "/reportDetail",
        element: <ReportDetail />,
      },
      {
        path: "/createOrder",
        element: <CreateOrder />,
      },
      {
        path: "/WarehouseReceipt",
        element: <WarehouseReceipt />,
      },
      {
        path: "/changePassWord",
        element: <ChangePassWord />,
      },
      {
        path: "/information",
        element: <Information />,
      },
      {
        path: "signup",
        element: <SignUp />,
        children: [],
      },
      { path: "*", element: <Error404 /> },
    ],
  },
];
