const localStorageMock = (() => {
  let myStore = {};
  return {
    getItem(key) {
      return myStore[key];
    },
    setItem(key, value) {
      myStore[key] = value.toString();
    },
    clear() {
      myStore = {};
    },
    removeItem(key) {
      delete myStore[key];
    },
  };
})();

export default localStorageMock;
