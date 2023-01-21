import React, { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const Adminpage = () => {
  const navigate = useNavigate();
  const token = cookies.get("TOKEN");
  const [message, setMessage] = useState("");

  function handleLogout() {
    console.log("click");
    // Perform logout actions
    cookies.remove("TOKEN", { path: "/" });
    window.location = "/";
  }

  useEffect(() => {
    // set configurations for the API call here
    const configuration = {
      method: "get",
      url: "http://localhost:3000/auth-endpoint",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    // make the API call
    axios(configuration)
      .then((result) => {
        // assign the message in our result to the message we initialized above
        setMessage(result.data.message);
      })
      .catch((error) => {
        error = new Error();
      });
  }, []);

  return <h1>AdminPage</h1>;
};

export default Adminpage;
