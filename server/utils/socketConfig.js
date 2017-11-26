let io;

const socketConfig = {
  socketInstance(instance) {
    io = instance;
  },
  on(changeToListenFor, callback) {
    io.on(changeToListenFor, callback);
  },
  emit(changeToListenFor, callback) {
    io.emit(changeToListenFor, callback);
  },
};

export default socketConfig;
