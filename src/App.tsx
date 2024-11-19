import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/auth/Login";

import Attack from "./components/pages/Attack";
import Deffence from "./components/pages/Deffence";
import EnemyStore from "./components/pages/EnemyStore";
import IdfStore from "./components/pages/IdfStore";
import Register from "./components/auth/Register";
import { useAppDispatch } from "./redux/store";
import { fatchProfile } from "./redux/slices/userSlice";
import Nav from "./components/pages/Nav";

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      try {
        const parsedUser = JSON.parse(user);

        if (parsedUser && parsedUser._id) {
          dispatch(fatchProfile(parsedUser._id));
        } else {
          console.log("User not in localStorage");
        }
      } catch (error) {
        console.error("No user found", error);
      }
    }
  }, [dispatch]);

  return (
    <div className="app">
      <Nav />
      <h4 style={{ textAlign: "center" }}>WAR SIMULATION</h4>

      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="attack" element={<Attack />} />
        <Route path="deffence" element={<Deffence />} />
        <Route path="enemy-store" element={<EnemyStore />} />
        <Route path="idf-store" element={<IdfStore />} />
        <Route path="/" element={<Navigate to={"/login"} />} />
      </Routes>
    </div>
  );
};

export default App;
