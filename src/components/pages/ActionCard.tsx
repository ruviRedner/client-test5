import React from "react";
import { Iaction } from "../../redux/types/Iaction";
import { useAppSelector } from "../../redux/store";
import { socket } from "../../main";

interface ActionCardProps {
  act: Iaction;
  timeLeft: number | undefined;

}

const ActionCard: React.FC<ActionCardProps> = ({
  act,
  timeLeft,
  
}) => {
  const displayTime = timeLeft === 0 ? "finish" : timeLeft;
  const user = useAppSelector((state) => state.user);
  // const handelDeffence = () => {
  //   socket.emit("defence", {
  //     interceptId: user.data?._id,
  //     misseil: missileName,
  //     targetId: act._id,
  //   });
  // };

  return (
    <tr>
      <td>{displayTime !== undefined ? `${displayTime}` : "finish"}</td>
      <td>
        {user.data?.role === "terrorist" ? (
          act.misseilName
        ) : (
          <>
            {act.misseilName}
            <button style={{ width: "20px", backgroundColor: "red" }}>X</button>
          </>
        )}
      </td>
      <td>{act.status}</td>
    </tr>
  );
};

export default ActionCard;
