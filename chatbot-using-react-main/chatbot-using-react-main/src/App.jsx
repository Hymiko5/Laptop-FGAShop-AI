import React from "react";
import Chatbot from "react-chatbot-kit";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import Config from "./Config";
import MessageParser from "./MessageParser";
import ActionProvider from "./ActionProvider";
import "./app.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route index element={<Navigate to="/chatbot/Hymiko5" replace={true} />}>
    </Route>
    <Route path="/chatbot/Hymiko5" element={
      <>
      <div className="app">
        <div className="container">
          <h1>
            <span style={{ color: "pink" }}>HYMIKO5</span>
          </h1>
        </div>
        <div className="container">
          <h4>1. Tìm kiếm sản phẩm</h4>
        </div>
        <div className="container">
          <h4>2. Check hóa đơn</h4>
        </div>
        <div className="App mx-auto col-md-6 col-sm-8 col-lg-4 cpl-xl-3 my-5">
          <Chatbot
            config={Config}
            messageParser={MessageParser}
            actionProvider={ActionProvider}
          />
        </div>
      </div>
    </>
    }>
    
    </Route>
    </Routes>
      </BrowserRouter>
  );
}

export default App;
