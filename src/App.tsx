import React, { useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./components/auth/Login";

import Attack from "./components/pages/Attack";
import Deffence from "./components/pages/Deffence";
import EnemyStore from "./components/pages/EnemyStore";
import IdfStore from "./components/pages/IdfStore";
import Register from "./components/auth/Register";
import { useAppDispatch } from "./redux/store";
import userSlice from "./redux/slices/userSlice";

const App = () => {
  const dispatch = useAppDispatch();
  useEffect(()=>{
    const user = localStorage.getItem("user")
    if(user){
      dispatch(userSlice.actions.setUser(JSON.parse(user)))
    }
  },[dispatch])
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
