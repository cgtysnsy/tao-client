import React, { useState, useEffect } from "react";
import Menu from "./Menu";
import Categories from "./Categories";
import NavBar from "./NavBar";
import axios from "axios";
import { ColorRing } from "react-loader-spinner";

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
          "hepsi",
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
    return (
      <div className="loader">
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={["#FFBD59", "#522C2C", "#678045"]}
        />
      </div>
    );
  }

  if (status === "error") {
    return <p>{error.message}</p>;
  }

  const filterItems = (category) => {
    const copyMenuItems = [...menuItems];

    if (category === "hepsi") {
      setFilteredMenuItems(copyMenuItems);

      return;
    }

    const newItems = copyMenuItems.filter((item) => item.category === category);

    setFilteredMenuItems(newItems);
  };
  return (
    <div className="container-user-menu">
      <div className="container-user-menu-list">
        <NavBar />
        <div className="title">
          <h2>
            <img src="./images/tao.png" alt="tao" className="tao-image" />
          </h2>
          <div className="underline"></div>
          <h5 style={{ letterSpacing: "6px" }}>EAT DRINK NAP</h5>
        </div>
        <Categories filterItems={filterItems} categories={categories} />
        <Menu items={filteredMenuItems} />
      </div>
    </div>
  );
}
