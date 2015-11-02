Note = React.createClass({
  calculate() {
      let code = this.refs.codeInput.getDOMNode().value;
      let promise = this.props.env.evaluate(code);
      promise.then(data => {
        Notes.update({ _id: this.props.note._id }, { $set: {
          results: data,
          command: code
        }});
        Notes.insert({ notebookId: this.props.note.notebookId });
        this.props.notebook.noteResolved(this);
      });
  },
  render() {
    let note = this.props.note;
    let show;
    let inputClass = `ui action input ${note.results?"disabled":""}`;
    if (note.results) {
      let bin = note.results.bin[0];
      if (bin) {
        let src = `data:image/png;base64,${bin}`;
        show = <img src={src} />;
      } else {
        show = JSON.stringify(note.results.text, null, '\t');
      }
    }
    return (
      <div className="note ui raised segment">
        <div className={inputClass} style={{width: "100%"}}>
          <input ref="codeInput" type="text" value={this.props.note.command} onChange={() => null}/>
          <button onClick={this.calculate} className="ui basic button">Calculate</button>
        </div>
        <CodeBox>{show}</CodeBox>
      </div>
    );
  }
});
