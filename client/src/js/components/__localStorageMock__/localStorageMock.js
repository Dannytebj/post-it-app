
const localStorageMock = (function() {
  let myStore = {};
  return {
    getItem: function(key) {
      return myStore[key];
    },
    setItem: function(key, value) {
      myStore[key] = value.toString();
    },
    clear: function() {
      myStore = {};
    },
    removeItem: function(key) {
      delete myStore[key];
    }
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

module.exports = localStorageMock;