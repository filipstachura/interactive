MainLayout = React.createClass({
  render() {
    return <div>
      <div className="ui inverted menu">
        <div className="ui container">
          <a href="/" className="header item">
            <i className="code icon"></i>
            InteRactive
          </a>
        </div>
      </div>

      <div>
        {this.props.content}
      </div>

    </div>
  }
});
