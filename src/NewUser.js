import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(
      "https://ap-south-1.aws.data.mongodb-api.com/app/user-spdgq/endpoint/usercheck",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    const data = await response.json();
    console.log("🚀 ~ file: NewUser.js:30 ~ handleSubmit ~ data", data);
  };

  return (
    <div>
      <div>
        <div>
          <form onSubmit={handleSubmit}>
            <h1>Create Account</h1>

            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />

            <button type="submit">Sing Up</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
