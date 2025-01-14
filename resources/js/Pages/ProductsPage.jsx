import React from "react";
import Layout from "@/Components/Layout";

const Products = ({ menus }) => {
  return (
    <Layout menus={menus}>
      <h1 className="text-3xl font-bold">Products</h1>
      <p>Manage your products here.</p>
    </Layout>
  );
};

export default Products;
