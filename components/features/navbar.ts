import { createSlice } from "@reduxjs/toolkit";

export const InitialState = [
  { route: "/blog", name: "blog" },
  { route: "/about", name: "about" },
  { route: "/auth/signup", name: "signup" },
  { route: "/auth/login", name: "login" },
];

export const ProfessionalState = [
  { route: "/blog", name: "blog" },
  { route: "/search", name: "search" },
  { route: "/professional/create", name: "create" },
  { route: "/about", name: "about" },
  { route: "/professional/account", name: "account" },
];

export const PersonalState = [
  { route: "/blog", name: "blog" },
  { route: "/search", name: "search" },
  { route: "/about", name: "about" },
  { route: "/personal/account", name: "account" },
];

const NavBarSlice = createSlice({
  name: "navbar",
  initialState: { value: InitialState },
  reducers: {
    ProfessionalUserNavFun: (state) => {
      state.value = ProfessionalState;
    },
    PersonalUserNavFun: (state) => {
      state.value = PersonalState;
    },
    InitialUserNavFun: (state) => {
      state.value = InitialState;
    },
  },
});

export const { ProfessionalUserNavFun, PersonalUserNavFun, InitialUserNavFun } =
  NavBarSlice.actions;

export default NavBarSlice.reducer;
