import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Mahasiswa = () => {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    reporterName: "",
    location: "",
    disasterType: "",
    description: "",
    date: "",
  });
  const [editId, setEditId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      console.error("Token tidak ditemukan. Arahkan ke halaman login.");
      navigate("/"); // Arahkan pengguna ke halaman login
    }
  }, [navigate]);

  const handleCancel = () => {
    setForm({
      reporterName: "",
      location: "",
      disasterType: "",
      description: "",
      date: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }; //input

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      reporterName: form.reporterName,
      location: form.location,
      disasterType: form.disasterType,
      description: form.description,
      date: new Date(form.date).toISOString(),
    };
    console.log("Payload Create:", payload);
    try {
      if (editId) {
        const response = await axios.put(
          `https://api-disasters-reports.vercel.app/api/disasters/${editId}`,
          payload
        );
        console.log("Response Update:", response.data);
        setData(
          data.map((item) => (item.id === editId ? response.data.data : item))
        );
      } else {
        const response = await axios.post(
          `https://api-disasters-reports.vercel.app/api/disasters`,
          payload
        );
        console.log("Response Create:", response.data);
        setData([...data, response.data.data]);
      }
      setForm({
        reporterName: "",
        location: "",
        disasterType: "",
        description: "",
        date: "",
      });
      setEditId(null);
    } catch (error) {
      console.error(
        "Error submitting data:",
        error.response?.data || error.message
      );
      if (error.response?.status === 401) {
        console.error("Unauthorized. Redirecting to login.");
        navigate("/");
      }
    }
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setForm({
      reporterName: item.reporterName,
      location: item.location,
      disasterType: item.disasterType,
      description: item.description,
      date: item.date,
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://api-disasters-reports.vercel.app/api/disasters/${id}`
      );
      setData(data.filter((item) => item.id !== id));
    } catch (error) {
      console.error(
        "Error deleting data:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api-disasters-reports.vercel.app/api/disasters"
        );
        console.log("Fetched Data:", response.data);
        setData(response.data.data || []);
      } catch (error) {
        console.error(
          "Error fetching data:",
          error.response?.data || error.message
        );
        if (error.response?.status === 401) {
          console.error("Unauthorized. Redirecting to login.");
          navigate("/");
        }
      }
    };
    fetchData();
  }, [navigate]);

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div className="bg-white flex-grow">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold">Laporan Longsor</h2>
        <form
          onSubmit={handleSubmit}
          className="mb-6 p-4 border rounded 
shadow-md bg-white"
        >
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="reporterName"
            >
              Nama Pelapor:
            </label>
            <input
              type="text"
              name="reporterName"
              value={form.reporterName}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 
rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="location"
            >
              Lokasi:
            </label>
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 
rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="disasterType"
            >
              Jenis Longsor:
            </label>
            <input
              type="text"
              name="disasterType"
              value={form.disasterType}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 
rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="description"
            >
              Deskripsi:
            </label>
            <input
              type="text"
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 
rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="date"
            >
              Tanggal:
            </label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 
rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div>
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 bg-orange-600 text-white rounded-md mr-2 hover:bg-orange-700 transition duration-200"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-900 text-white rounded-md hover:bg-indigo-950 transition duration-200"
            >
              {editId ? "Update" : "Submit"}
            </button>
          </div>
        </form>
        <p>List Tanah Longsor</p>
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4">Nama Pelapor</th>
              <th className="py-2 px-4">Lokasi</th>
              <th className="py-2 px-4">Jenis Longsor</th>
              <th className="py-2 px-4">Deskripsi</th>
              <th className="py-2 px-4">Tanggal</th>
              <th className="py-2 px-4">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(data) &&
              data.map((item) => (
                <tr key={item.id}>
                  <td className="border px-4 py-2">{item.reporterName}</td>
                  <td className="border px-4 py-2">{item.location}</td>
                  <td className="border px-4 py-2">{item.disasterType}</td>
                  <td className="border px-4 py-2">{item.description}</td>
                  <td className="border px-4 py-2">{formatDate(item.date)}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="px-2 py-1 bg-yellow-500 text-white 
rounded-md hover:bg-yellow-600 transition duration-200 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="px-2 py-1 bg-red-600 text-white 
rounded-md hover:bg-red-700 transition duration-200"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Mahasiswa;