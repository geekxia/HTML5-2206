// 解决ESLint报错的四种方法
// 1、找到ESlint配置文件（5种），修改rules（自定义规则）
// 2、使用ESlint注释（写法非常多），临时忽略检测
// 3、在项目根目录添加一个 .eslintignore 文件
// 4、老老实实地找到报错位置，把代码改成规范的写法

// ESlint最高优先级的配置文件
module.exports = {
  // 可以ES6新特性做更好的代码检测
  parser: "@babel/eslint-parser",
  // 解析配置
  parserOptions: {
    ecmaVersion: 6,  // ES6统称（ECMAScript2015+）
    sourceType: "module",
    ecmaFeatures: {
      jsx: true  // 一定要开启对JSX检测
    }
  },
  // 集成airbnb对React代码检测
  extends: ["airbnb", "airbnb/hooks"],
  // 自定义ELint检测规则，三种错误级别（2-error，1-warn，0-off）
  rules: {
    "semi": "off",
    "no-console": "warn",
    "react/react-in-jsx-scope": 0,
    "react/react-in-jsx-scope": 0,
    "react/button-has-type": 0
  }
}
