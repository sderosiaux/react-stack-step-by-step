"use strict";

var App = React.createClass({
  render: function() {
    var items = this.props.subjects.map(function(subject) {
      return <li>{subject}</li>;
    });
    return <ul>You like {items}</ul>;
  }
});

var mountNode = document.getElementById("app");
ReactDOM.render(<App subjects={[ "Javascript", "Java" ]} />, mountNode);
