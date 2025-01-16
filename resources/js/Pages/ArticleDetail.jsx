import React, { useEffect, useRef } from "react";
import { Link } from "@inertiajs/react";
import { FaTimes, FaArrowLeft } from "react-icons/fa";
import { gsap } from "gsap";
import HTMLFlipBook from "react-pageflip";

export default function ArticleDetailModal({ article, onClose }) {
    const modalRef = useRef(null);
    const bookRef = useRef(null);

    useEffect(() => {
        if (article && modalRef.current) {
            gsap.fromTo(
                modalRef.current,
                { scale: 0.8, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.5, ease: "power3.out" }
            );
        }
    }, [article]);

    // **Fix: Pastikan ref tidak null sebelum diakses**
    const handleClick = () => {
        if (bookRef.current) {
            bookRef.current.classList.toggle("open");
        }
    };

    if (!article) return null;

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-70 backdrop-blur-md z-50 p-4 overflow-auto">
            <div ref={modalRef} className="relative bg-white w-full max-w-4xl p-6 rounded-lg shadow-lg max-h-screen overflow-y-auto">
                
                {/* Tombol Close & Kembali */}
                <div className="flex justify-between items-center mb-4">
                    <Link href="/" className="text-gray-700 hover:text-blue-500 flex items-center transition duration-300">
                        <FaArrowLeft size={20} className="mr-2" /> Kembali ke Beranda
                    </Link>
                    <button
                        onClick={onClose}
                        className="text-gray-700 hover:text-red-500 transition duration-300"
                    >
                        <FaTimes size={24} />
                    </button>
                </div>

                {/* FlipBook */}
                <div className="flex justify-center overflow-hidden">
                    <HTMLFlipBook
                        width={window.innerWidth < 768 ? 300 : 500} // Responsif: Jika kecil 300px, jika besar 500px
                        height={window.innerWidth < 768 ? 400 : 600}
                        ref={bookRef}
                        className="shadow-xl rounded-md cursor-pointer"
                        onClick={handleClick}
                    >
                        
                        {/* Cover Depan */}
                        <div className="bg-gray-900 text-white flex flex-col justify-center items-center p-6 rounded-lg shadow-lg">
                            <h1 className="text-3xl font-bold">{article.title}</h1>
                            <p className="text-sm mt-2">By {article.user?.name || "Unknown User"}</p>
                            {article.image && (
                                <img src={`/storage/${article.image}`} alt={article.title} className="w-full h-48 object-cover mt-4 rounded-lg" />
                            )}
                            <p className="text-sm mt-4 animate-pulse">Klik untuk membuka buku</p>
                        </div>

                        {/* Halaman 1 - Intro */}
                        <div className="bg-gray-100 text-gray-900 p-6 rounded-lg">
                            <h2 className="text-xl font-bold mb-3">Selamat Membaca</h2>
                            <p className="text-sm">Artikel ini akan memberikan wawasan menarik. Silakan geser halaman.</p>
                        </div>

                        {/* Halaman Isi Artikel */}
                        <div className="bg-white p-6 rounded-lg max-h-[400px] overflow-y-auto">
                            <h2 className="text-xl font-bold mb-3">Isi Artikel</h2>
                            <div dangerouslySetInnerHTML={{ __html: article.content }} className="leading-relaxed text-sm" />
                        </div>

                        {/* Halaman Kosong / Penutup */}
                        <div className="bg-gray-900 text-white flex justify-center items-center p-6 rounded-lg">
                            <h2 className="text-2xl font-bold">Terima Kasih!</h2>
                        </div>
                        
                    </HTMLFlipBook>
                </div>
            </div>
        </div>
    );
}
