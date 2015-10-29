NotebookList = React.createClass({
  render() {
    return (
      <div id="notebook" className="ui main text container">
        <h1 className="ui header">Notebooks available</h1>

        <div className="ui celled list">
          <div className="item">
            {["one", "two", "three"].map((note, nr) =>
              <p key={nr}> {note} </p>
            )}
          </div>
        </div>
      </div>
    );
  }
});
