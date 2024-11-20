import {
    ActionReducerMapBuilder,
    createAsyncThunk,
    createSlice
  } from '@reduxjs/toolkit';
  import { actionState, DataStatus } from '../types/redux';
  
  import { Iaction } from '../types/Iaction';
  
  const initialState: actionState = {
    error: null,
    status: DataStatus.IDEL,
    data: []
  };
  
  export const fatchAction = createAsyncThunk(
    '/action/getAction',
    async (_, thunkApi) => {
      const token = localStorage.getItem('Authorization');
      
      
      try {
        const res = await fetch('http://localhost:7966/action/getAction',{ 
          headers: {
            Authorization: token!
          }
        }
        );
        if (res.status !== 200) thunkApi.rejectWithValue("Can't get list");
        const data = await res.json();
        //  return thunkApi.fulfillWithValue(data)
        return data;
      } catch (error) {
        thunkApi.rejectWithValue('you are switte');
      }
    }
  );
  
  export const actionSlice = createSlice({
    name: 'action',
    initialState,
    reducers: {},
    extraReducers: (builder: ActionReducerMapBuilder<actionState>) => {
      builder
        .addCase(fatchAction.pending, (state) => {
          state.status = DataStatus.LOADING;
          state.error = null;
          // state.data = [];
        })
        .addCase(fatchAction.fulfilled, (state, action) => {
          state.status = DataStatus.SUCCESS;
          state.error = null;
          state.data = action.payload as unknown as Iaction[];
        })
        .addCase(fatchAction.rejected, (state, action) => {
          state.status = DataStatus.FAILED;
          state.error = action.error as string;
          state.data = [];
        });
    }
  });
  
  export default actionSlice;
  