# 环境运行

- 安装依赖包的三种可选方式
  - npm install --registry=https://registry.npm.taobao.org
  - yarn (建议使用，如果你电脑上没有yarn，这样安装它 npm install yarn -g)
  - cnpm (注意可能遇到诡异的bug，不建议使用)

- 安装依赖包的过程中，如果遇到 tui-editor问题，怎么解决？
  - 把package.json中的 tui-editor记录删除

- 安装依赖包的过程中，如果遇到 core-js问题，怎么解决？
  - 先把package.json中的 core-js 记录删除
  - 然后安装依赖 yarn
  - 最后手动安装它 yarn add core-js

- 当执行 npm run dev 启动项目时，遇到 tui-editor问题，怎么办？
  - 找到 tui-editor在源码中的代码，将其注释掉，不用它了。

- 启动项目 npm run dev

- 浏览器访问 http://localhost:9527


# 项目研究

- 1、研究新项目的思路

  - 通读README.md
  - package.json（技术栈、知道怎么安装依赖、怎么启动项目、有哪些没见过的包）
  - 研究各种配置文件（babel、eslint、webpack）
  - src
  - src/入口文件.js
  - src/App.tsx
  - src/路由、Layout，怎么配置新页面？
  - src/store状态管理文件
  - src/axios封装、api封装、跨域代理写在哪里？
  - src/翻看别人写的页面、了解编程范式（代码习惯）
	- 把项目跑起来(安装依赖包)，边看效果边看代码

- 2、研究结果输出

  - 需要直属小领导帮助讲解的问题列表（10个以内）
  - 罗列不值得问、自已又不会的问题列表

# 学习目标

- 1、你能把项目启起来吗？（你上班也有可能启动不了公司的项目）要有能力把一个没有见过的项目跑起来。

- 2、你会研究新项目吗？（有一套研究新项目的方法）大家在研究src源码，不能出现语法障碍。

- 3、权限设计流程（那张流程图）导航守卫、路由元信息、Vuex流程。

  - 面试官必问：我们这个项目中小型（大约二三十个模块），权限是由前端实现的。前端登录换取Token，在导航导卫beforeEach中实现权限设计，首先判断有没有Token，有Token进一步判断状态管理中有没有用户信息。如果没有Token，跳转登录页；如果没有用户信息，就使用Token调接口换取用户信息（用户信息中最重要的是用户角色），有了用户角色后，进一上用算法生成当前用户可以访问的动态权限路由（大约做法是使用后端返回的角色和路由元信息中的角色进行对比，得到可以访问的权限路由），有了可访问的权限路由（数组），再通过路由实例上的addRoutes方法把可访问的路由规则添加到路由系统中去。

	- 前端做权限 vs. 后端做权限：前端做权限，如果要修改权限，必须重新修改前端代码，再重新打包上线。前端做权限，也只是适合中小型项目，适合那些模块少、角色少的项目。前端做权限，适合小公司使用，开发成本低。
	后端做权限，我们不讲，到时毕业时搞一个demo演示说明。

	- 管理系统左侧的菜单是什么时候生成（渲染）的？在登录流程中，Token-用户信息-生成可访问的accessRoutes-保存Vuex中-跳转系统内页（Layout生成与渲染）。在刷新流程中， 使用token换取用户信息-生成可访问的accessRoutes-保存Vuex-直接生成和渲染Layout。

- 4、认真研究Layout布局（这里除了涉及到权限菜单的渲染、还有很多全局功能）。
	- 菜单怎么渲染的？
	- 设置功能怎么实现的？
	- 全局操作、切换组件大小、国际化怎么实现的？
	- TagView、面包屑怎么实现的？

- 5、ElementUI必须要熟练使用（比Vant还要重要）。

	- Table、Form、JS组件。。。。
	- 表单校验（前端校验、后端校验、人工审核）
  - 表单校验做哪些事儿？必填或非必填验证、数据类型校验、数据格式校验、在什么时候校验（边输入边校验、失焦时校验、点击提交时校验） 。

- 6、联调接口（增删改查）
	- 关闭Mock服务：在 main.js / vue.config.js 注释掉Mock相关的代码。
	- 登录接口联调：接口代理、封装api、梳理axios拦截器里的代码、在MongoDB数据库的users表中添加了一个用户 { username: 'admin', password: '123456' } 。
  - 商品增删改查（基本套路、交互逻辑）

- 7、一点扩展（再次理解角色与权限）
  - 管理员：admin / 123456 系统管理员（商品审核）
  - 张三：zhangsan / 123456  商家
  - 李四：lisi / 123456 商家

# 项目总结

- 项目描述：是使用vue-element-admin这个开源项目做的一个电商管理系统。
- 技术栈：vue-element-admin（vue2、vuex3、vue-router3、element）
- 负责模块：商品管理、权限流程开发、客户管理、数据统计、审核模块等。
- 项目技术点：
  - 使用element-ui、sass布局，使用 Menu、Form、Table、Layout实现布局设计。
  - 使用vue-i18n实现国际化、使用fullscreen实现全局切换、使用element设计主题色切换、组件size切换等功能。
  - 使用echarts封装图表组件，比如BarChart、LineChart、PieChart、BoxCard等图表组件，制作精美的数据分析界面。
  - 使用clipboard封装剪切板功能、使用driver.js实现引导提升用户体验、使用dropzone实现元素拖拽功能、使用Export2Excel、file-saver实现表格导出excel表。
  - 使用router.addRoutes()、路由守卫、路由元信息设计健壮的权限功能。
  - 封装v-permission实现元素级别的权限管理、封装v-waves实现元素波浪样式、封装处理电商数据的过滤器。
  - 封装ThemePicker拾色器、UploadExcel功能组件，对Uload、Table、Pagination等组件进行二次封装。

# 面试题（话术）

- 简单/详细介绍一下这个项目。
- 你这个管理系统的权限是怎么做的？（前端做法、后端做法）
- 你项目的难点？亮点？（从业务的角度说难点和亮点，切忌说技术层面的难点）
- 你封装过什么好的组件？（Echart图表组件、对ElementUI组件进行二次封装。。。）
- 你这个项目的国际化怎么做？
- 你用过哪些类型的echarts图表？
- 你的管理系统中有没有用过websocket？（socket.io）

# 功能列表

```
- 登录 / 注销

- 权限验证
  - 页面权限
  - 指令权限
  - 权限配置
  - 二步登录

- 多环境发布
  - dev
  - sit
  - stage
  - prod

- 全局功能
  - 国际化多语言
  - 多种动态换肤
  - 动态侧边栏（支持多级路由嵌套）
  - 动态面包屑
  - 快捷导航(标签页)
  - Svg Sprite 图标
  - 本地/后端 mock 数据
  - Screenfull全屏
  - 自适应收缩侧边栏

- 编辑器
  - 富文本
  - Markdown
  - JSON 等多格式

- Excel
  - 导出excel
  - 导入excel
  - 前端可视化excel
  - 导出zip

- 表格
  - 动态表格
  - 拖拽表格
  - 内联编辑

- 错误页面
  - 401
  - 404

- 組件
  - 头像上传
  - 返回顶部
  - 拖拽Dialog
  - 拖拽Select
  - 拖拽看板
  - 列表拖拽
  - SplitPane
  - Dropzone
  - Sticky
  - CountTo

- 综合实例
- 错误日志
- Dashboard
- 引导页
- ECharts 图表
- Clipboard(剪贴复制)
- Markdown2html
```
