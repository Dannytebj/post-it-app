/**
 * Helper module for email verification
 * @param {string} email - checks email against regular expression
 * @return {boolean} returns true if email pass regular expression
 */
module.exports = (email) => {
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line
  return regex.test(email);
};// eslint-disable-line
