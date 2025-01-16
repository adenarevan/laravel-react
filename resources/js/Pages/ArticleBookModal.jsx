import React, { useEffect, useRef } from "react";
import Modal from "react-modal";
import { gsap } from "gsap";
import { FaTimes } from "react-icons/fa";

Modal.setAppElement("#app"); // Pastikan modal bisa ditutup dengan `Esc`

export default function ArticleBookModal({ isOpen, onClose, article }) {
    const modalRef = useRef(null);

    // Efek animasi saat modal dibuka (seperti membuka buku)
    useEffect(() => {
        if (isOpen && modalRef.current) {
            gsap.fromTo(
                modalRef.current,
                { rotationY: -90, opacity: 0 },
                { rotationY: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
            );
        }
    }, [isOpen]);

    if (!article) return null;

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        >
            <div
                ref={modalRef}
                className="bg-white w-full max-w-3xl p-6 rounded-lg shadow-xl relative"
                style={{
                    perspective: "1000px",
                    transformStyle: "preserve-3d",
                }}
            >
                {/* Tombol Close */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-700 hover:text-red-500 transition duration-300"
                >
                    <FaTimes size={24} />
                </button>

                {/* Header Artikel */}
                <h2 className="text-3xl font-bold mb-4 text-gray-800">{article.title}</h2>

                {/* Nama Penulis & Tanggal */}
                <p className="text-gray-500 text-sm mb-4">
                    By {article.user?.name || "Unknown"} |{" "}
                    {new Date(article.published_at).toLocaleDateString()}
                </p>

                {/* Gambar Artikel */}
                {article.image && (
                    <img
                        src={`/storage/${article.image}`}
                        alt={article.title}
                        className="w-full h-64 object-cover rounded-lg mb-4"
                    />
                )}

                {/* Isi Artikel dengan Scroll */}
                <div
                    className="text-gray-700 leading-relaxed max-h-[400px] overflow-y-auto p-4 border-2 border-gray-200 shadow-lg"
                    style={{
                        background: "linear-gradient(to right, #fefefe, #fcfcfc)",
                        borderRadius: "10px",
                    }}
                    dangerouslySetInnerHTML={{ __html: article.content }}
                />
            </div>
        </Modal>
    );
}
