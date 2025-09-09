import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IUser {
  id: number;
  name: string;
  email: string;
  roles: IRole[];
}

export interface IRole {
  id: number;
  name: string;
}

export interface IRoleWithUser extends IRole {
  users: IUser[];
}

interface IInitialState {
  users: IUser[];
  roles: IRoleWithUser[];
}

const initialState: IInitialState = {
  users: [],
  roles: [],
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      state.users = action.payload;
    },
    setRoles: (state, action) => {
      state.roles = action.payload;
    },
    create: (state, action: PayloadAction<IUser>) => {
      state.users = [...state.users, action.payload];

      const updatedRoles = state.roles.map((role) => {
        if (action.payload.roles.map((role) => role.id).includes(role.id))
          return {
            ...role,
            users: [...role.users, action.payload],
          };

        return role;
      });

      state.roles = updatedRoles;
    },
    update: (state, action) => {
      const { id, userData } = action.payload;

      const updatedRoles = state.roles.map((role) => {
        return {
          ...role,
          users: role.users.map((user) => {
            if (user.id === id) {
              return {
                ...user,
                ...userData,
              };
            }
            return user;
          }),
        };
      });

      state.roles = updatedRoles;
    },
    delete: (state, action) => {
      const id = action.payload;

      const updatedRoles = state.roles.map((role) => {
        return {
          ...role,
          users: role.users.filter((user) => user.id !== id),
        };
      });

      state.roles = updatedRoles;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice;
