import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout";
import Login from "../pages/auth/Login";
import ForgotPassword from "../pages/auth/ForgotPassword";
import Register from "../pages/auth/Register";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "../pages/Dashboard";
import Products from "../pages/Products";
import ProductInfo from "../pages/ProductInfo";
import Favourites from "../pages/Favourites";
import Inbox from "../pages/Inbox";
import OrderLists from "../pages/OrderLists";
import ProductStock from "../pages/ProductStock";
import Pricing from "../pages/Pricing";
import Calendar from "../pages/Calendar";
import ToDo from "../pages/ToDo";
import Contact from "../pages/Contact";
import Invoice from "../pages/Invoice";
import UiElements from "../pages/UiElements";
import Team from "../pages/Team";
import TablePage from "../pages/TablePage";
import Settings from "../pages/Settings";
import Logout from "../pages/Logout";
import NotFound from "../components/NotFound";
import AuthLayout from "../layout/AuthLayout";
import UserProfile from "../pages/UserProfile";
import Cart from "../pages/Cart";

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            path: "/",
            element: <Dashboard />,
          },
          {
            path: "/dashboard",
            element: <Dashboard />,
          },
          {
            path: "/products",
            element: <Products />,
          },
          {
            path: "/products/:id",
            element: <ProductInfo />,
          },
          {
            path: "/favourites",
            element: <Favourites />,
          },
          {
            path: "/inbox",
            element: <Inbox />,
          },
          {
            path: "/order-lists",
            element: <OrderLists />,
          },
          {
            path: "/product-stock",
            element: <ProductStock />,
          },
          {
            path: "/pricing",
            element: <Pricing />,
          },
          {
            path: "/calendar",
            element: <Calendar />,
          },
          {
            path: "/to-do",
            element: <ToDo />,
          },
          {
            path: "/contact",
            element: <Contact />,
          },
          {
            path: "/invoice",
            element: <Invoice />,
          },
          {
            path: "/ui-elements",
            element: <UiElements />,
          },
          {
            path: "/team",
            element: <Team />,
          },
          {
            path: "/table",
            element: <TablePage />,
          },
          {
            path: "/settings",
            element: <Settings />,
          },
          {
            path: "/logout",
            element: <Logout />,
          },
          {
            path: "/user-profile",
            element: <UserProfile />,
          },
          {
            path:'/cart',
            element:<Cart/>
          }
        ],
      },
    ],
  },
  {
    element: <Layout />,
    children: [
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export { router };
