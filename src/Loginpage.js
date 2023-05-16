import axios from "axios";
import React, { useState } from "react";
import Cookies from "universal-cookie";
const cookies = new Cookies();

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false);

  const loginUser = async (event) => {
    // prevent the form from refreshing the whole page
    event.preventDefault();

    // set configurations
    const configuration = {
      method: "post",
      url: "https://taoserver.onrender.com/login",
      data: {
        email,
        password,
      },
    };
    console.log("configuration", configuration);
    // make the API call
    axios(configuration)
      .then((result) => {
        console.log("🚀 ~ file: Loginpage.js:27 ~ .then ~ result", result);
        setLogin(true);
        // set the cookie
        cookies.set("TOKEN", result.data.token, {
          path: "/",
        });
        // redirect user to the auth page
        window.location.href = "/adminpage";
      })
      .catch((message) => {
        message = new Error();
        setLogin(false);
      });
  };
  return (
    <div className="login-container">
      <img src="./images/tao.jpg" alt="tao" className="tao-image login-image" />
      <form onSubmit={loginUser} className="login-form">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
          className="login-input"
        />
        <br />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          className="login-input"
        />
        <br />
        <input type="submit" value="Login" className="login-button" />
      </form>
    </div>
  );
}

export default App;
