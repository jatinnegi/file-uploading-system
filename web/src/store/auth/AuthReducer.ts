import {
  USER_LOADED,
  AUTH_SUCCESS,
  AUTH_ERROR,
  LOGOUT,
  AuthActionTypes,
} from "./types/Actions";

import { AuthState } from "./types/Auth";
import { Action, Reducer } from "redux";

import api from "../../utils/api";

const initialState: AuthState = {
  token: null,
  isAuthenticated: null,
  isLoading: true,
  user: null,
};

export const auth: Reducer<AuthState, Action> = (
  state = initialState,
  action: AuthActionTypes
) => {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        token: localStorage.getItem("token"),
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
      };

    case AUTH_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
      };

    case AUTH_ERROR:
    case LOGOUT:
      localStorage.removeItem("token");
      delete api.defaults.headers.common["x-auth-token"];

      return {
        ...state,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        user: null,
      };

    default:
      return state;
  }
};
