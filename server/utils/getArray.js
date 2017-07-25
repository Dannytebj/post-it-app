const getArray = (data) => {
  return Object.keys(data).map((key) => {
    return data[key];
  });
};
module.exports = getArray;
