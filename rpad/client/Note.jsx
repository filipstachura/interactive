Note = React.createClass({
  getInitialState() {
    return {result: null};
  },
  calculate() {
      let code = this.refs.codeInput.getDOMNode().value;
      let promise = Connection.send(code);
      promise.then((message) => {
        console.log(`Note received ${message}`);
        let result = JSON.stringify(JSON.parse(message).value, null, '\t');;
        this.setState({result});
        this.props.notebook.noteResolved(this);
      });
  },
  render() {
    return (
      <div className="note ui raised segment">
        <div className="ui action input" style={{width: "100%"}}>
          <input ref="codeInput" type="text" />
          <button onClick={this.calculate} className="ui basic button">Calculate</button>
        </div>
        <div className="ui message">
          <p>{this.state.result}</p>
        </div>
      </div>
    );
  }
});
