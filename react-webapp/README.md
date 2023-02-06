# 环境搭建

- 全局安装脚手架
```
cnpm i create-react-app -g
create-react-app -V
```

- 创建@reduxjs/toolkit + typescript 的项目架构
```
npx create-react-app react-webapp --template redux-typescript
```

- 启动项目
```
cd react-webapp
npm start
```

- 执行eject暴露操作（把webpack暴露出来）
```
git init
git add --all
git commit -m "第一次提交"
npm run eject   // y
```

- 如果暴露后界面卡住了，ctrl+C结束命令行，删除node_modules，再用cnpm/yarn重新安装所有依赖

- 修改若干webpack配置：改端口、关闭“自动打开浏览器”、添加@绝对路径、修改入口文件名称。

- src/setupProxy.js 配置接口代理

# TS入门

一、学习资源与建议

1、学习资源：TS官网、知乎/掘金上别人的TS文章（面试题）。
2、学习建议：直接在TS项目环境中写代码（Vue3、@reduxjs/toolkit、Umi）。
3、看面试题


二、TS学什么

1、TS类型（常用，现在学）

TS常用类型：string / number / boolean / any / void / Array<T> / any[]
	interface 自定义类型
	type 当类型比较复杂时，定义类型别名
TS泛型：useState<number>   Array<string>
TS函数：const Fn: FC = (props: FnProps) => {}


2、TS面向对象编程（以后再学） 


三、TS环境

1、@types/*  第三方包的官方声明文件（一般需要安装，用的时候一般也需要手动导入）
2、*.d.ts         自定义声明文件（TS项目中很多目录都有这种声明文件，全局生效，无须导入）
3、tsconfig.json  在你想修改它时，先去百度吧。
4、VScode    

四、TS报错解决思路

1、使用正确的类型
2、用any（变量声明时、函数入参、函数返回值）
3、能不写TS代码尽量不写
4、直接把文件后缀改成.js/.jsx