module.exports = {
  baseUrl: process.env.NODE_ENV === "production" ? "/blog/" : "/", //指定项目发布的根目录
  productionSourceMap: false //去掉build后的map文件
};
