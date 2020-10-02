import { Alert } from "./Alert";

export const CREATE_ALERT = "CREATE_ALERT";
export const REMOVE_ALERT = "REMOVE_ALERT";

interface CreateAlertAction {
  type: typeof CREATE_ALERT;
  payload: Alert;
}

interface RemoveAlertAction {
  type: typeof REMOVE_ALERT;
  payload: string;
}

export type AlertActionTypes = CreateAlertAction | RemoveAlertAction;
