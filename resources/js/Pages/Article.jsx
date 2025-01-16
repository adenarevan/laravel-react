import React, { useState } from "react";
import Layout from "@/Components/Layout";
import { useForm } from "@inertiajs/react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Quill editor styles
import { FaEdit, FaTrash } from "react-icons/fa";

import { router } from "@inertiajs/react"; // ✅ Tambahkan ini
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Article = ({ menus, articles }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  const { data, setData, post, put, errors, reset } = useForm({
    title: "",
    content: "",
    image: null,
    prevImage: null,
  });

  const openModal = (article = null) => {
    if (article) {
        setIsEdit(true);
        setEditId(article.id);
        setData({
            title: article.title,
            content: article.content,
            image: null, // ❌ Tidak langsung diisi karena input file tidak bisa dikontrol
            prevImage: article.image, // ✅ Simpan gambar sebelumnya
        });
    } else {
        setIsEdit(false);
        reset();
    }
    setIsModalOpen(true);
};
const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    
    // ✅ Jika ada gambar baru, kirim gambar baru, jika tidak, kirim gambar lama
    if (data.image) {
        formData.append("image", data.image);
    } else if (data.prevImage) {
        formData.append("prevImage", data.prevImage);
    }

    if (isEdit) {
        put(`/article/${editId}`, {
            data: formData,
            onSuccess: () => {
                reset();
                setIsModalOpen(false);
            },
            headers: {
                "Content-Type": "multipart/form-data", // ✅ Pastikan ini untuk upload file
            },
        });
    } else {
        post("/article", {
            data: formData,
            onSuccess: () => {
                reset();
                setIsModalOpen(false);
            },
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    }
};




  const handleDelete = (id) => {
    if (confirm("Apakah Anda yakin ingin menghapus artikel ini?")) {
        router.delete(`/article/${id}`, {
            onSuccess: () => {
                toast.success("Artikel berhasil dihapus! 🎉", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "colored",
                });
            },
            onError: (errors) => {
                toast.error("Gagal menghapus artikel. ❌", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "colored",
                });
                console.error(errors);
            },
        });
    }
};



  return (
    <Layout menus={menus}>
      <div className="container mx-auto p-6 bg-white shadow rounded-lg">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Daftar Artikel</h1>
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600 transition"
            onClick={() => openModal()}
          >
            + Tambah Artikel
          </button>
        </div>
{/* Modal */}
{isModalOpen && (
  <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
    <div className="bg-white w-full max-w-lg mx-auto p-6 rounded-lg shadow-lg relative overflow-hidden">
      {/* Tombol Tutup */}
      <button
        onClick={() => setIsModalOpen(false)}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
      >
        ✕
      </button>
      {/* Header Modal */}
      <h2 className="text-xl font-bold mb-4 text-gray-700">
        {isEdit ? "Edit Artikel" : "Tambah Artikel"}
      </h2>
      {/* Konten Modal dengan Scroll */}
      <div className="max-h-[80vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Judul</label>
            <input
              type="text"
              className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={data.title}
              onChange={(e) => setData("title", e.target.value)}
            />
            {errors.title && <div className="text-red-500 text-sm">{errors.title}</div>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Konten</label>
            <ReactQuill
              theme="snow"
              value={data.content}
              onChange={(value) => setData("content", value)}
            />
            {errors.content && <div className="text-red-500 text-sm">{errors.content}</div>}
          </div>
          <div className="mb-4">
    <label className="block text-gray-700 font-medium mb-2">Gambar</label>

                {/* ✅ Pratinjau gambar sebelumnya */}
                {data.prevImage && !data.image && (
                    <img
                        src={`/storage/${data.prevImage}`}
                        alt="Gambar Lama"
                        className="w-32 h-32 object-cover rounded-lg mb-2"
                    />
                )}

                <input
                    type="file"
                    className="w-full border px-4 py-2 rounded-lg"
                    onChange={(e) => setData("image", e.target.files[0])}
                />

                {errors.image && <div className="text-red-500 text-sm">{errors.image}</div>}
            </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400"
              onClick={() => setIsModalOpen(false)}
            >
              Batal
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
)}

        {/* Tabel Artikel */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full bg-gray-50 rounded-lg shadow-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left text-gray-700 font-medium">Judul</th>
                <th className="px-4 py-2 text-left text-gray-700 font-medium">Gambar</th>
                <th className="px-4 py-2 text-left text-gray-700 font-medium">Konten</th>
                <th className="px-4 py-2 text-left text-gray-700 font-medium">Dibuat Oleh</th>
                <th className="px-4 py-2 text-left text-gray-700 font-medium">Tanggal</th>
                <th className="px-4 py-2 text-left text-gray-700 font-medium">Aksi</th>
              </tr>
            </thead>
            
<tbody>
  {articles.map((article) => (
    <tr key={article.id} className="border-t">
      <td className="px-4 py-2">{article.title}</td>
      <td className="px-4 py-2">
        {article.image && (
          <img
            src={`/storage/${article.image}`}
            alt={article.title}
            className="w-16 h-16 object-cover rounded-lg"
          />
        )}
      </td>
      <td
        className="px-4 py-2"
        dangerouslySetInnerHTML={{ __html: article.content }}
      ></td>
      <td className="px-4 py-2">{article.user?.name || "Tidak diketahui"}</td>
      <td className="px-4 py-2">
        {new Date(article.published_at).toLocaleDateString()}
      </td>
      <td className="px-4 py-2 flex items-center space-x-2">
        <button
          className="bg-yellow-500 text-white flex items-center px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
          onClick={() => openModal(article)}
        >
          <FaEdit className="mr-2" /> Edit
        </button>
        <button
          className="bg-red-500 text-white flex items-center px-4 py-2 rounded-lg hover:bg-red-600 transition"
          onClick={() => handleDelete(article.id)}
        >
          <FaTrash className="mr-2" /> Hapus
        </button>
      </td>
    </tr>
  ))}
</tbody>

          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Article;
