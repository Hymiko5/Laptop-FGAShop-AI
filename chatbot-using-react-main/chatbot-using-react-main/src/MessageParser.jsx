class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  
  }

  parse = (message) => {
    return this.actionProvider.messageHandler(message);
  };
}

export default MessageParser;
