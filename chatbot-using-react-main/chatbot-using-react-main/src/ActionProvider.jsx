import fetchData from "./hooks/useFetch";
class ActionProvider {
  constructor(createChatBotMessage, setStateFunc, createClientMessage) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
    this.fetchData = fetchData
  }
  //method for add message in our chatbot
  addMessageToBotState = (messages) => {
    if (Array.isArray(messages)) {
      this.setState((state) => ({
        ...state,
        messages: [...state.messages, ...messages],
      }));
    } else {
      this.setState((state) => ({
        ...state,
        messages: [...state.messages, messages]
      }));
    }
  };
  
  //method for add message in our chatbot
  addLaptopListToBotState = (messages, laptopList) => {
    if (Array.isArray(messages)) {
      this.setState((state) => ({
        ...state,
        messages: [...state.messages, ...messages],
      }));
    } else {
      this.setState((state) => ({
        ...state,
        messages: [...state.messages, messages], laptopList
      }));
    }
  };

  addOrderToBotState = (messages, order) => {
    if (Array.isArray(messages)) {
      this.setState((state) => ({
        ...state,
        messages: [...state.messages, ...messages],
      }));
    } else {
      this.setState((state) => ({
        ...state,
        messages: [...state.messages, messages], order
      }));
    }
  };

  addGiftToBotState = (messages, gift) => {
    if (Array.isArray(messages)) {
      this.setState((state) => ({
        ...state,
        messages: [...state.messages, ...messages],
      }));
    } else {
      this.setState((state) => ({
        ...state,
        messages: [...state.messages, messages], gift
      }));
    }
  };


  addOrderListToBotState = (messages, listOrder) => {
    console.log(listOrder)
    if (Array.isArray(messages)) {
      this.setState((state) => ({
        ...state,
        messages: [...state.messages, ...messages],
      }));
    } else {
      this.setState((state) => ({
        ...state,
        messages: [...state.messages, messages], listOrder
      }));
    }
  };

  messageHandler = async (message) => {
    const response = await fetchData("/message", {message} )
    console.log(response)
    if(response.data.type === "list") {
      const messages = this.createChatBotMessage("Tôi đã tìm danh sách sản phẩm phù hợp nhu cầu của bạn: ",{
        withAvatar: true,
        widget: "ImageWidget",
      })
      this.addLaptopListToBotState(messages, response.data.res);
    } else if(response.data.type === "message") {
      const messages = this.createChatBotMessage(response.data.msg,{
        withAvatar: true,
      })
      this.addMessageToBotState(messages, response.data.res);
    } else if(response.data.type === "gift") {
      const messages = this.createChatBotMessage(response.data.msg,{
        withAvatar: true,
        widget: "GiftWidget",
      })
      this.addGiftToBotState(messages, response.data.res);
    } else if(response.data.type === "order") {
      const messages = this.createChatBotMessage("Thông tin đơn hàng: ",{
        withAvatar: true,
        widget: "OrderWidget",
      })
      this.addOrderToBotState(messages, response.data.res);
    } else if(response.data.type === "user-order") {
      const messages = this.createChatBotMessage("Thông tin các đơn hàng: ",{
        withAvatar: true,
        widget: "ListOrderWidget",
      })
      
      this.addOrderListToBotState(messages, response.data.res);
    }
    
    
  };
}

export default ActionProvider;
