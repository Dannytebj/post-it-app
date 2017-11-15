/**
 * 
 * @param {*} data - takes in raw data from firebase 
 * @return {array} returns an array of database fetch 
 */
const getArray = data => Object.keys(data).map(key => data[key]);
module.exports = getArray;
