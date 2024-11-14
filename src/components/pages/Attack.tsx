import React, { useEffect, useState } from "react";
import { RootState, useAppDispatch, useAppSelector } from "../../redux/store";
import ActionCard from "./ActionCard";
import { Iaction } from "../../redux/types/Iaction";
import { fatchAction } from "../../redux/slices/actionSlice";

const Attack = () => {
  const dispatch = useAppDispatch();
  const actions = useAppSelector((state: RootState) => state.action);
  const { data } = useAppSelector((state) => state.user);
  const [location, setLocation] = useState<string>("");
  useEffect(() => {
    dispatch(fatchAction());
  }, []);
 

 
  
  
  return (
    <div>
      <h1>Organization:{data?.username}</h1>
      <select onChange={(e) => setLocation(e.target.value)} value={location}>
        <option value="" disabled>
          choose location
        </option>
        <option value="West Bank">West Bank</option>
        <option value="Center">Center</option>
        <option value="South">South</option>
        <option value="North">North</option>
      </select>
      {data?.org?.resources.length &&
        data?.org?.resources.map((reso) => 
           (
            <button key={reso.name}>
              {reso.name}*{reso.amount}
            </button>
          )
        )}
      {actions.data.map((action: Iaction) => (
        <ActionCard key={action._id} act={action} />
      ))}
    </div>
  );
};

export default Attack;
