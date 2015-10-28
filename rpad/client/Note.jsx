Note = React.createClass({
  calculate() {
      let code = this.refs.codeInput.getDOMNode().value;
      Connection.send(code);
  },
  render() {
    return (
      <div className="note ui raised segment">
        <div className="ui action input" style={{width: "100%"}}>
          <input ref="codeInput" type="text" />
          <button onClick={this.calculate} className="ui basic button">Calculate</button>
        </div>
        <div className="ui message">
          <p className="result-in-here"></p>
        </div>
      </div>
    );
  }
});
