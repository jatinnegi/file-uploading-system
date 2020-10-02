export enum AlertType {
  ERROR = "ERROR",
  MESSAGE = "MESSAGE",
}

export interface Alert {
  id: string;
  type: AlertType;
  msg: string;
}

export interface AlertState {
  alerts: Alert[];
}
