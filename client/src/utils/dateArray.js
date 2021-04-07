export const dateArray = () => {
  let today = new Date();
  let oneYearAgo = new Date().setDate(today.getDate() - 365);
  //convert milliseconds to Date
  let currentDate = new Date(oneYearAgo);
  let dateArray = new Array();

  while (currentDate <= today) {
    dateArray.push(new Date(currentDate));
    currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
  }
  return dateArray;
};
