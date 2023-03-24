import React, { useState, useEffect } from "react";
import Menu from "./Menu";
import Categories from "./Categories";
import NavBar from "./NavBar";
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
    return <p>HOŞGELDİNİZ :)</p>;
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
    <div className="container-user-menu">
      <div className="background-container">
        <div className="background-container-list">
          <div className="images-container yellow">
            <svg
              width="800"
              height="800"
              viewBox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <radialGradient id="b" r="50%" cx="90%" cy="48%">
                  <stop offset="0%" stopColor="#ffbd59" />
                  <stop offset="100%" stopColor="#678045" />
                </radialGradient>
              </defs>
              <g transform="translate(110 100)">
                <path fill="#ffbd59">
                  <animate
                    attributeName="d"
                    dur="70000ms"
                    repeatCount="indefinite"
                    values="M40.9,-27.4C51.8,-4.8,58.5,16.4,51,36.4C43.5,56.4,21.7,75.2,2.9,73.5C-15.9,71.9,-31.8,49.7,-44.4,26.8C-57,3.8,-66.3,-19.9,-58.4,-40.9C-50.4,-61.8,-25.2,-79.9,-5.1,-77C15,-74.1,30,-50,40.9,-27.4Z;
                           M66.7,-38.8C80.5,-14.6,81.6,16.5,68.3,38.4C55.1,60.3,27.5,73,5.7,69.7C-16.2,66.4,-32.5,47.3,-46.6,24.8C-60.8,2.4,-72.8,-23.3,-64.7,-44.2C-56.6,-65.1,-28.3,-81.3,-0.9,-80.7C26.5,-80.2,52.9,-63,66.7,-38.8Z;
                           M42.1,-24.7C52.1,-7,56,13.8,48,34.6C40,55.4,20,76.2,-4.3,78.6C-28.5,81.1,-57.1,65.3,-64.6,44.7C-72.1,24.2,-58.7,-0.9,-44.4,-21.1C-30.1,-41.3,-15.1,-56.5,0.5,-56.8C16,-57,32.1,-42.4,42.1,-24.7Z;
                           M42.8,-22.2C56,-1.8,67.8,22.1,60.4,39.2C53,56.4,26.5,66.8,4.6,64.2C-17.4,61.6,-34.7,45.8,-45.8,26.5C-56.9,7.3,-61.7,-15.6,-53,-33.4C-44.3,-51.2,-22.2,-63.9,-3.7,-61.8C14.8,-59.7,29.6,-42.6,42.8,-22.2Z;
                           M40.9,-27.4C51.8,-4.8,58.5,16.4,51,36.4C43.5,56.4,21.7,75.2,2.9,73.5C-15.9,71.9,-31.8,49.7,-44.4,26.8C-57,3.8,-66.3,-19.9,-58.4,-40.9C-50.4,-61.8,-25.2,-79.9,-5.1,-77C15,-74.1,30,-50,40.9,-27.4Z;"
                  ></animate>
                </path>
              </g>
            </svg>
          </div>

          <div className="images-container green">
            <svg
              width="1200"
              height="900"
              viewBox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <radialGradient id="b" r="100%" cx="50%" cy="48%">
                  <stop offset="60%" stopColor="#ffbd59" />
                  <stop offset="100%" stopColor="#678045" />
                </radialGradient>
              </defs>
              <g transform="translate(100 100)">
                <path fill="#678045">
                  <animate
                    attributeName="d"
                    dur="60000ms"
                    repeatCount="indefinite"
                    values="M40.9,-27.4C51.8,-4.8,58.5,16.4,51,36.4C43.5,56.4,21.7,75.2,2.9,73.5C-15.9,71.9,-31.8,49.7,-44.4,26.8C-57,3.8,-66.3,-19.9,-58.4,-40.9C-50.4,-61.8,-25.2,-79.9,-5.1,-77C15,-74.1,30,-50,40.9,-27.4Z;
                           M66.7,-38.8C80.5,-14.6,81.6,16.5,68.3,38.4C55.1,60.3,27.5,73,5.7,69.7C-16.2,66.4,-32.5,47.3,-46.6,24.8C-60.8,2.4,-72.8,-23.3,-64.7,-44.2C-56.6,-65.1,-28.3,-81.3,-0.9,-80.7C26.5,-80.2,52.9,-63,66.7,-38.8Z;
                           M42.1,-24.7C52.1,-7,56,13.8,48,34.6C40,55.4,20,76.2,-4.3,78.6C-28.5,81.1,-57.1,65.3,-64.6,44.7C-72.1,24.2,-58.7,-0.9,-44.4,-21.1C-30.1,-41.3,-15.1,-56.5,0.5,-56.8C16,-57,32.1,-42.4,42.1,-24.7Z;
                           M42.8,-22.2C56,-1.8,67.8,22.1,60.4,39.2C53,56.4,26.5,66.8,4.6,64.2C-17.4,61.6,-34.7,45.8,-45.8,26.5C-56.9,7.3,-61.7,-15.6,-53,-33.4C-44.3,-51.2,-22.2,-63.9,-3.7,-61.8C14.8,-59.7,29.6,-42.6,42.8,-22.2Z;
                           M40.9,-27.4C51.8,-4.8,58.5,16.4,51,36.4C43.5,56.4,21.7,75.2,2.9,73.5C-15.9,71.9,-31.8,49.7,-44.4,26.8C-57,3.8,-66.3,-19.9,-58.4,-40.9C-50.4,-61.8,-25.2,-79.9,-5.1,-77C15,-74.1,30,-50,40.9,-27.4Z;"
                  ></animate>
                </path>
              </g>
            </svg>
          </div>
          <div className="images-container red">
            <svg
              width="400"
              height="400"
              viewBox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <radialGradient id="b" r="100%" cx="50%" cy="48%">
                  <stop offset="60%" stopColor="#ffbd59" />
                  <stop offset="100%" stopColor="#678045" />
                </radialGradient>
              </defs>
              <g transform="translate(100 100)">
                <path fill="#522c2c">
                  <animate
                    attributeName="d"
                    dur="50000ms"
                    repeatCount="indefinite"
                    values="M40.9,-27.4C51.8,-4.8,58.5,16.4,51,36.4C43.5,56.4,21.7,75.2,2.9,73.5C-15.9,71.9,-31.8,49.7,-44.4,26.8C-57,3.8,-66.3,-19.9,-58.4,-40.9C-50.4,-61.8,-25.2,-79.9,-5.1,-77C15,-74.1,30,-50,40.9,-27.4Z;
                           M66.7,-38.8C80.5,-14.6,81.6,16.5,68.3,38.4C55.1,60.3,27.5,73,5.7,69.7C-16.2,66.4,-32.5,47.3,-46.6,24.8C-60.8,2.4,-72.8,-23.3,-64.7,-44.2C-56.6,-65.1,-28.3,-81.3,-0.9,-80.7C26.5,-80.2,52.9,-63,66.7,-38.8Z;
                           M42.1,-24.7C52.1,-7,56,13.8,48,34.6C40,55.4,20,76.2,-4.3,78.6C-28.5,81.1,-57.1,65.3,-64.6,44.7C-72.1,24.2,-58.7,-0.9,-44.4,-21.1C-30.1,-41.3,-15.1,-56.5,0.5,-56.8C16,-57,32.1,-42.4,42.1,-24.7Z;
                           M42.8,-22.2C56,-1.8,67.8,22.1,60.4,39.2C53,56.4,26.5,66.8,4.6,64.2C-17.4,61.6,-34.7,45.8,-45.8,26.5C-56.9,7.3,-61.7,-15.6,-53,-33.4C-44.3,-51.2,-22.2,-63.9,-3.7,-61.8C14.8,-59.7,29.6,-42.6,42.8,-22.2Z;
                           M40.9,-27.4C51.8,-4.8,58.5,16.4,51,36.4C43.5,56.4,21.7,75.2,2.9,73.5C-15.9,71.9,-31.8,49.7,-44.4,26.8C-57,3.8,-66.3,-19.9,-58.4,-40.9C-50.4,-61.8,-25.2,-79.9,-5.1,-77C15,-74.1,30,-50,40.9,-27.4Z;"
                  ></animate>
                </path>
              </g>
            </svg>
          </div>
        </div>
      </div>
      <div className="container-user-menu-list">
        <NavBar />
        <div className="title">
          <h2>
            <img src="./images/tao.jpg" alt="tao" className="tao-image" />
          </h2>
          <div className="underline"></div>
          <h5 style={{ letterSpacing: "6px" }}>EAT DRİNK NAP</h5>
        </div>
        <Categories filterItems={filterItems} categories={categories} />
        <Menu items={filteredMenuItems} />
      </div>
    </div>
  );
}
