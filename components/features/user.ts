import { createSlice } from "@reduxjs/toolkit";
import { userInterface } from "../interfaces/shared";

export const InitialState:userInterface={
    uid:"",
    account_type:"personal",
    display_name:"",
    email:"",
    profile_url:"",
    username:"",
    phone_number:""
}


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
