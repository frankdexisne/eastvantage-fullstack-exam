import { createSlice } from "@reduxjs/toolkit";

export interface IOptionType {
  value: number;
  label: string;
}

interface IInitialState {
  roles: IOptionType[];
}

const initialState: IInitialState = {
  roles: [],
};

const selectSlice = createSlice({
  name: "selects",
  initialState: initialState,
  reducers: {
    setRoles: (state, action) => {
      state.roles = action.payload;
    },
  },
});

export const selectActions = selectSlice.actions;

export default selectSlice;
