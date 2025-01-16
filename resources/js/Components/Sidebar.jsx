import React from "react";
import { Link } from "@inertiajs/react";
import {
  FaHome,
  FaUser,
  FaBriefcase,
  FaTools,
  FaEnvelope,
  FaNewspaper,
} from "react-icons/fa";

const iconMap = {
  FaHome: FaHome,
  FaUser: FaUser,
  FaBriefcase: FaBriefcase,
  FaTools: FaTools,
  FaEnvelope: FaEnvelope,
  FaNewspaper: FaNewspaper
};
const Sidebar = ({ menus = [] }) => {
  console.log("Menus received in Sidebar:", menus); // Debug log
  return (
    <div className="bg-blue-900 text-white w-64 min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-6">My Portfolio</h1>
      <nav>
        <ul>
          {menus.length > 0 ? (
            menus.map((menu, index) => {
              const Icon = iconMap[menu.icon]; // Ambil ikon dari iconMap
              
              return (
                <li key={index} className="mb-4">
                  <Link
                    href={menu.route}
                    className="hover:bg-blue-700 flex items-center p-2 rounded"
                  >
                    {Icon && <Icon className="mr-2 text-lg" />} {/* Render ikon */}
                    <span>{menu.name}</span>
                    
                  </Link>
                </li>
              );
            })
          ) : (
            <li className="text-gray-400">Tidak ada menu tersedia</li>
            
          )}
        </ul>
      </nav>
    </div>
  );
};


export default Sidebar;
