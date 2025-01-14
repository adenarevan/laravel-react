import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Layout = ({ children, menus }) => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar menus={menus} />

      {/* Konten Utama */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="flex-1 p-6 bg-gray-100 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
