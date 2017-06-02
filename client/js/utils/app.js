window.React = require('react');
const api = require('../server/routes/route');
const controller = require('./components/postit.react');


React.render(
  <postit />
  document.getElementById('postit')
);
