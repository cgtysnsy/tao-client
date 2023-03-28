import React, { useState, useEffect } from "react";
import MenuAdmin from "./MenuAdmin";
import CategoriesAdmin from "./CategoriesAdmin";
import Navbar from "./Navbar";

import axios from "axios";

export default function MenuPage() {
  const [menuItems, setMenuItems] = useState([]);
  const [filteredMenuItems, setFilteredMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);

  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  // const [modal, setModal] = useState({ name: "", active: false });

  useEffect(() => {
    async function fetchData() {
      setStatus("loading");
      try {
        const response = await axios.get(
          "https://taoserver.onrender.com/menus"
        );
        const allItems = response.data;
        setMenuItems(allItems);
        setFilteredMenuItems(allItems);
        setStatus("success");
        const allCategories = [
          "all",
          ...new Set(allItems.map((item) => item.category)),
        ];
        setCategories(allCategories);
      } catch (err) {
        setError(err);
        setStatus("error");
      }
    }
    fetchData();
  }, []); //

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "error") {
    return <p>{error.message}</p>;
  }

  const filterItems = (category) => {
    const copyMenuItems = [...menuItems];

    if (category === "all") {
      setFilteredMenuItems(copyMenuItems);

      return;
    }

    const newItems = copyMenuItems.filter((item) => item.category === category);

    setFilteredMenuItems(newItems);
  };
  return (
    <>
      <Navbar />

      <div className="title">
        <h2>
          <img src="./images/tao.jpg" alt="tao" className="tao-image" />
        </h2>
        <div className="underline"></div>
        <h5>ADMIN PAGE</h5>
      </div>
      <CategoriesAdmin filterItems={filterItems} categories={categories} />
      <MenuAdmin items={filteredMenuItems} />
    </>
  );
}
