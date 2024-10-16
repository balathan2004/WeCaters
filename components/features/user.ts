import { createSlice } from "@reduxjs/toolkit";
import { userMetaInterface } from "../interfaces/shared";
import { dummyUser } from "../interfaces/shared";

export const InitialState:userMetaInterface=dummyUser


const UserCredSlice = createSlice({
  name: "navbar",
  initialState: { value: InitialState },
  reducers: {
    updateUserCred: (state, action) => {
      state.value = action.payload;
    },
    
  },
});

export const {updateUserCred}=UserCredSlice.actions

export default UserCredSlice.reducer
