import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  Row,
  Col,
  Modal,
  Form,
  Toast,
  Accordion,
} from "react-bootstrap";
import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();

function Navbar() {
  //state for Toast model
  const [showA, setShowA] = useState(false);
  const toggleShowA = () => setShowA(!showA);
  const [loading, setLoading] = useState(false);

  //state for new menu item
  const [newMenuItem, setNewMenuItem] = useState({
    title: "",
    category: "",
    price: "",
    img: "",
    desc: "",
  });
  // const [item, setItem] = useState(newMenuItem);

  //Save new menu states with input changes;
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setNewMenuItem({ ...newMenuItem, [name]: value });
  };

  //send new item to server

  const onSubmit = (e) => {
    e.preventDefault();

    createNewMenuItem(newMenuItem);
  };

  //handle creating new menu Item API

  const createNewMenuItem = async (newMenuItem) => {
    setLoading(true);
    try {
      const res = await axios.post(
        "https://taoserver.onrender.com/menus/add",
        newMenuItem
      );
      console.log(res);
    } catch (err) {
      setLoading(false);
      console.error("Error creating user", err);
    } finally {
    }
  };

  function handleLogout() {
    // Perform logout actions
    cookies.remove("TOKEN", { path: "/" });
    window.location = "/";
  }

  return (
    <nav className="navbar-manual">
      <Col md={6} className="mb-2">
        <button onClick={toggleShowA} className="filter-btn">
          Add a New Item
        </button>
        <Toast show={showA} onClose={toggleShowA}>
          <Toast.Header>
            {/* <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            /> */}
          </Toast.Header>
          <Toast.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Title"
                  name="title"
                  onChange={onInputChange}
                  defaultValue={newMenuItem.title}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Category"
                  name="category"
                  onChange={onInputChange}
                  defaultValue={newMenuItem.category}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Price"
                  name="price"
                  onChange={onInputChange}
                  defaultValue={newMenuItem.price}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="image"
                  name="img"
                  onChange={onInputChange}
                  defaultValue={newMenuItem.img}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Description"
                  name="desc"
                  onChange={onInputChange}
                  defaultValue={newMenuItem.desc}
                />
              </Form.Group>
            </Form>
            <button onClick={toggleShowA}>Close</button>
            <button onClick={onSubmit}>Save Changes</button>
          </Toast.Body>
        </Toast>
      </Col>
      <Col md={6} className="mb-2">
        <button type="button" className="filter-btn" onClick={handleLogout}>
          Logout
        </button>
      </Col>
    </nav>
  );
}

export default Navbar;
