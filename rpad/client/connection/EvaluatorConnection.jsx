EvaluatorConnection = class {
  constructor(onOpenHandler) {
    const connectionURI = "ws://localhost:9454";
    this.webSocket = new WebSocket(connectionURI);
    this.webSocket.onopen = onOpenHandler;
  }

  send(message) {
    this.webSocket.send(message);
    return new Promise((resolve, reject) => {
      this.webSocket.onmessage = (message) => {
        console.log("Evaluator received a message: ", message.data);
        resolve(message.data);
      };
    })
  }
};
