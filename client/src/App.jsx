import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
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
  WebView,
  AddWeb,
  AddImage,
  AllImage,
} from "./pages";
import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
import { action as editProductAction } from "./pages/EditProduct";
import { action as deleteProductAction } from "./pages/DeleteProduct";
import { action as addProductAction } from "./pages/AddProduct";
import { action as addOrderAction } from "./pages/AddOrder";
import { action as deleteOrderAction } from "./pages/DeleteOrder";
import { action as editOrderAction } from "./pages/EditOrder";
import { action as addWebAction } from "./pages/AddWeb";
import { action as addImageAction } from "./pages/AddImage";
import { action as deleteImageAction } from "./pages/DeleteImage";
import { loader as allProductLoader } from "./pages/AllProduct";
import { loader as editProductLoader } from "./pages/EditProduct";
import { loader as ordersLoader } from "./pages/Orders";
import { loader as viewOrderLoader } from "./pages/ViewOrder";
import { loader as dashboardLoader } from "./pages/DashboardLayout";
import { loader as editOrderLoader } from "./pages/EditOrder";
import { loader as allWebItemsLoader } from "./pages/WebView";
import { loader as allImageLoader } from "./pages/AllImage";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

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
        element: <DashboardLayout queryClient={queryClient} />,
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
          {
            path: "web",
            element: <WebView />,
            loader: allWebItemsLoader(queryClient),
          },
          {
            path: "add-web",
            element: <AddWeb />,
            action: addWebAction,
          },
          {
            path: "add-image",
            element: <AddImage />,
            action: addImageAction,
          },
          {
            path: "all-image",
            element: <AllImage />,
            loader: allImageLoader,
          },
          {
            path: "delete-image/:id",
            action: deleteImageAction,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
export default App;
