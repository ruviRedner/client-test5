import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import ActionCard from "./ActionCard";
import { fatchAction } from "../../redux/slices/actionSlice";
import { fatchProfile } from "../../redux/slices/userSlice";
import { socket } from "../../main";
import { Iaction } from "../../redux/types/Iaction";

const Deffence = () => {
  const dispatch = useAppDispatch();
  const actions = useAppSelector((state) => state.action);
  const user = useAppSelector((state) => state.user);
  const [timers, setTimers] = useState<{ [key: string]: number }>({});
  

  useEffect(() => {
    socket.on(
      "attackTimer",
      (data: { actionID: string; remainingTime: number }) => {
        console.log("Received attackTimer data:", data);
        setTimers((prevTimers) => ({
          ...prevTimers,
          [data.actionID]: data.remainingTime,
        }));
        dispatch(fatchAction());
      }
    );

    return () => {
      socket.off("attackTimer");
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(fatchAction());
    dispatch(fatchProfile(user.data?._id!));
  }, [dispatch]);

  return (
    <div  className="j">
      <h4 style={{ padding: "10px" }}>Organization: {user.data?.org?.orgName}</h4>
      <table  className="action-card-table">
        <thead>
          <tr>
            <th>Time To Hit</th>
            <th>Rocket</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {actions.data.map((action: Iaction) =>{
            
             return (
            <ActionCard
              key={action._id}
              act={action}
              timeLeft={timers[action._id]}
              
            />
          )})}
        </tbody>
      </table>
    </div>
  );
};

export default Deffence;
