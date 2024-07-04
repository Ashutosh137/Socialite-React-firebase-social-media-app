const Time = (seconds) => {
  const currentTimeInSeconds = Math.floor(Date.now() / 1000);
  const differenceInSeconds = currentTimeInSeconds - seconds;
  if (seconds) {
    if (differenceInSeconds < 10) {
      return "Just now";
    } else if (differenceInSeconds < 60) {
      return `${differenceInSeconds} sec`;
    } else if (differenceInSeconds < 3600) {
      const minutes = Math.floor(differenceInSeconds / 60);
      return `${minutes} min${minutes > 1 ? "s" : ""}`;
    } else if (differenceInSeconds < 86400) {
      const hours = Math.floor(differenceInSeconds / 3600);
      return `${hours} hr${hours > 1 ? "s" : ""}`;
    } else {
      const dateObject = new Date(seconds * 1000);

      return dateObject.toLocaleString("en-US", {
        day: "numeric",
        month: "short",
      });
    }
  } else {
    return "just now";
  }
};
function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "m";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  }
  return num.toString();
}
export { formatNumber };
export default Time;
