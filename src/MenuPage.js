import React, { useState, useEffect } from "react";
import Menu from "./Menu";
import Categories from "./Categories";
import axios from "axios";

export default function MenuPage() {
  const [menuItems, setMenuItems] = useState([]);
  const [filteredMenuItems, setFilteredMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);

  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

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
      <div className="title">
        <h2>
          <img src="./images/tao.jpg" alt="tao" className="tao-image" />
        </h2>
        <div className="underline"></div>
        <h5>eat, drink, nap</h5>
      </div>
      <Categories filterItems={filterItems} categories={categories} />
      <Menu items={filteredMenuItems} />
    </>
  );
}
