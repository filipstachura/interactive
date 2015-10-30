RSession = class {
  constructor() {
    // Empty evaluation to get ls from server.
    let onOpen = () => this.evaluate("1");

    this.connection = new EvaluatorConnection(onOpen);
    this.ls = [];
  }

  onLsChange(fun) {
    this.onLsChangeHandler = fun;
  }

  setLs(ls) {
    this.ls = ls;
    this.onLsChangeHandler();
  }

  getLs() {
    return this.ls;
  }

  evaluate(expression) {
    let result = this.connection.send(expression)
      .then(response => JSON.parse(response).value);
    result.then(value => this.setLs(value.ls));
    return result;
  }
}
