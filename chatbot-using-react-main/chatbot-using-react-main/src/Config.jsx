import { createChatBotMessage } from "react-chatbot-kit";
import EnrollmentNo from "./widgets/EnrollmentNo";
import SoftwareDevelopment from "./widgets/SoftwareDevelopment";
import WebDevelopment from "./widgets/WebDevelopment";
import Tools from "./widgets/Tools";
import WeatherInfo from "./widgets/WeatherInfo";
import ImageWidget from "./components/ImageWidget"
import GiftWidget from "./components/GiftWidget";
import OrderWidget from "./components/OrderWidget";
import ListOrderWidget from "./components/ListOrderWidget";


const botName = "Hymiko5";
//congig for chatbot
const config = {
  botName: botName,
  customStyles: {
    botMessageBox: {
      backgroundColor: "#376B7E",
    },
    chatButton: {
      backgroundColor: "#5ccc9d",
    },
  },
  initialMessages: [createChatBotMessage(`Xin chào, tôi là ${botName} được tạo bởi Nam Nguyễn.`)],
  state: {
    laptopList: [],
    gift: null,
    order: null,
    listOrder: []
  },
  //widgets declaration section which we use in our bot for display information
  widgets: [
    {
      widgetName: "ImageWidget",
      widgetFunc: (props) => <ImageWidget {...props} />,
      mapStateToProps: ["laptopList"],
    },
    {
      widgetName: "GiftWidget",
      widgetFunc: (props) => <GiftWidget {...props} />,
      mapStateToProps: ["gift"],
    },
    {
      widgetName: "OrderWidget",
      widgetFunc: (props) => <OrderWidget {...props} />,
      mapStateToProps: ["order"],
    },
    {
      widgetName: "ListOrderWidget",
      widgetFunc: (props) => <ListOrderWidget {...props} />,
      mapStateToProps: ["listOrder"],
    },
  ],
};

export default config;
