import { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/store";
import { useNavigate } from "react-router-dom";
// import { socket } from '../../main';

export default function Register() {
  const [username, setusername] = useState<string>("");
  const [password, setpassword] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [org, setOrg] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const { data } = useAppSelector((state) => state.user);

  const navigate = useNavigate();
  const handelRegister = async () => {
    try {
      const res = await fetch("http://localhost:7966/users/register", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, role, org, location }),
      });
      const data = await res.json();
      navigate("/login");
    } catch (err) {
      console.log({ err });
    }
  };

  useEffect(() => {
    if (data?._id && data.role === "jewish") {
      navigate("/deffence");
    } else if (data?._id && data.role === "terrorist") {
      navigate("/attack");
    }
  }, [data, navigate]);
  return (
    <div className="inp">
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(e) => setusername(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setpassword(e.target.value)}
      />
      <input
        type="text"
        placeholder="role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />
      <select onChange={(e) => setOrg(e.target.value)} value={org}>
        <option value="" disabled>
          choose organization
        </option>
        <option value="IDF" disabled={role === "terrorist"}>
          IDF
        </option>
        <option value="Houthis" disabled={role === "jewish"}>
          Houthis
        </option>
        <option value="IRGC" disabled={role === "jewish"}>
          IRGC
        </option>
        <option value="Hamas" disabled={role === "jewish"}>
          Hamas
        </option>
        <option value="Hezbollah" disabled={role === "jewish"}>
          Hezbollon
        </option>
      </select>

      {role === "jewish" ? (
        <>
          <select
            onChange={(e) => setLocation(e.target.value)}
            value={location}
          >
            <option value="" disabled>
              choose location
            </option>
            <option value="West Bank">West Bank</option>
            <option value="Center">Center</option>
            <option value="South">South</option>
            <option value="North">North</option>
          </select>
          <button onClick={handelRegister}>Register</button>
        </>
      ) : (
        <>
          <button onClick={handelRegister}>Register</button>
        </>
      )}
    </div>
  );
}
