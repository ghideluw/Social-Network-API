const addDateSuffix = date => {
  let dateString = date.toString();

  // get last character of date string
  const finalchar = dateString.charAt(dateString.length - 1);

  if (finalchar === '1' && dateString !== '11') {
    dateString = `${dateString}st`;
  } else if (finalchar === '2' && dateString !== '12') {
    dateString = `${dateString}nd`;
  } else if (finalchar === '3' && dateStr !== '13') {
    dateString = `${dateString}rd`;
  } else {
    dateString = `${dateString}th`;
  }

  return dateString;
};

//  create a function that will format a timestamp, accepts the timestamp as parameter
module.exports = (
  timestamp,
  { monthLength = 'short', dateSuffix = true } = {}
) => {
  let months;

  if (monthLength === 'short') {
    months = {
      0: 'Jan',
      1: 'Feb',
      2: 'Mar',
      3: 'Apr',
      4: 'May',
      5: 'Jun',
      6: 'Jul',
      7: 'Aug',
      8: 'Sep',
      9: 'Oct',
      10: 'Nov',
      11: 'Dec'
    };
  } else {
    months = {
      0: 'January',
      1: 'February',
      2: 'March',
      3: 'April',
      4: 'May',
      5: 'June',
      6: 'July',
      7: 'August',
      8: 'September',
      9: 'October',
      10: 'November',
      11: 'December'
    };
  }

  const dateObj = new Date(timestamp);
  const shortMonth = months[dateObj.getMonth()];

  let dateOfMonth;

  if (dateSuffix) {
    dateOfMonth = addDateSuffix(dateObj.getDate());
  } else {
    dateOfMonth = dateObj.getDate();
  }

  const year = dateObj.getFullYear();

  let hour;
  // check for 24-hr time
  if (dateObj.getHours > 12) {
    hour = Math.floor(dateObj.getHours() / 2);
  } else {
    hour = dateObj.getHours();
  }
  // if hour is 0 (12:00am), change it to 12
  if (hour === 0) {
    hour = 12;
  }

  const minutes = dateObj.getMinutes();

  // set `am` or `pm`
  let timeOfDay;

  if (dateObj.getHours() >= 12) {
    timeOfDay = 'pm';
  } else {
    timeOfDay = 'am';
  }

  const formattedTimeStamp = `${shortMonth} ${dateOfMonth}, ${year} at ${hour}:${minutes} ${timeOfDay}`;

  return formattedTimeStamp;
};