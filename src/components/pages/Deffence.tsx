import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { socket } from "../../main";
import { fatchAction } from "../../redux/slices/actionSlice";
import { fatchProfile } from "../../redux/slices/userSlice";
import { StatusAction } from "../../redux/types/Iaction";

const Deffence = () => {
  const dispatch = useAppDispatch();
  const actions = useAppSelector((state) => state.action);
  const user = useAppSelector((state) => state.user);
  const [remainingTime, setRemainingTime] = useState<number>(0);

  useEffect(() => {
    socket.on(
      "attackTimer",
      (data: { location: string; remainingTime: number }) => {
        setRemainingTime(data.remainingTime);
      }
    );
  }, []);
  useEffect(() => {
    dispatch(fatchAction());
    dispatch(fatchProfile(user.data?._id!));
  }, []);
  return (
    <div>
      {actions.data.map((act) => (
        <div key={act._id}>
        <p >status:{act.status}</p>
        {act.status == StatusAction.lanched && <button>X</button>}
        </div>
        
       
      ))}
      
      <h2>Time remaining: {remainingTime} seconds</h2>
    </div>
  );
};

export default Deffence;
