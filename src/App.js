"use strict";

var App = React.createClass({
  render: function() {
    var items = this.props.subjects.map(function(subject) {
      return React.createElement("li", null, subject);
    });
    return React.createElement("ul", null, "You like ", items);
  }
});

var mountNode = document.getElementById("app");
ReactDOM.render(React.createElement(App, { subjects: [ "Javascript", "Java" ] }), mountNode);
