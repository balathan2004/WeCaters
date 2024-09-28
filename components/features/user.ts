import { createSlice } from "@reduxjs/toolkit";
import { userInterface } from "../interfaces/shared";
import { userInitialiser } from "../interfaces/shared";

export const InitialState:userInterface=userInitialiser


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
