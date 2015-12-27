class App extends React.Component {
  render() {
    const items = this.props.subjects.map(subject => <li>{subject}</li>)
    return <ul>You like {items}</ul>;
  }
}

var mountNode = document.getElementById("app");
ReactDOM.render(<App subjects={[ "Javascript", "Java" ]} />, mountNode);
