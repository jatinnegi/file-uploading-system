import { CREATE_ALERT, REMOVE_ALERT, AlertActionTypes } from "./types/Actions";
import { AlertState, Alert } from "./types/Alert";
import { Reducer } from "redux";

const initialState: AlertState = {
  alerts: [],
};

export const alert: Reducer<AlertState, AlertActionTypes> = (
  state = initialState,
  action: AlertActionTypes
) => {
  const { type, payload } = action;
  switch (type) {
    case CREATE_ALERT:
      const newAlert = payload as Alert;
      return {
        ...state,
        alerts: [...state.alerts, newAlert],
      };

    case REMOVE_ALERT:
      const id = payload as string;
      console.log(id);
      return {
        ...state,
        alerts: state.alerts.filter((alert) => alert.id !== payload),
      };
    default:
      return state;
  }
};
