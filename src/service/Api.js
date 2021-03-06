import { post } from "../util/Request";

// 登录
export const login = params => {
  return post("login", {
    method: "POST",
    data: params
  });
};

// 用户注册
export const register = params => {
  return post("create_user", {
    method: "POST",
    data: params
  });
};

// 文章列表
export const list_article = params => {
  return post("list_article", {
    method: "POST",
    data: params
  });
};

// 添加文章
export const create_article = params => {
  return post("create_article", {
    method: "POST",
    data: params
  });
};

// 文章详情
export const detail_article = params => {
  return post("detail_article", {
    method: "POST",
    data: params
  });
};

// 修改文章
export const edit_article = params => {
  return post("edit_article", {
    method: "POST",
    data: params
  });
};

// 删除文章
export const delete_article = params => {
  return post("delete_article", {
    method: "POST",
    data: params
  });
};

// 文章类型统计
export const type_sum = params => {
  return post("type_sum", {
    method: "POST",
    data: params
  });
};

// 创建文章类型
export const create_article_type = params => {
  return post("create_type", {
    method: "POST",
    data: params
  });
};

// 删除文章类型
export const delete_article_type = params => {
  return post("delete_type", {
    method: "POST",
    data: params
  });
};

// 修改文章类型
export const edit_article_type = params => {
  return post("edit_type", {
    method: "POST",
    data: params
  });
};
