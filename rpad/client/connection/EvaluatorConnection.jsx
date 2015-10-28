class EvaluatorConnection {
  constructor() {
    const connectionURI = "ws://localhost:9454";
    this.webSocket = new WebSocket(connectionURI);
    this.webSocket.onmessage = (message) => {
      console.log("Evaluator received a message: ", message.data);
    };
  }

  send(message) {
    this.webSocket.send(message);
  }
}

Connection = new EvaluatorConnection();
