
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { useEffect, useState } from 'react';
import { fatchLogin } from '../../redux/slices/userSlice';

const Login = () => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  // useEffect(() => {
  //   if (!data?._id || data.role === "") {
  //     navigate('/register');
  //   }
    
    
  // }, [data]);
  useEffect(() => {
    if (data?._id && data.role === "terrorist") {
      navigate('/attack');
    }
    if (data?._id && data.role === "jewish") {
      navigate('/deffence');
    }
  }, [data,navigate]);
  const handelLogin = ()=>{
    dispatch(fatchLogin({ username, password }))
    console.log(data);
    
  }
  return (
    <div className="inp">
           <input
        type='text'
        placeholder='username'
        value={username}
        onChange={(e) => setusername(e.target.value)}
      />
      <input
        type='password'
        placeholder='password'
        value={password}
        onChange={(e) => setpassword(e.target.value)}
      />
      <button onClick={handelLogin

      }>
        Login
      </button>
        <p>Don't have an accunt yet?
            <Link to={"/register"}>Register</Link>
        </p>
      
      
    </div>
  )
}

export default Login
