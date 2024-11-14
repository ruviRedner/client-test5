import React, { useEffect, useState } from "react";
import { RootState, useAppDispatch, useAppSelector } from "../../redux/store";
import ActionCard from "./ActionCard";
import { Iaction } from "../../redux/types/Iaction";
import { fatchAction } from "../../redux/slices/actionSlice";

const Attack = () => {
  
  const dispatch = useAppDispatch();
  const actions = useAppSelector((state: RootState) => state.action);
  const user = useAppSelector((state) => state.user);
  const [miseilName, setMissieilName] = useState<string>("");
  const [location, setLocation] = useState<string>("");
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
      // dispatch(fatchCandidates());
      // dispatch(fatchProfile(user.data?._id!));
      // socket.emit('newVote');
    } catch (error) {
      console.log(error);
    }
    
  };
  useEffect(() => {
    dispatch(fatchAction());
  }, []);

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
        user.data?.org?.resources.map((reso) => (
          
          
          <button onClick={() => {handelAttack(), setMissieilName(reso.name as string)}}  key={reso.name}>
            {reso.name}*{reso.amount}
          </button>
        ))}
      {actions.data.map((action: Iaction) => (
        <ActionCard key={action._id} act={action} />
      ))}
    </div>
  );
};

export default Attack;
