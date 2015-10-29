Notebook = React.createClass({
  getInitialState() {
    return {
      notes: [{}]
    };
  },
  noteResolved(note) {
      this.state.notes.push({});
      this.setState(this.state);
  },
  render() {
    let rSession = this.props.session;
    return (
      <div id="notebook" className="ui main text container">
        <h1 className="ui header">Notebook</h1>

        <EnvironmentList session={rSession} />

        {this.state.notes.map((note, nr) =>
          <Note key={nr} notebook={this} session={rSession}/>
        )}
      </div>
    );
  }
});
