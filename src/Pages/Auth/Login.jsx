import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { login } from "../../Redux/AuthSlice";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleCancel = () => {
    setForm({ email: "", password: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://api-disasters-reports.vercel.app/api/login",
        form,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.status === 200) {
        const { user, token, message } = response.data;

        console.log("Token diterima:", token); // Debug token
        localStorage.setItem("auth_token", token); // Simpan token
        localStorage.setItem("auth_user", JSON.stringify(user)); // Simpan user
        dispatch(login({ user, token })); // Set Redux

        Swal.fire({
          icon: "success",
          title: "Login Berhasil",
          text: message,
        });

        navigate("/admin"); // Arahkan ke halaman admin
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Gagal",
        text:
          error.response?.data?.message ||
          "Terjadi kesalahan, silakan coba lagi.",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Halaman Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="email"
            >
              Email:
            </label>
            <input
              type="email"
              name="email"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md 
    focus:outline-none focus:ring focus:ring-blue-500"
              onChange={handleChange}
              value={form.email}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="password"
            >
              Password:
            </label>
            <input
              type="password"
              name="password"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md 
    focus:outline-none focus:ring focus:ring-blue-500"
              onChange={handleChange}
              value={form.password}
              required
            />
          </div>
          <div className="mt-6 flex justify-between">
            <button
              type="button"
              onClick={handleCancel}
              className="w-full px-4 py-2 bg-red-600 text-white rounded-md mr-2 hover:bg-red-700 transition duration-200"
            >
              Batal
            </button>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition duration-200"
            >
              Login
            </button>
          </div>
          <div className="mt-6 flex justify-between">
            <a
              href="/register"
              className="w-full bg-indigo-900 hover:bg-indigo-950 text-white text-center px-4 py-2 rounded mt-2"
            >
              Register
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
