import axios from "axios";
import cookie from "js-cookie";

axios.defaults.baseURL = "http://localhost:3001/api/";
export const post = (url, options) => {
  const defaultOptions = {
    credentials: "include",
    method: "post",
    url
  };
  const newOptions = { ...defaultOptions, ...options };
  const userInfo = JSON.parse(cookie.get("user_info") || "{}");
  if (!(newOptions.data instanceof FormData)) {
    newOptions.headers = {
      Accept: "application/json",
      "Content-Type": "application/json; charset=utf-8",
      "X-Beancomm-UserId": userInfo.user_id,
      "X-Beancomm-Token": userInfo.token,
      ...newOptions.headers
    };
    newOptions.data = JSON.stringify(newOptions.data);
  } else {
    // newOptions.body is FormData
    newOptions.headers = {
      Accept: "application/json",
      "X-Beancomm-UserId": userInfo.user_id,
      "X-Beancomm-Token": userInfo.token,
      ...newOptions.headers
    };
  }
  return axios(newOptions)
    .then(data => data.data)
    .catch(e => e);
};
