import React from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { NavLink, useNavigate } from 'react-router-dom';
import userSlice from '../../redux/slices/userSlice';

const Nav = () => {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handelLogout = () => {
    try {
      dispatch(userSlice.actions.logout());
      navigate('/login');
    } catch (error) {
      console.error('error', error);
    }
  };

  return (
    <div className='nav'>
      {user.data ? (
        <>
          {user.data.role === "jewish" && (
            <>
              <NavLink to={'/deffence'}>Deffence</NavLink>
              <NavLink to={"/idf-store"}>Store</NavLink>
            </>
          )}
          {user.data.role === "terrorist" && (
            <>
              <NavLink to={"attack"}>Attack</NavLink>
              <NavLink to={"/enemy-store"}>Store</NavLink>
            </>
          )}
          <button onClick={handelLogout}>Logout</button>
        </>
      ) : (
        <>
          <NavLink to={'/login'}>Login</NavLink>
          <NavLink to={'/register'}>Register</NavLink>
        </>
      )}
    </div>
  );
};

export default Nav;
