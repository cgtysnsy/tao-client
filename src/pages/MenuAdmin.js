import React, { useState } from "react";
import axios from "axios";

const Menu = ({ items }) => {
  const [wantEdit, setWantEdit] = useState({ itemId: "", active: false });

  const [editMenuItem, setEditMenuItem] = useState({
    title: "",
    category: "",
    price: "",
    img: "",
    desc: "",
  });

  const editHandler = (id) => {
    setWantEdit({ itemId: id, active: true });

    const willUpdateUser = items.filter((item) => item._id === id);
    const newObject = willUpdateUser[0];

    setEditMenuItem({
      ...editMenuItem,
      title: newObject.title,
      category: newObject.category,
      price: newObject.price,
      img: newObject.img,
      desc: newObject.desc,
    });

    console.log(editMenuItem, "after edit click");
  };
  const editHandlerClear = (id) => {
    setWantEdit({ itemId: "", active: false });
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;

    setEditMenuItem({ ...editMenuItem, [name]: value });
    console.log(editMenuItem, "after change in input");
  };

  const onSubmit = (e) => {
    e.preventDefault();

    editSendMenuItem();
    console.log(editMenuItem, "after save click");
  };

  const editSendMenuItem = async () => {
    const idForEditMenuItem = wantEdit.itemId;
    console.log(
      "🚀 ~ file: MenuAdmin.js:76 ~ editSendMenuItem ~ editMenuItem",
      editMenuItem
    );
    try {
      const res = await axios.put(
        `https://taoserver.onrender.com/menus/update/${idForEditMenuItem}`,
        editMenuItem
      );
      window.location.href = "/adminpage";
      console.log(res);
    } catch (err) {
      console.error("Error creating user", err);
    } finally {
    }
  };

  const deleteMenuItem = async (id) => {
    try {
      const res = await axios.delete(
        `https://taoserver.onrender.com/menus/delete/${id}`
      );
      window.location.href = "/adminpage";
    } catch (err) {
      console.error("Error creating user", err);
    } finally {
    }
  };

  const element = items.map((item, i) => {
    if (item._id === wantEdit.itemId) {
      return (
        <article key={i} className="menu-item-edit">
          <div className="item-info-edit">
            <header>
              <h3>{item.title}</h3>
              <label>Title:</label>
              <input
                type="text"
                name="title"
                defaultValue={item.title}
                onChange={onInputChange}
              />
              <label>Category:</label>
              <input
                type="text"
                name="category"
                defaultValue={item.category}
                onChange={onInputChange}
              />
              <label className="price">Price:</label>
              <input
                type="number"
                name="price"
                defaultValue={item.price}
                onChange={onInputChange}
              />
            </header>
            <label className="item-text">Description:</label>
            <input
              type="text"
              name="desc"
              defaultValue={item.desc}
              onChange={onInputChange}
            />
            <div>
              <button className="filter-btn" onClick={onSubmit}>
                Save
              </button>
              <button
                className="filter-btn"
                onClick={() => editHandlerClear(item._id)}
              >
                Cancel
              </button>
            </div>
          </div>
        </article>
      );
    } else if (item._id !== wantEdit.itemId) {
      return (
        <article key={i} className="menu-item">
          <img src={item.img} alt={item.title} className="photo" />
          <div className="item-info">
            <header>
              <h4>{item.title}</h4>
              <h4 className="price" onClick={() => editHandler(item._id)}>
                TL {item.price}
              </h4>
            </header>
            <p className="item-text">{item.desc}</p>
            <div>
              <button
                className="filter-btn"
                onClick={() => editHandler(item._id)}
              >
                Edit
              </button>
              <button
                className="filter-btn"
                onClick={() => deleteMenuItem(item._id)}
              >
                Delete
              </button>
            </div>
          </div>
        </article>
      );
    }
  });
  return <div className="section-center">{element}</div>;
};

export default Menu;
