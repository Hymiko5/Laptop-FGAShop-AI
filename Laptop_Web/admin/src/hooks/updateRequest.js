import { useEffect, useState } from "react";
import axios from "axios";

const updateRequest = async (url, bodyFormData) => {
  try {
    const response = await axios({
      method: "put",
      url: url,
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true
    })
    return response
  } catch(err) {
    return err.response.data
  }
  };

export default updateRequest;