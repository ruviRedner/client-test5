import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import ActionCard from "./ActionCard";
import { fatchAction } from "../../redux/slices/actionSlice";
import { fatchProfile } from "../../redux/slices/userSlice";
import { socket } from "../../main";
import { Iaction } from "../../redux/types/Iaction";

const Attack = () => {
  const dispatch = useAppDispatch();
  const actions = useAppSelector((state) => state.action);
  const user = useAppSelector((state) => state.user);
  const [location, setLocation] = useState<string>("");
  const [timers, setTimers] = useState<{ [key: string]: number }>({});

  const handelAttack = async (missileName: string) => {
    const token = localStorage.getItem("Authorization")
    try {
      const response = await fetch("http://localhost:7966/action/attack", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization:token!,
        },
        body: JSON.stringify({
          teroristId: user.data?._id,
          misseil: missileName,
          location: location,
        }),
      });
      
      

      const result = await response.json();

      if (response.ok) {
        console.log("Attack created:", result);
        // await dispatch(fatchAction());
        await dispatch(fatchProfile(user.data?._id!));
      } else {
        console.error("Failed to create attack:", result);
      }
    } catch (error) {
      console.error("Error in handelAttack:", error);
    }
  };

  useEffect(() => {
    socket.on(
      "attackTimer",
      (data: {  remainingTime: number; actionID: string }) => {
        
        
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
  }, []);

  useEffect(() => {
    // dispatch(fatchAction());
    dispatch(fatchProfile(user.data?._id!));
  }, []);

  return (
    <div className="j">
      <h4 style={{ padding: "20px" }}>Organization: {user.data?.org?.orgName}</h4>
      <select style={{padding:"20px",marginLeft:"20px"}} onChange={(e) => setLocation(e.target.value)} value={location}>
        <option value="" disabled>
          Choose location
        </option>
        <option value="West Bank">West Bank</option>
        <option value="Center">Center</option>
        <option value="South">South</option>
        <option value="North">North</option>
      </select>
      {user.data?.org?.resources?.map((reso) => (
        <button
          key={reso.name}
          onClick={() => handelAttack(reso.name!)}
          disabled={!location}
        >
          {reso.name} * {reso.amount}
        </button>
      ))}
      
      <table  className="action-card-table">
        <thead>
          <tr>
            <th>Time To Hit</th>
            <th>Rocket</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {actions.data.map((action: Iaction) => (
            <ActionCard
              key={action._id}
              act={action}
              timeLeft={timers[action._id]}
            />
          ))}
        </tbody>
      </table>
      </div>
    
  );
};

export default Attack;
