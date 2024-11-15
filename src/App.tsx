import React, { useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./components/auth/Login";

import Attack from "./components/pages/Attack";
import Deffence from "./components/pages/Deffence";
import EnemyStore from "./components/pages/EnemyStore";
import IdfStore from "./components/pages/IdfStore";
import Register from "./components/auth/Register";
import { RootState, useAppDispatch, useAppSelector } from "./redux/store";
import userSlice, { fatchProfile } from "./redux/slices/userSlice";
import { socket } from "./main";
import { Iuser } from "./redux/types/Iuser";

const App = () => {
  useEffect(() => {
    const user = localStorage.getItem("user");
    const pUser = JSON.parse(user!);
    dispatch(fatchProfile(pUser._id));
    // socket.on("profile", (data:Iuser)=>{
    //   dispatch(userSlice.actions.setUser(data))
    //   localStorage.setItem("user", JSON.stringify(data))
    // })
  }, []);
  const dispatch = useAppDispatch();

  return (
    <div>
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
