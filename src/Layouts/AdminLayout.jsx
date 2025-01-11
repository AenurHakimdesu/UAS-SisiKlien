import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { logout } from "../Redux/AuthSlice";

const AdminLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    Swal.fire({
      icon: "success",
      title: "Berhasil Log Out",
    });
    navigate("/");
  };

  return (
    <div className="flex flex-row min-h-screen bg-gray-100">
      <aside className="bg-indigo-950 w-64 text-white">
        <div className="p-4">
          <h2 className="font-bold ">TANGGAP BENCANA</h2>
          <nav className="mt-4 ml-4">
            <ul>
              <li>
                <a href="/admin">Dashboard</a>
              </li>
              <li>
                <a href="/admin/Laporan">Laporan</a>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
      <div className="flex flex-col flex-1">
        <header className="bg-gray-200 p-4">
          <div className="flex justify-end">
            <p className="px-4 py-2">
              Welcome, {user.name} ({user.email})
            </p>
            <button
              onClick={handleLogout}
              className="bg-orange-500 text-white px-4 py-2 rounded"
            >
              Logout
            </button>
          </div>
        </header>
        <main className="p-4 flex-grow">
          <Outlet />
        </main>
        <footer className="bg-orange-600 text-center text-white p-2 mt-auto">
          <p>&copy;Badan Mitigasi dan Kebencanaan</p>
        </footer>
      </div>
    </div>
  );
};

export default AdminLayout;
