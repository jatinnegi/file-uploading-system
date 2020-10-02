import React from "react";
import { connect } from "react-redux";
import { AppState } from "../../store";
import { Alert, AlertType } from "../../store/alert/types/Alert";

interface Props {
  alerts: Alert[];
}

const Alerts: React.FC<Props> = ({ alerts }) => {
  return (
    <div className="alert-container">
      {alerts.length
        ? alerts.map((alert: Alert) => (
            <div
              key={alert.id}
              className={
                alert.type === AlertType.ERROR
                  ? "alert alert-danger"
                  : "alert alert-info"
              }
            >
              <b>{alert.msg}</b>
            </div>
          ))
        : null}
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  alerts: state.alert.alerts,
});

export default connect(mapStateToProps)(Alerts);
