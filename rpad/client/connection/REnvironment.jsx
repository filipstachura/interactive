REnvironment = class {
  constructor(session, envId) {
    this.session  = session;
    this.envId = envId;
    // Empty evaluation to get ls from server.
    this.evaluate("1");
    this.ls = [];
  }

  onLsChange(fun) {
    this.onLsChangeHandler = fun;
  }

  setLs(ls) {
    this.ls = ls;
    this.onLsChangeHandler && this.onLsChangeHandler();
  }

  getLs() {
    return this.ls;
  }

  evaluate(expression) {
    let message = JSON.stringify({
      env: this.envId,
      content: expression
    });
    let result = this.session.evaluate(message);
    result.then(value => this.setLs(value.ls));
    return result;
  }
};
