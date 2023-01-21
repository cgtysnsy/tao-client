import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();

// receives component and any other props represented by ...rest
export default function ProtectedRoutes({ component: Component, ...rest }) {
  const token = cookies.get("TOKEN");
  console.log(
    "🚀 ~ file: ProtectedRoutes.js:10 ~ ProtectedRoutes ~ token",
    token
  );
  return token ? <Outlet /> : <Navigate to="/" />;
}
