Notebook = React.createClass({
  getInitialState() {
    return {
      notes: [{}]
    };
  },
  noteResolved(note) {
      console.log(`some note was resolved with result: ${note.state.result}`);
      this.state.notes.push({});
      this.setState(this.state);
  },
  render() {
    return (
      <div id="notebook" className="ui main text container">
        <h1 className="ui header">InteRactive notebook</h1>

        {this.state.notes.map(note =>
          <Note notebook={this}/>
        )}
      </div>
    );
  }
});
