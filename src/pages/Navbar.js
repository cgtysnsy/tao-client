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
      <Col md={6} className="mb-2 toast-add">
        <button onClick={toggleShowA} className="filter-btn">
          Add a New Item
        </button>
        <Toast show={showA} onClose={toggleShowA}>
          <Toast.Body>
            <Form className="item-info-edit">
              <Form.Group className="mb-3 add-form">
                <Form.Label for="title">
                  <strong>Title </strong>
                </Form.Label>
                <Form.Control
                  id="title"
                  type="text"
                  name="title"
                  onChange={onInputChange}
                  defaultValue={newMenuItem.title}
                />
              </Form.Group>

              <Form.Group className="mb-3 add-form">
                <Form.Label for="category">
                  <strong>Category </strong>
                </Form.Label>
                <Form.Control
                  id="category"
                  type="text"
                  name="category"
                  onChange={onInputChange}
                  defaultValue={newMenuItem.category}
                />
              </Form.Group>

              <Form.Group className="mb-3 add-form">
                <Form.Label for="price">
                  <strong>Price </strong>
                </Form.Label>
                <Form.Control
                  type="number"
                  id="price"
                  name="price"
                  onChange={onInputChange}
                  defaultValue={newMenuItem.price}
                />
              </Form.Group>

              <Form.Group className="mb-3 add-form">
                <Form.Label for="image">
                  <strong>Image </strong>
                </Form.Label>
                <Form.Control
                  type="text"
                  id="image"
                  name="img"
                  onChange={onInputChange}
                  defaultValue={newMenuItem.img}
                />
              </Form.Group>

              <Form.Group className="mb-3 add-form">
                <Form.Label for="Description">
                  <strong>Description</strong>
                </Form.Label>
                <Form.Control
                  type="text"
                  id="Description"
                  name="desc"
                  onChange={onInputChange}
                  defaultValue={newMenuItem.desc}
                />
              </Form.Group>
            </Form>
            <button onClick={toggleShowA} className="filter-btn">
              Close
            </button>
            <button onClick={onSubmit} className="filter-btn">
              Save
            </button>
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
