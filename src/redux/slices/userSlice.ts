import {
    ActionReducerMapBuilder,
    createAsyncThunk,
    createSlice,
    PayloadAction
  } from '@reduxjs/toolkit';
  import { DataStatus, userState } from '../types/redux';
  import { Iuser } from '../types/Iuser';
  
  const initialState: userState = {
    error: null,
    status: DataStatus.IDEL,
    data: null
  };
  
  export const fatchLogin = createAsyncThunk(
    'user/login',
    async (user: { username: string; password: string }, thunkApi) => {
      try {
        const res = await fetch('http://localhost:7966/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(user)
        });
        if (res.status !== 200) thunkApi.rejectWithValue("Can't login");
        const data = await res.json();
  
        localStorage.setItem('Authorization', data.token);
        localStorage.setItem("user",JSON.stringify(data))
  
        return data;
      } catch (error) {
        return thunkApi.rejectWithValue('Request failed');
      }
    }
  );
  
  export const fatchProfile = createAsyncThunk(
    'user/profile',
    async (id: string, thunkApi) => {
      try {
        const res = await fetch('http://localhost:7966/users/profile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // Authorization: localStorage['token']!
          },
          body: JSON.stringify({ id })
        });
        if (res.status !== 200) thunkApi.rejectWithValue("Can't get profile");
        const data = await res.json();
        // thunkApi.fulfillWithValue(data)
        return data;
      } catch (error) {
        thunkApi.rejectWithValue('You are yamyyy');
      }
    }
  );
  const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      logout: (state) => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
  
        state.data = null;
      },
      setUser:(state,action:PayloadAction<Iuser>) =>{
           state.data = action.payload
      }
    },
    extraReducers: (builder: ActionReducerMapBuilder<userState>) => {
      builder
        .addCase(fatchLogin.pending, (state) => {
          state.status = DataStatus.LOADING;
          state.error = null;
          state.data = null;
        })
        .addCase(fatchLogin.fulfilled, (state, action) => {
          state.status = DataStatus.SUCCESS;
          state.error = null;
          state.data = action.payload as unknown as Iuser;
          console.log(state.data);
          
        })
        .addCase(fatchLogin.rejected, (state, action) => {
          state.status = DataStatus.FAILED;
          state.error = action.error as string;
          state.data = null;
        })
  
        .addCase(fatchProfile.fulfilled, (state, action) => {
          state.data = { ...state.data, ...action.payload };
        });
    }
  });
  
  export default userSlice;
  