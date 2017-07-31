const getArray = require('../utils/getArray');

module.exports = (app, firebase, io) => {
  app.get('/getMessages/:groupId', (req, res) => {
    io.on('connection', (socket) => {
      const groupId = req.params.groupId;
      const ref = firebase.database().ref(`/messages/${groupId}`);
      ref.on('child_added', (data) => {
        const messages = getArray(data.val());
        socket.emit('messages', { message: messages });
        socket.on('disconnect', () => {
          console.log('user disconnected!')
        });
        // res.send(messages);
      })
      .catch((error) => {
        res.send(error);
      });
    });
  });
};
