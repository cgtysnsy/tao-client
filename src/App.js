import React, { useState, useEffect } from "react";
import MenuPage from "./MenuPage";
import Loginpage from "./Loginpage";
import Adminpage from "./Adminpage";
import NewUser from "./NewUser";
import ProtectedRoutes from "./ProtectedRoutes";
//import items from "./data";

//import { useQuery } from "react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" className="menu section" exact element={<MenuPage />} />
        <Route path="/login" element={<Loginpage />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/adminpage" element={<Adminpage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
