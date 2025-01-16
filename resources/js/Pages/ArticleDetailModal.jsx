import React, { useEffect, useRef } from "react";
import { FaTimes } from "react-icons/fa";
import { gsap } from "gsap";
import HTMLFlipBook from "react-pageflip";

export default function ArticleDetailModal({ article, onClose }) {
    const modalRef = useRef(null);

    // Efek Animasi saat Modal Terbuka
    useEffect(() => {
        if (article && modalRef.current) {
            gsap.fromTo(
                modalRef.current,
                { scale: 0.8, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.5, ease: "power3.out" }
            );
        }
    }, [article]);

    if (!article) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-md z-50 p-6">
            <div ref={modalRef} className="relative bg-white w-full max-w-4xl p-6 rounded-lg shadow-lg">
                
                {/* Tombol Close */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-700 hover:text-red-500 transition duration-300"
                >
                    <FaTimes size={24} />
                </button>

                {/* FlipBook */}
                <HTMLFlipBook width={500} height={600} className="mx-auto">
                    
                    {/* Halaman Cover */}
                    <div className="bg-gray-900 text-white flex flex-col justify-center items-center p-6 rounded-lg shadow-lg">
                        <h1 className="text-3xl font-bold">{article.title}</h1>
                        <p className="text-sm mt-2">By {article.user?.name || "Unknown User"}</p>
                        {article.image && (
                            <img src={`/storage/${article.image}`} alt={article.title} className="w-full h-48 object-cover mt-4" />
                        )}
                    </div>

                    {/* Halaman Isi Artikel */}
                    <div className="bg-gray-100 text-gray-900 p-6 rounded-lg">
                        <h2 className="text-xl font-bold mb-3">Isi Artikel</h2>
                        <div dangerouslySetInnerHTML={{ __html: article.content }} className="leading-relaxed text-sm" />
                    </div>

                    {/* Halaman Penutup */}
                    <div className="bg-gray-900 text-white flex justify-center items-center p-6 rounded-lg">
                        <h2 className="text-2xl font-bold">Terima Kasih!</h2>
                    </div>
                    
                </HTMLFlipBook>
            </div>
        </div>
    );
}
