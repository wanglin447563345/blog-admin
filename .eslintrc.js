module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "@vue/prettier"],
  rules: {
      "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
      "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
      // "consistent-return": 2,
      // "indent"           : [1, 4]
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};
