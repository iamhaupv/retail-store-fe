import ContentRegisterLogin from "../components/ContentRegisterLogin";
import FormRegister from "../components/FormRegister";
import LayoutDefault from "../layout/LayoutDefault";
import AuthOTP from "../pages/AuthOTP";
import CreateProduct from "../pages/CreateProduct";
import Discount from "../pages/Discount";
import Employee from "../pages/Employee";
import Error404 from "../pages/Error404";
import Home from "../pages/Home";
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
        path: "create-product",
        element: <CreateProduct />,
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
        path: "/WarehouseReceipt",
        element: <WarehouseReceipt/>,
      },
      {
        path: "/discount",
        element: <Discount />,
      },
      {
        path: "signup",
        element: <SignUp />,
        children: [
          {
            index: true,
            element: <ContentRegisterLogin component={FormRegister} />,
          },
          { path: "auth-otp", element: <AuthOTP /> },
        ],
      },
      { path: "*", element: <Error404 /> },
    ],
  },
];
