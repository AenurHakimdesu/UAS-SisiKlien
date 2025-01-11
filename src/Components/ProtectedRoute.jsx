import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { login } from "../Redux/AuthSlice"; // Import login action

const ProtectedRoute = ({ children }) => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  if (!token) {
    // Cek token di localStorage
    const storedToken = localStorage.getItem("auth_token");
    const storedUser = JSON.parse(localStorage.getItem("auth_user"));
    if (storedToken && storedUser) {
      dispatch(login({ user: storedUser, token: storedToken })); // Set Redux
      return children; // Izinkan akses setelah token dimuat
    }
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
