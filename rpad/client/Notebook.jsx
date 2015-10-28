Notebook = React.createClass({
  render() {
    return (
      <div id="notebook" className="ui main text container">
        <h1 className="ui header">InteRactive notebook</h1>

        <Note />
      </div>
    );
  }
});
