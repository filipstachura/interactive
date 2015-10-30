RSession = class {
  constructor() {
    this.connected = new Promise((resolve, reject) => {
      let onOpen = resolve;
      this.connection = new EvaluatorConnection(onOpen);
    });
  }

  getEnv(notebookId) {
    return new REnvironment(this, notebookId);
  }

  evaluate(message) {
    return this.connected.then(() =>
      this.connection.send(message)
        .then(response => JSON.parse(response).value)
    );
  }
};
