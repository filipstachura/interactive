Notebook = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    let notebookId = this.props.notebookId;
    return {
      notebook: Notebooks.findOne({ _id: notebookId })
    };
  },
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
    let rEnv = this.props.env;
    return (
      <div className="ui stackable grid container">
        <div className="four wide column">
          <EnvironmentList env={rEnv} />
        </div>
        <div className="twelve wide column">
          <h1 className="ui header">{this.data.notebook.name}</h1>
          {this.state.notes.map((note, nr) =>
            <Note key={nr} notebook={this} env={rEnv}/>
          )}
        </div>
      </div>
    );
  }
});
