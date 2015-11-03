EnvironmentList = React.createClass({
  getInitialState() {
    let rEnv = this.props.env;
    rEnv.onLsChange(this.envirionmentUpdated);
    return {
      ls: rEnv.getLs()
    };
  },
  envirionmentUpdated() {
    this.setState({
      ls: this.props.env.getLs()
    })
  },
  getIconClassForType(typename) {
    let icons = {
      "double": "calculator",
      "integer": "sort numeric ascending",
      "character": "book",
      "logical": "adjust"
    };
    let klass = _.has(icons, typename) ? icons[typename] : "help";
    return [klass, "icon"].join(" ");
  },
  render() {
    let ls = this.state.ls;
    let names = _.keys(ls);

    let env = names.map((name, nr) => (
      <div className="item" key={nr}>
        <i className={this.getIconClassForType(ls[name])}></i>
        <div className="content">
          <div className="header"> {name} </div>
          <div className="description"> {ls[name]} </div>
        </div>
      </div>
    ));
    return (
      <div className="ui raised segment">
        <h4 className="ui header">
          Environment
          <div className="sub header">{names.length} element{names.length == 1 ? "" : "s"}</div>
        </h4>
        <div className="ui mini celled list">
          {env}
        </div>
      </div>
    );
  }
});
