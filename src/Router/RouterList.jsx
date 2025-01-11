import { createBrowserRouter } from "react-router-dom";
import Login from "../Pages/Auth/Login.jsx";
import Register from "../Pages/Auth/Register.jsx";
import AdminLayout from "../Layouts/AdminLayout.jsx";
import Dashboard from "../Pages/Admin/Dashboard.jsx";
import Laporan from "../Pages/Admin/Laporan.jsx";
import ProtectedRoute from "../Components/ProtectedRoute.jsx";

const RouteList = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "laporan",
        element: <Laporan />,
      },
    ],
  },
]);

export default RouteList;
