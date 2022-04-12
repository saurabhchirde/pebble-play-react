const alertReducer = (alertState, action) => {
  switch (action.type) {
    case "ALERT":
      return {
        ...alertState,
        showAlertBar: true,
        alertText: action.payload.alertText,
        alertType: action.payload.alertType,
        alertIcon: action.payload.alertIcon,
      };

    case "HIDE_ALERT":
      return {
        ...alertState,
        showAlertBar: false,
      };

    default:
      return alertState;
  }
};

export { alertReducer };
