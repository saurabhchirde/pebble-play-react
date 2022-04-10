export const formatTimeDuration = (time) => {
  return String(time).replace("PT", "").replace("M", ":").replace("S", "");
};
