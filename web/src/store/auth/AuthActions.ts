import { USER_LOADED, AUTH_SUCCESS, AUTH_ERROR, LOGOUT } from "./types/Actions";
import { createAlert, removeAlert } from "../alert/AlertActions";
import { AlertType } from "../alert/types/Alert";

import api from "../../utils/api";
import { Dispatch } from "redux";
import { v4 as uuidv4 } from "uuid";

export const loadUser = () => async (dispatch: Dispatch) => {
  try {
    const res = await api.get("/auth");
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const register = (formData: RegistrationForm) => async (
  dispatch: Dispatch
) => {
  const body = JSON.stringify(formData);

  try {
    const res = await api.post("/auth/register", body, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch({
      type: AUTH_SUCCESS,
      payload: res.data,
    });

    const id = uuidv4();
    dispatch(createAlert(id, "Registration Success", AlertType.MESSAGE));
    setTimeout(() => dispatch(removeAlert(id)), 3000);
  } catch (err) {
    const errors: any[] = err.response.data.errors;

    if (errors) {
      errors.forEach((error: any) => {
        const msg = error.msg as string;
        const id = uuidv4();
        dispatch(createAlert(id, msg, AlertType.ERROR));
        setTimeout(() => dispatch(removeAlert(id)), 3000);
      });
    }
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const login = (formData: LoginForm) => async (dispatch: Dispatch) => {
  const body = JSON.stringify(formData);

  try {
    const res = await api.post("/auth/login", body, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch({
      type: AUTH_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    const errors: any[] = err.response.data.errors;
    if (errors) {
      errors.forEach((error: any) => {
        const msg = error.msg as string;
        const id = uuidv4();
        dispatch(createAlert(id, msg, AlertType.ERROR));
        setTimeout(() => dispatch(removeAlert(id)), 3000);
      });
    }
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const logout = () => async (dispatch: Dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};
