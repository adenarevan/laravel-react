import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { FaBookOpen } from "react-icons/fa";
import ArticleDetailModal from "./ArticleDetailModal"; // Import Modal

export default function ArticlesCarousel({ articles = [], isDarkMode }) {
    const carouselRef = useRef(null);
    const [selectedArticle, setSelectedArticle] = useState(null);

    // Efek GSAP untuk scroll otomatis
    useEffect(() => {
        if (carouselRef.current && articles.length > 0) {
            const totalWidth = carouselRef.current.scrollWidth;

            gsap.to(carouselRef.current, {
                x: `-${totalWidth / 2}px`,
                duration: 20,
                ease: "linear",
                repeat: -1,
                modifiers: {
                    x: (x) => `${parseFloat(x) % (totalWidth / 2)}px`,
                },
            });
        }
    }, [articles]);

    return (
        <section
            id="articles"
            className={`py-20 px-6 md:px-12 relative overflow-hidden ${
                isDarkMode ? "bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white" : 
                             "bg-gradient-to-r from-gray-200 via-gray-100 to-white text-gray-900"
            }`}
        >
            <h2 className="text-5xl font-bold text-center mb-10">Artikel Terbaru</h2>

            {/* Container Carousel */}
            <div className="relative w-full overflow-hidden">
                <div ref={carouselRef} className="flex space-x-8 w-max">
                    {articles.concat(articles).map((article, index) => (
                        <div
                            key={`${article.id}-${index}`}
                            className="bg-white text-gray-800 rounded-lg shadow-lg overflow-hidden w-80 flex-shrink-0 transform hover:scale-105 transition-transform duration-500 hover:shadow-2xl"
                            style={{ minWidth: "320px" }}
                        >
                            {article.image && (
                                <img src={`/storage/${article.image}`} alt={article.title} className="w-full h-48 object-cover rounded-t-lg" />
                            )}
                            <div className="p-5">
                                <h3 className="text-xl font-bold mb-3 hover:text-blue-500 transition-colors">{article.title}</h3>
                                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                                    {article.content.slice(0, 100)}...
                                </p>
                                <p className="text-xs text-gray-500 mb-4">By {article.user?.name || "Unknown User"}</p>
                                
                                {/* Tombol Baca Selengkapnya dengan Ikon Buku */}
                                <button
                                    onClick={() => setSelectedArticle(article)}
                                    className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
                                >
                                    <FaBookOpen className="mr-2" /> Baca Selengkapnya
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal Detail Artikel */}
            {selectedArticle && (
                <ArticleDetailModal article={selectedArticle} onClose={() => setSelectedArticle(null)} />
            )}
        </section>
    );
}
