// 定义Babel的工作方式
module.exports = {
  // 预设：用于编译那些比较大的JS版本，比如ES6、TS、Flow、Vue、CoffieScript
  // @babel/preset-env 是专门用于编译ES6语法
  // @babel/preset-typescript  用于编译TS语法
  // @babel/preset-react  用于编译JSX语法
  presets: [
    ['@babel/preset-env', {}],
    ['@babel/preset-react', {}],

  ],
  // 插件：
  plugins: [
    // 这两个插件，用于编译装饰器语法
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    ["@babel/plugin-proposal-class-properties", {}]
  ],
  // 指定编译的目标平台
  targets: {
    "chrome": "58",
    "ie": "11"
  }
}
