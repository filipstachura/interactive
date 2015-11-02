NotebookList = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    return {
      notebooks: Notebooks.find().fetch()
    };
  },
  createNotebook() {
    let notebookId = Notebooks.insert({
      name: "Notebook-" + Math.trunc(Math.random() * 10000)
    });
    Notes.insert({ notebookId });
  },
  render() {
    return (
      <div id="notebook" className="ui main text container">
        <h3 className="ui header">Notebooks available</h3>
        <div className="ui celled list">
          {this.data.notebooks.map((notebook, nr) =>
            <NotebookListItem key={nr} notebook={notebook} />
          )}
        </div>
        <div className="ui basic button" onClick={this.createNotebook}>Create notebook</div>
      </div>
    );
  }
});
