import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  HomeLayout,
  DashboardLayout,
  AllProduct,
  Landing,
  Register,
  Login,
  Error,
  EditProduct,
  AddProduct,
  Todo,
  Orders,
  AddOrder,
  ViewOrder,
  EditOrder,
} from "./pages";
import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
import { action as editProductAction } from "./pages/EditProduct";
import { action as deleteProductAction } from "./pages/DeleteProduct";
import { action as addProductAction } from "./pages/AddProduct";
import { action as addOrderAction } from "./pages/AddOrder";
import { action as deleteOrderAction } from "./pages/DeleteOrder";
import { action as editOrderAction } from "./pages/EditOrder";
import { loader as allProductLoader } from "./pages/AllProduct";
import { loader as editProductLoader } from "./pages/EditProduct";
import { loader as ordersLoader } from "./pages/Orders";
import { loader as viewOrderLoader } from "./pages/ViewOrder";
import { loader as dashboardLoader } from "./pages/DashboardLayout";
import { loader as editOrderLoader } from "./pages/EditOrder";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "login",
        element: <Login />,
        action: loginAction,
      },
      {
        path: "register",
        element: <Register />,
        action: registerAction,
      },

      {
        path: "dashboard",
        element: <DashboardLayout />,
        loader: dashboardLoader,
        children: [
          {
            index: true,
            path: "all-product",
            element: <AllProduct />,
            loader: allProductLoader,
          },
          {
            path: "add-product",
            element: <AddProduct />,
            action: addProductAction,
          },
          {
            path: "edit-product/:id",
            element: <EditProduct />,
            loader: editProductLoader,
            action: editProductAction,
          },
          {
            path: "delete-product/:id",
            action: deleteProductAction,
          },
          {
            path: "orders",
            element: <Orders />,
            loader: ordersLoader,
          },
          {
            path: "add-orders",
            element: <AddOrder />,
            action: addOrderAction,
          },
          {
            path: "view-orders/:id",
            element: <ViewOrder />,
            loader: viewOrderLoader,
          },
          {
            path: "edit-orders/:id",
            element: <EditOrder />,
            loader: editOrderLoader,
            action: editOrderAction,
          },
          {
            path: "delete-order/:id",
            action: deleteOrderAction,
          },

          {
            path: "profile",
            element: <h1>Profile Page</h1>,
          },
          {
            path: "todo",
            element: <Todo />,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};
export default App;
