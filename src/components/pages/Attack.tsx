import React, { useEffect, useState } from "react";
import { RootState, useAppDispatch, useAppSelector } from "../../redux/store";
import ActionCard from "./ActionCard";
import { Iaction } from "../../redux/types/Iaction";
import { fatchAction } from "../../redux/slices/actionSlice";
import { fatchProfile } from "../../redux/slices/userSlice";
import { socket } from "../../main";
import { Iuser } from "../../redux/types/Iuser";

const Attack = () => {
  
  const dispatch = useAppDispatch();
  const actions = useAppSelector((state) => state.action);
  const user = useAppSelector((state) => state.user);
  const [miseilName, setMissieilName] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [remainingTime, setRemainingTime] = useState<number>(0);
  
  const handelAttack = async () => {
    try {
      const data = await fetch('http://localhost:7966/action/attack', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Authorization: localStorage['token']!
        },
        body: JSON.stringify({
           teroristId:user.data?._id,
           misseil:miseilName,
           location:location
        })
      });
     await dispatch(fatchAction()); 
     await dispatch(fatchProfile(user.data?._id!));

      
    } catch (error) {
      console.log(error);
    }
    
  };

  
 

  useEffect(() => {
    
    socket.on('attackTimer', (data: { location: string, remainingTime: number }) => {
      if (data.location === location) {
        setRemainingTime(data.remainingTime); 
      }
    });
    
  }, [location]);

    
  //   socket.on('attackHit', (data: { location: string }) => {
  //     if (data.location === location) {
  //       alert(""); 
  //     }
  //   }) ;return () => {
  //     socket.off('attackTimer');
  //     socket.off('attackHit');
  //   };
  // }, [location]);

  useEffect(() => {
    dispatch(fatchAction());
    dispatch(fatchProfile(user.data?._id!));
  },[]);
    

  return (
    <div>
      <h1>Organization:{user.data?.username}</h1>
      <select onChange={(e) => setLocation(e.target.value)} value={location}>
        <option value="" disabled>
          choose location
        </option>
        <option value="West Bank">West Bank</option>
        <option value="Center">Center</option>
        <option value="South">South</option>
        <option value="North">North</option>
      </select>
      {user.data?.org?.resources.length &&
        user.data?.org.resources.map((reso) => (
          
          
          <button onClick={() => {handelAttack(), setMissieilName(reso.name as string)}}  key={reso.name}>
            {reso.name}*{reso.amount}
          </button>
          
        ))}
        <h2>Time remaining: {remainingTime} seconds</h2>
      {actions.data.map((action: Iaction) => (
        <ActionCard key={action._id} act={action} miseilName={miseilName} />
      ))}
    </div>
  );
};

export default Attack;
