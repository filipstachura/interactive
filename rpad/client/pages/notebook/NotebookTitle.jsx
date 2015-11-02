NotebookTitle = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    let notebookId = this.props.notebookId;
    return {
      notebook: Notebooks.findOne({ _id: notebookId })
    };
  },
  getInitialState() {
    return { editing: false };
  },
  editName() {
    this.setState({ editing: true });
  },
  stopEdit() {
    this.setState({ editing: false });
  },
  stopOnEnter(event) {
    if (event.key === 'Enter') this.stopEdit();
  },
  changeName(event) {
    let notebookId = this.props.notebookId;
    let name = event.target.value;
    Notebooks.update({ _id: notebookId}, {
      $set: { name }
    });
  },
  render() {
    if (!this.state.editing) {
      return <h1 onClick={this.editName} className="ui header">{this.data.notebook.name}</h1>;
    } else {
      return (
        <div className="ui input focus">
          <input ref="notebookName" type="text"
            value={this.data.notebook.name}
            onChange={this.changeName}
            onBlur={this.stopEdit}
            onKeyDown={this.stopOnEnter}
          />
        </div>
      );
    }
  }
});
