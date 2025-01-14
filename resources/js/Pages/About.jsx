import React from "react";
import Layout from "@/Components/Layout";

const About = ({ user, menus }) => {
  return (
    <Layout menus={menus}>
      <div className="container mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
        {/* Header */}
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6">
          Tentang Saya
        </h1>
        <p className="text-center text-gray-600 text-lg">
          Selamat datang di halaman tentang saya. Saya seorang pengembang web
          yang berdedikasi untuk menciptakan solusi digital yang inovatif dan efisien.
        </p>

        {/* Biodata dan Keahlian */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Biodata */}
          <div className="bg-blue-50 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-blue-800">Biodata</h2>
            <ul className="mt-4 text-gray-700">
              <li className="mb-2">
                <strong>Nama:</strong> {user.name}
              </li>
              <li className="mb-2">
                <strong>Email:</strong> {user.email}
              </li>
              <li className="mb-2">
                <strong>Role:</strong> Pengembang Web
              </li>
            </ul>
          </div>

          {/* Keahlian */}
          <div className="bg-purple-50 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-purple-800">Keahlian</h2>
            <ul className="mt-4 text-gray-700 list-disc list-inside">
              <li>Frontend: React, Vue.js, TailwindCSS</li>
              <li>Backend: Laravel, CI3</li>
              <li>Database: MySQL, PostgreSQL</li>
              <li>Mobile: Flutter</li>
            </ul>
          </div>
        </div>

        {/* Visi dan Misi */}
        <div className="mt-10 bg-gray-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 text-center">
            Visi dan Misi
          </h2>
          <p className="mt-4 text-gray-700 text-center">
            Visi saya adalah membantu menciptakan solusi teknologi yang inovatif,
            efisien, dan berdampak untuk masyarakat. Misi saya adalah terus belajar,
            berbagi pengetahuan, dan mengembangkan aplikasi yang memberikan nilai nyata.
          </p>
        </div>

        {/* Galeri */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
            Galeri Proyek Saya
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Proyek 1 */}
            <div className="relative overflow-hidden rounded-lg shadow-lg">
              <img
                src="/images/1.png" 
                alt="SiPDJD"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <span className="text-white text-lg font-semibold">SiPDJD</span>
              </div>
            </div>
            {/* Proyek 2 */}
            <div className="relative overflow-hidden rounded-lg shadow-lg">
              <img
                src="/images/2.png"
                alt="SiPDJD"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <span className="text-white text-lg font-semibold">SiPDJD</span>
              </div>
            </div>
            {/* Proyek 3 */}
            <div className="relative overflow-hidden rounded-lg shadow-lg">
              <img
                src="/images/3.png"
                alt="SiPDJD"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <span className="text-white text-lg font-semibold">SiPDJD</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
