import { elements } from "chart.js";
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
import EntryForm from "../pages/EntryForm";

export const routes = [
  { path: "/entryForm", element: <EntryForm/>},
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
        element: <SupplierList/>,
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
        path: "/category",
        element: <Category />,
      },
      {
        path: "/employee",
        element: <Employee />,
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
        path: "/inventory",
        element: <Inventory />,
      },
      {
        path: "/order",
        element: <Order />,
      },
      
      {
        path: "/createOrder",
        element: <CreateOrder />,
      },
      {
        path: "/WarehouseReceipt",
        element: <WarehouseReceipt/>,
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
        children: [
        ],
      },
      { path: "*", element: <Error404 /> },
    ],
  },
];
