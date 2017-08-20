/**
 * 
 * @param {*} data - takes in raw data from firebase 
 * @return {array} returns an array of database fetch 
 */
const getArray = (data) => {
  return Object.keys(data).map((key) => {
    return data[key];
  });
};
module.exports = getArray;
