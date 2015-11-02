NotebookListItem = React.createClass({
  removeNotebook() {
    let notebookId = this.props.notebook._id;
    Notebooks.remove({
      _id: notebookId
    });
    Notes.find({ notebookId }).fetch().map( note => Notes.remove({_id: note._id}));
  },
  render() {
    let notebook = this.props.notebook;
    let url = `/notebook/${notebook._id}`;
    return (
      <div className="item">
        <div className="right floated content">
          <div className="ui basic tiny button" onClick={this.removeNotebook}>Remove</div>
        </div>
        <i className="file outline icon"></i>
        <div className="content">
          <a href={url}>
            <p> {notebook.name} </p>
          </a>
        </div>
      </div>
    );
  }
});
