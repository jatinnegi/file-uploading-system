import { CREATE_ALERT, REMOVE_ALERT } from "./types/Actions";
import { AlertType, Alert } from "./types/Alert";
import { v4 as uuidv4 } from "uuid";

export const createAlert = (
  id: string | null,
  msg: string,
  type: AlertType
) => {
  id = id ? id : uuidv4();

  const newAlert: Alert = {
    id,
    type,
    msg,
  };

  return {
    type: CREATE_ALERT,
    payload: newAlert,
  };
};

export const removeAlert = (id: string) => {
  return {
    type: REMOVE_ALERT,
    payload: id,
  };
};
