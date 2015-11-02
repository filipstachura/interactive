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
  removeNote() {
    Notes.remove({ _id: this.props.note._id });
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
    let close = note.results ?
        <i className="close icon" style={style.close} onClick={this.removeNote}></i> : null;
    return (
      <div className="note ui raised segment">
        {close}
        <div className={inputClass} style={style.codeInput}>
          <input ref="codeInput" type="text" value={this.props.note.command} onChange={() => null}/>
          <button onClick={this.calculate} className="ui basic button">Calculate</button>
        </div>
        <CodeBox>{show}</CodeBox>
      </div>
    );
  }
});

const style = {
  close: {
    position: "absolute",
    top: "0",
    right: "0"
  },
  codeInput: {
    width: "100%",
    marginTop: "1rem"
  }
};
