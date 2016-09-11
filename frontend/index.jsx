const React = require('react');
const ReactDOM = require('react-dom');
const App = require('./components/app');

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(<App/>, document.getElementById("content"));
})
