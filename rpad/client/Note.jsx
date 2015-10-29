Note = React.createClass({
  getInitialState() {
    return {data: null};
  },
  calculate() {
      let code = this.refs.codeInput.getDOMNode().value;
      let promise = this.props.session.evaluate(code);
      promise.then(data => {
        this.setState({data});
        this.props.notebook.noteResolved(this);
      });
  },
  render() {
    let result;
    if (this.state.data) {
      let bin = this.state.data.bin[0];
      if (bin) {
        let src = `data:image/png;base64,${bin}`;
        result = <img src={src} />;
      } else {
        result = JSON.stringify(this.state.data.result, null, '\t');
      }
    }
    return (
      <div className="note ui raised segment">
        <div className="ui action input" style={{width: "100%"}}>
          <input ref="codeInput" type="text" />
          <button onClick={this.calculate} className="ui basic button">Calculate</button>
        </div>
        <CodeBox>{result}</CodeBox>
      </div>
    );
  }
});
