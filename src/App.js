import React from "react";
import MenuPage from "./MenuPage";
import Loginpage from "./Loginpage";
import Adminpage from "./Adminpage";
import ProtectedRoutes from "./ProtectedRoutes";

import { BrowserRouter, Route, Routes } from "react-router-dom";

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
