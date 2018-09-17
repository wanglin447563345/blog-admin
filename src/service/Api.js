import { post } from "../util/Request";

export const login = params => {
  return post("login", {
    method: "POST",
    data: params
  });
};
