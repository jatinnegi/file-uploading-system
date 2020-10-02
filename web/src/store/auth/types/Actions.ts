import { AuthUser, AuthSuccessPayload } from "./Auth";

export const USER_LOADED = "USER_LOADED";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_ERROR = "AUTH_ERROR";
export const LOGOUT = "LOGOUT";

interface LoadUserAction {
  type: typeof USER_LOADED;
  payload: AuthUser;
}

interface AuthSuccessAction {
  type: typeof AUTH_SUCCESS;
  payload: AuthSuccessPayload;
}

interface AuthErrorAction {
  type: typeof AUTH_ERROR;
}

interface LogoutAction {
  type: typeof LOGOUT;
}

export type AuthActionTypes =
  | LoadUserAction
  | AuthSuccessAction
  | AuthErrorAction
  | LogoutAction;
