import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Header = () => {
  const [user, setUser] = useState(null); // State untuk menyimpan data user

  // Ambil data user dari API
  useEffect(() => {
    fetch("/api/user", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Gagal mengambil data pengguna.");
      })
      .then((data) => {
        setUser(data); // Simpan data user ke state
      })
      .catch(() => {
        toast.error("Tidak dapat mengambil data pengguna.");
      });
  }, []);

  // Fungsi logout
  const handleLogout = () => {
    toast.info("Logging out...", { autoClose: 2000 });

    fetch("/logout", {
      method: "POST",
      headers: {
        "X-CSRF-TOKEN": document
          .querySelector('meta[name="csrf-token"]')
          .getAttribute("content"),
      },
    })
      .then((response) => {
        if (response.ok) {
          toast.success("Logout successful! Redirecting...", { autoClose: 2000 });
          setTimeout(() => {
            window.location.href = "/login";
          }, 2000);
        } else {
          toast.error("Logout failed. Please try again.");
        }
      })
      .catch(() => {
        toast.error("Something went wrong. Please check your connection.");
      });
  };

  return (
    <div>
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Adena Portfolio</h1>
        <div className="flex items-center space-x-4">
          {/* Tampilkan nama user */}
          <p className="text-gray-600">Hi, {user?.name || "Guest"}!</p>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </header>
      <ToastContainer />
    </div>
  );
};

export default Header;
