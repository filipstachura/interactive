Notebook = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    let notebookId = this.props.notebookId;
    return {
      notes: Notes.find({ notebookId }).fetch()
    };
  },
  render() {
    let { notebookId, env } = this.props;
    return (
      <div className="ui stackable grid container">
        <div className="four wide column">
          <EnvironmentList env={env} />
        </div>
        <div className="twelve wide column">
          <NotebookTitle notebookId={notebookId}/>
          {this.data.notes.map((note, nr) =>
            <Note key={nr} note={note} env={env}/>
          )}
        </div>
      </div>
    );
  }
});
