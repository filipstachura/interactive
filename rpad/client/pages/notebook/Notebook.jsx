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
      <div className="ui stackable grid container">
        <div className="four wide column">
          <EnvironmentList session={rSession} />
        </div>
        <div className="twelve wide column">
          <h1 className="ui header">Notebook</h1>
          {this.state.notes.map((note, nr) =>
            <Note key={nr} notebook={this} session={rSession}/>
          )}
        </div>
      </div>
    );
  }
});
