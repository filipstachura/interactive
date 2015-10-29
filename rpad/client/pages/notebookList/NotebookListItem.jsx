NotebookListItem = React.createClass({
  removeNotebook() {
    Notebooks.remove({
      _id: this.props.notebook._id
    });
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
