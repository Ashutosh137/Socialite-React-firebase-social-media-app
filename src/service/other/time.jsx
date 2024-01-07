const Time = (seconds) => {
    const currentTimeInSeconds = Math.floor(Date.now() / 1000);
    const differenceInSeconds = currentTimeInSeconds - seconds ;
    console.log(differenceInSeconds)
    if (differenceInSeconds < 10) {
      return 'Just now';
    } else if (differenceInSeconds < 60) {
      return `${differenceInSeconds} seconds ago`;
    } else if (differenceInSeconds < 3600) {
      const minutes = Math.floor(differenceInSeconds / 60);
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (differenceInSeconds < 86400) {
      const hours = Math.floor(differenceInSeconds / 3600);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
      // Fallback to displaying the date if the time difference is longer
      const dateObject = new Date( seconds * 1000);
      return dateObject.toLocaleString('en-US',{ day: 'numeric', month: 'short' });
    }

};

export default Time;
