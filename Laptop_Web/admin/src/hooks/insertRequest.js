import { useEffect, useState } from "react";
import axios from "axios";

const insertRequest = async (url, bodyFormData) => {
  try {
    const response = await axios({
      method: "post",
      url: url,
      data: bodyFormData,
      headers: { "Content-Type": "application/json" },
      withCredentials: true
    })
    return response
  } catch(err) {
    return err.response.data
  }
    
  };

export default insertRequest;