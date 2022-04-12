const alertReducer = (alertState, action) => {
  switch (action.type) {
    // all alerts
    case "ADD_TO_WATCH_LATER_ALERT":
      return {
        ...alertState,
        addToWatchlatertAlert: true,
      };

    case "HIDE_ADD_TO_WATCH_LATER_ALERT":
      return {
        ...alertState,
        addToWatchlatertAlert: false,
      };

    case "REMOVE_FROM_WATCH_LATER_Alert":
      return {
        ...alertState,
        removeFromWatchlaterAlert: true,
      };

    case "HIDE_REMOVE_FROM_WATCH_LATER_Alert":
      return {
        ...alertState,
        removeFromWatchlaterAlert: false,
      };

    default:
      return alertState;
  }
};

export { alertReducer };
