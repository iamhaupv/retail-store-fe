import LayoutDefault from "../layout/LayoutDefault";
import Error404 from "../pages/Error404";
import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";

export const routes = [
  {
    path: "/",
    element: <LayoutDefault />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/signin", element: <SignIn /> },
      { path: "/signup", element: <SignUp /> },
      { path: "*", element: <Error404 /> },
    ],
  },
];
