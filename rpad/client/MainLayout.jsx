MainLayout = React.createClass({
  render() {
    return <div>
      <div className="ui inverted menu">
        <div className="ui container">
          <div href="#" className="header item">
            <i className="code icon"></i>
            InteRactive
          </div>
        </div>
      </div>

      <div>
        {this.props.content}
      </div>

    </div>
  }
});
