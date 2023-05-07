import { useEffect, useState } from "react";
import axios from "axios";

const fetchData = async (url, bodyFormData) => {
  const response = await axios({
    method: "post",
    url: url,
    data: bodyFormData,
    headers: { "Content-Type": "multipart/form-data" },
  })
  return response
};

export default fetchData;