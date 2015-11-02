CodeBox = React.createClass({
  getInitialState() {
    return {
      visible: true
    };
  },
  changeVisibility() {
    this.setState({
      visible: !this.state.visible
    });
  },
  render() {
    let content = this.props.children;
    let toggleIcon = `caret ${this.state.visible ? "down" : "up"} icon`;
    let toggle = <i onClick={this.changeVisibility} style={style.toggle} className={toggleIcon}></i>;
    return (
      <div className="ui message">
        {content === undefined ? null : toggle}
        <p>{this.state.visible ? content : null}</p>
      </div>
    );
  }
});

const style = {
  toggle: {
    position: "absolute",
    top: "0",
    right: "0"
  }
};
