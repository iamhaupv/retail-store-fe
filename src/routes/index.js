import ContentRegisterLogin from "../components/ContentRegisterLogin";
import FormRegister from "../components/FormRegister";
import LayoutDefault from "../layout/LayoutDefault";
import AuthOTP from "../pages/AuthOTP";
import Error404 from "../pages/Error404";
import Home from "../pages/Home";
import Inventory from "../pages/Inventory";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";

export const routes = [
  {
    path: "/",
    element: <LayoutDefault />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/inventory", element: <Inventory /> },
      { path: "signin", element: <SignIn /> },
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
