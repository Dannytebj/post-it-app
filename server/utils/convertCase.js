/**
 * @function capitalizeFirstLetter
 *
 * @return { object } a string in lowercase and the First letter in Capital
 *
 * @param { String } text
 */
const convertCase = (text) => {
  const string = text.toLowerCase();
  return string.charAt(0).toUpperCase() + string.slice(1);
};
  
export default convertCase;
