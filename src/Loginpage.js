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
    <div>
      <h1>Login</h1>
      <form onSubmit={loginUser}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
        />
        <br />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
        <br />
        <input type="submit" value="Login" />
      </form>
    </div>
  );
}

export default App;
