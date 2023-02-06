# 环境搭建

【推荐】Window10+(Node14/16) + @vue/cli(webpack5)
【不推荐】Window7（Node12）+@vue/cli(webpack4)

【NodeJS安装】在node官网下载v16（.msi）双击安装，在命令行中`node -v` `npm -v`
【包管理器】npm（nodejs自带的）yarn（推荐使用）cnpm（淘宝镜像）
npm
npm install cnpm -g --registry=https://registry.npmmirror.com
【使用npm安装@vue/cli】
cnpm install @vue/cli -g  全局安装（一次安装，以后都能用）
vue -h
vue -V  （验证@vue/cli是否安装成功）
在你希望的目录中打开命令行
vue create vue-webapp   // 输入2选择创建Vue2项目  
cd vue-webapp  // 进入项目根目录
npm run serve   // 启动项目

如果你也是按照上面这个操作创建项目，但是没成功，用一下你同桌已经创建好的项目。你发项目给别人时，不要带上node_modules包。
你拿到没有node_modules包的项目，在根目录执行 `cnpm install` 然后`npm run serve`

# 目录分析

- README.md 记录整个项目的命令行、启动方式、业务需求与细节、特殊bug说明。。
- vue.config.js 是基于webpack(5)二次封装的配置文件，比如改端口、做代码、上线打包优化等。
- package.json 是npm包管理器的配套文件，用于记录整个项目的基本信息（版本号、项目名称、当前项目所需要的第三方依赖包。。。）
  - 注意：这个文件相当重要，现在的你不要随便动它。
- jsconfig.json 这是TypeScript的配置文件（最新的TS配置文件推荐使用 tsconfig.json）
- babel.config.js 这是Babel编译器的配置文件（在脚手架中可以用比较新的语法，Babel用于把比较新的语法编译成浏览器能够普遍兼容的ES5语法）
- .gitigore 当你 git add / git commit / git push时，要忽略哪些文件或目录。
- node_modules目录，当前项目所依赖的所有第三方包（如果你的项目没有这个目录，或者出现了丢包情况，都建议把node_modules目录删掉，执行`cnpm install`重新安装node_modules包。）
- public目录，是当前项目的本地的静态资源目录（就是本地服务器）
- src目录，是你的业务代码目录（源码目录）

- .vue文件（单文件组件，由视图模块、Vue组件选项、样式这三个部分组成）为了支持单文件组件的高亮，大家安装vetur插件。

# 面试题

- 你做vue项目用的是哪个版本的脚手架？（v4/v5）怎么创建项目？（vue ui / vue create）
- 使用脚手架有什么好处？（有ESlint代码检测、有热更新、有单文件组织、背后还有webpack功能丰富）
- 什么是单文件组织？浏览器是怎么解析.vue代码？(vue-loader)
- 在脚手架中，如何做代理？你有打包过vue项目？有没有做过vue项目部署？（vue.config.js配置）

# Vue路由

- 单页面应用程序（SPA）：通过路由系统把组件串联起来的并且只有一个根index.html页面的程序，叫做单页面应用程序。
- 多页面应用程序（MPA）：整个应用程序中，有多个.html页面。在SPA中，页面的切换，本质上就是组件的显示与隐藏，背后是路由系统在起作用。

- 如何在脚手架环境中集成Vue路由系统？（vue(2) + vue-router(3)）
  - 第一步：安装路由v3版本，注册路由
    - cnpm i vue-router@3.5.4 -S  // @用于指定版本、-S表示安装成功后把这个包记录在package.json的“dependencies”中。
    - 新建src/router.js文件，注册路由Vue.use(VueRouter)
  - 第二步：创建路由实例、定义路由规则，并在main.js挂载路由系统
    - export default new VueRouter({mode, routes:[]})
    - 在main.js挂载路由 new Vue({ router })
  - 第三步：在合适的位置放置一个视图容器和菜单
    - 在App.vue的视图中放置一个 <router-view>显示url匹配成功的组件。
    - 在App.vue的视图中使用 <router-link>制作菜单，点击跳转url。


- 盘点路由知识点（**）

- 两种路由模式：hash路由、history路由。
  - hash路由：有#，背后是监听onhashchange事件实现的，hash路由部署上线不会出现404；
  - history路由：没有#，背后是基于history api实现的，history路由部署上线会出现404问题。

- 两个全局组件：<router-view name>视图容器、<router-link to tag active-class>用于设计菜单导航的。
  - <router-link>：to属性用于指定跳转的目标；tag用于指定最终渲染成什么标签，默认渲染成a标签；active-class/exact-active-class用于指定菜单的高亮样式。
  - <router-view>：name属性用于指定命令视图（给router-view加个名字，默认叫default）。

- 两个内置API：$route表示路由信息，$router用于路由跳转的。
  - $route路由信息: this.$route.fullPath/query/params/meta。（watch可以监听$route的变化）
  - $router路由实例：this.$router.push()向前跳转/replace()向前跳转/back()返回上一次。

- 两种路由跳转：声明式跳转、编程式跳转。
  - 所谓的声明式路由跳转，就是使用 <router-link>做跳转，一般用于菜单设计。
  - 所谓的编程式路由跳转，就是使用 $router 做跳转，一般用在事件中。

- 两种命名：命名视图、命名路由。
  - 所谓的命名视图，意思是给<router-view>加一个name属性。
  - 所谓的命名路由，意思是给{path,component}路由规则取一个名字。

- 两种路由传参：query传参、动态路由传参。
  - query传参：在跳转路由的url后面用?a=1&b=2&c=3这种方式传参，在另一个组件中使用this.$route.query接收。
  - 动态路由传参：像这样 `{path: '/good/:id', component }`定义路由规则，在这条动态路由规则对应的组件中使用this.$route.params接收，或者开启props:true后使用 props选项来接收。

- 两个优化：路由懒加载、重定向与别名
  - 路由懒加载：当一个SPA应用程序中的页面足够多，我们需要根据路由系统进行按需加载组件（而不是一次性加载所有组件），该怎么实现呢？使用路由懒加载（背后原理是Webpack代码分割技术、Vue异步组件）。路由懒加载，是一种性能优化方案。
  - 重定向与别名：当用户访问一个未定义的路由时，给一个重定向（跳转到另一个已定义的路由上），这是一种用户体验的优化。重定向规则，一般要放在路由规则的最后面。什么是别名？别名是path的简写，可以用于路由访问；什么时候需要用到别名？当path比较复杂时，需要给它设计一个别名。

- 两个难点：嵌套视图（嵌套路由）、导航守卫（路由元信息）。
  - 嵌套视图（嵌套路由）：当我们设计类似知乎官网那样的一级菜单、二级菜单时，就要用到嵌套视图。所谓“嵌套视图”，从组件树的角度来讲，<router-view>所显示的组件的内部还有<router-view>；从路由规则的角度来讲，{path,component,children}带有children这个属性；从产品设计的角度来讲，一级菜单对应的页面中还有二级菜单。
  - 导般守卫：在router实例对象上有三个重要的全局钩子（beforeEach、beforeResolve、afterEach），每次url发生变化时，都会触发这三个钩子按顺序执行。那么以后我可以在这些钩子编写验证逻辑，如果验证通过就放你过去，你就可以正常访问你想访问的页面；如果验证失败，就阻止你访问目标页面，这就实现“守卫”的效用了。在路由中，使用导航守卫和路由元信息，可以做鉴权、还可以做权限设计。

# 面试题

- 说一下history和hash路由有什么区别？
- 什么是命名视图、命名路由、别名？（<router-view name>、{path,component,name,alias}）
- 说一下路由怎么传参？什么是动态路由？（两种传参。所谓动态路由，就是定义路由规则时path字段串中有冒号）
- 什么是路由懒加载？它背后的原理是什么？（Webpack代码分割、使用动态导入语法的Vue异步组件）
- 什么是路由守卫（导航守卫）？你项目的鉴权怎么做的？你这个管理系统的权限怎么设计的？
- 在Vue中做组件的显示与隐藏，有哪些方案？（v-show/v-if、<component>、路由或嵌套路由）
- 在Vue中，怎么监听路由的变化？（watch监听$route）
- 什么是单页面应用程序（SPA）？你怎么理解单页面应用程序？

# Vuex状态管理

- 关于版本问题
  - 在Vue2技术栈中：Vue(2) + VueRouter(3) + Vuex(3)
  - 在Vue3技术栈中：Vue(3) + VueRouter(3) + Vuex(4) / Pinia(2)

- 关于状态管理
  - 状态管理：状态在应用程序中表示数据，状态管理就是数据管理。
  - 两个作用：组件之间的数据共享；做数据缓存。
  - 特别注意：在应用程序中，要正确地选择通信方案，数据流管理要合理。
  - 怎么学习Vuex？一个流程图（要求会画会说会写）、五个概念、四个map方法。

- 如何在脚手架环境中集成Vuex状态管理？
  - 第一步：安装vuex指定版本，并注册Vue.use(Vuex) / cnpm i vuex@3.6.2 -S
  - 第二步：创建store实例{五个概念}并抛出，在main.js挂载store
  - 第三步：在组件中使用this.$store/四个map方法来使用store或走数据流程

- 如何安装devtools？devtools有什么用？（用于调试组件树、用于调试Vuex数据流）

- 关于axios使用
  - 为了调接口，我们推荐使用axios这个HTTP工具（建议在npm上搜索axios，阅读一下它的文档）
  - 为什么要使用axios？（axios是基于Promise的、在Web浏览器和Node应用中都可以使用）
  - 如何使用axios？第一步：安装并封装（拦截器）；第二步：使用封装过的axios实例进行调接口。

- 创建store时要用的五个概念（state/getters/mutations/actions/modules）
  - state: {} 用于定义可被组件共享数据，是具有响应式的；在组件中使用this.$store.state来访问它们。
  - getters: {fn} 用于计算state，相当于Vue的计算属性，当state发生变化时getters方法自动自动重新计算；在组件中使用this.$store.getters来访问它们。
  - mutations: {fn} 专门用于修改state的，所以mutations方法是这样fn(state,payload)定义的；mutations方法在actions中或组件中使用，使用$store.commit('mutations方法',payload)来触发。
  - actions: {fn} 专门用于调接口的，所以actions方法是这样fn(store,payload)定义的；在组件中使用this.$store.dispatch('actions方法', payload)。
  - modules: {子store} 是一个Vuex架构层面的概念，用于拆分子store。大家在拆分子store务必在子store中使用namespaced:true开启命名空间。

- 在组件中推荐使用四个map*方法来访问store数据或操作store。
  - mapState/mapGetters，必须写在computed计算属性中，用于访问state/getters数据。映射进来后，就可以用this来访问这些数据了。
  - mapActions/mapMutations 必须写在methods选项中，用于访问mutations/actions方法。映射进来后，可以用this调用这些方法。
  - 它们的语法是相同的：map*('命名空间', ['k1', 'k2'])

- 使用Vuex的几个原则(*)
  - 原则1：只要使用Vuex一定要拆分store，拆分store后在根store上不要再使用state/mutations/actions。
  - 原则2：在子store务必开启命名空间namespaced:true。
  - 原则3：在组件中尽可能不要使用$store，建议使用四个map*方法。

# 面试题

- 简述Vuex的作用和意义?（基于Flux思想的状态管理工具，用于组件间数据通信、用于数据缓存）
- 简述Vuex的工作流程?（actions -> mutations -> state -> 组件）
- 什么是单向数据流？（state -> view -> action）
- 说一下状态管理的五个概念分别代表什么？说一下mutations和actions的区别？

# 聊一聊项目实战

- 第一个目的：把基础知识点串起来。
- 第二个目的：让大家多遇到错误。
- 第三个目标：启发大家学会拆解项目。

- webapp 长得像交互也像APP的H5页面。（webapp不是App，是H5移动端网页）
- 移动端UI常识：宽度都是750px。
- 移动端web的布局方案：rem、vw/vh、flexable。（推荐使用rem布局，解决不同手机之间的样式兼容性问题）
- 结论：当你在项目中引入rem.js后，html的根字体永远都是当前手机屏幕宽度的1/10。那么以后写css样式，就可以使用rem作单位了。工作中，你在UI设计图上量取尺寸为 35px, 除以75即可得到对应的rem尺寸。在VScode中安装一个px2rem插件，自动帮你完成转换。

- ToC，样式复杂、有设计稿、组件往往很难找到合适的第三方开源组件库。
- VantUI(2)，对Vue2配套的移动端组件库。官网：https://vant-contrib.gitee.io/vant/v2/#/zh-CN/
- cnpm i vant@latest-v2 -S
- cnpm i babel-plugin-import -D  // 安装成功后记录在package.json的"devDependencies"
- 关于在项目中使用Vant(2)有两种办法：第一，使用babel-plugin-import按需加载；第二，直接对Vant一次性全局注册。在开发环境中，你可以选择第二种方式，以后项目上线时你要改成第一种方式。

- 在Vue脚手架中，如何支持sass？
- cnpm i sass -D
- cnpm i sass-loader -D
- 在.vue单文件组织中， <style lang='scss'></style>

- 需求1：设计移动端rem布局。
- 需求2：安装集成vant(2)，参考文档：https://vant-contrib.gitee.io/vant/v2/#/zh-CN/quickstart
- 需求3：封装底部Tabbar，尽可能做成JD那样的，实现路由跳转。
- 需求4：实现NoticeBar通知栏组件。
- 需求5：实现AdSwipe轮播图组件。

# 集成node-fullapi数据服务器

- 把页面做完：首页、品类页面、购物车页面、商品详情页、登录页、注册页。
- 安装了两个软件：mongodb(5.0.9)、 studio3T
- 联合 mongodb、studio3T、node-fullapi，把后端程序启动起来【六个步骤】
  ```
  第一步：启动MongoDB数据库服务（mongod --dbpath "D:\MongoDB\data"）。（怎么验证我的数据库服务启动是成功的呢？）
  第二步：双击运行Studio3T，连接MongoDB数据库服务。（左侧面板出现了三个数据库）
  第三步：在Studio3T左侧面板，创建一个名字叫 qfdb 的数据库。
  第四步：在码云中拿到最新node-fullapi项目，在其根目录中安装依赖，安装完成后 npm start 启动Node程序。
  第五步：在Studio3T中，选中qfdb这个数据库，创建一个名字叫 goods 集合（表），然后向这个表中插入假数据（假数据参考node-fullapi项目根目录中的 GOOD.md）
  第六步：在浏览器地址栏中 http://localhost:9999/api/v1/vant/good/list，如果有数据表示上面的工作都是对的。
  ```
- 在vue-webapp使用vue.config.js做代理，调通商品列表接口，完成首页数据渲染、触底加载、下拉刷新功能。

# 关于跨域

- 跨域：每一个“域”都由协议、IP地址和端口号这三个部分组成。那么什么域域？当你从当前域访问另一个域时，如果上述三个部分有任何一个部分不相同，就是跨域。
  ```
  http://localhost:8080    ->   http://localhost:9999     是跨域
  http://localhost:8080    ->   https://localhost:8080   是跨域
  http://localhost:8080    ->   http://127.0.0.1:8080     是跨域
  ```

- 事实：在所有浏览器中都内置了一个安全策略，叫做CORS同源策略。这个同源策略有什么特点呢？同源策略会阻塞AJAX跨域请求。

- 请问谷歌浏览器中有同源策略吗？  有
- 请问axios是不是基于AJAX封装的？是

- 在8080端口上，使用ajax请求9999服务器接口，会被阻塞吗？如果这件事儿发生浏览器中，必然会被阻塞。如果发生非浏览器环境，比如node环境中，肯定不会被阻塞。

- 在8080端口上，使用JSONP请求9999服务器接口，会被阻塞吗？无论什么环境，都不会被阻塞。哪怕这个行为发生在浏览器中，也不会被阻塞，因为JSONP不是AJAX，同源策略管不了它。

- 以浏览器环境为例，你有哪些解决跨域被CORS阻塞的方案呢？
  - 1、JSONP。因为JSONP不是Ajax，同源策略管不了。JSONP只能解决GET请求的跨域问题。
  - 2、CORS。要求在后端服务器配置CORS的headers字段，这种做法相当于把后端接口变成了开源接口，比如cnode接口。
  - 3、代理。在本地开发中，我们使用webpack做代理；在生产环境下，我们使用nginx做代理。为什么代理可以解决“浏览器同源策略阻塞AJAX跨域请求”的问题呢？保证了AJAX同域请求。

# 罗列技术点

- Vue特点、MVVM、声明式开发思想、指令（v-bind、v-on、v-model、v-slot）、计算属性、侦听器、组件封装（单文件组织、props、data、$emit、<slot>、methods、sass、局部样式、name、组件注册）、生命周期钩子、<keep-alive>及其两个生命钩子、过渡动画、混入、过滤器、自定义指令、使用Vue第三方插件、$forceUpdate、$nextTick、父子组件通信、状态提升、ref操作、插槽通信、Vuex通信。

- 路由规则（path、component、meta、children、redirect）、<router-view>、<router-link>、$router.push/replace/back、三个全局守卫、嵌套视图、动态路由、路由传参（$route）、路由懒加载、路由重定向。

- Vuex五个概念、四个map方法、一个$store、axios封装（创建实例、拦截器）、vue.config.js做代理解决跨域问题。

# 项目实战总结（简历）

- 项目介绍：移动端电商类的webapp
- 技术栈：vue(2) + vue-router(3) + vuex(3) + vant(2) + axios + sass
- 你负责哪些模块（建立说出独立开发）：商品展示模块（首页、详情、推荐）；品类搜索模块（品类、搜索导航、历史搜索）；个人中心模块（设置、地址管理、积分会员、历史订单）；购物车模块（列表、筛选、支付、抽奖、换购）；鉴权模块（登录、注册、绑定手机）。

- 项目技术点
  - 使用VantUI组件库编写移动端视图结构、使用rem处理移动端布局、使用sass预编译器编写高质量的样式代码。
  - 封装Swipe轮播图组件，使用PullDownRefresh实现列表页面下拉刷新、使用List组件实现触底加载、使用<keep-alive>实现列表页面的缓存、使用DOM滚动事件保留列表滚动条。
  - 封装购物车系列组件，Cart商品组件、SearchPanel筛选组件、Present抽奖组件、NotData数据显示组件、Sumbit提交组件、MultiplePay支付选项卡组件等，编写符合用户体验的购物交互逻辑。
  - 使用路由守卫、路由元信息实现鉴权流程；封装v-login自定义指令实现组件元素的权限拦截；使用路由懒加载、webpack代码分割技术，对部署打包进行代码优化。
  - 使用组件按需加载、图片精灵图、图片懒加载、Vuex缓存技术、SEO优化策略、过渡动画，实现良好的SEO优化、提升移动端产品的用户体验。

# 关于移动端优化

- 性能优化（提升访问速度）
  - 首页优化（尽可能减少各种请求；列表数据分批渲染；资源文件尽可能使用CDN加速；列表中图片使用缩略图；页面组件缓存和数据缓存；使用SSR对首页进行服务端渲染。）
  - 图片优化：尽可能使用使用字体icon，图片icon使用精灵图，图片尽可能使用webp格式，在保证精度的前提下尽可能压缩（https://tinify.cn/），图片宽度不要超过640px，使用.png8格式的图片代替.gif图片。
  - 代码优化：尽可能使用异步代码，减少定时器的使用、事件绑定尽可能使用事件委托、列表循环加key、灵活使用v-show和v-if、尽可能使用CSS3动画、尽可能使用ES6语法、防抖节流、减少没必要的DOM/ref操作、Vuex缓存、封装可复用的代码、把复杂运算封装成计算属性。
  - 打包优化：使用路由懒加载切割代码、打包时给文件添加hash后缀、对CSS文件进行合并和压缩、使用babel编译JS并使用压缩工具对脚本进行压缩。

- SEO优化（搜索引擎优化）
  - 在head中，合理地设计<title>、<meta>等标签。
  - 尽可能多地使用静态数据（能写死的文字尽可能写死，比如品类、学科、业务信息。。。）
  - 尽可能多地使用HTML5语义化标签，比如nav、article、footer、header、main、aside等。
  - 动态数据的标签上，尽可以地添加一些有意义的静态的title属性、alt属性、placeholder属性。
  - 网站的尽可能把导航链接设计合理，菜单层级不要太深，还要尽可能地多使用h1~h6标题标签。
  - 网站首页尽可能多放一些“花里胡哨”的信息，这些信息能静态尽量静态。
  - 如果这个ToC产品特别重要，某些重要页面比如首页、业务页面，你可以使用SSR技术来做。

- 用户体验优化
  - 交互开发：合理弹框提示、合理的Toast提示、请求数据添加Loading提示、长列表添加回到顶部等。
  - 数据交互：axios拦截器做统一的数据过滤、对HTTP异常做统一处理，使用Vuex做合理的数据缓存。
  - 代码层面：减少同步的异步代码，减少对回调的使用、对容易报错的代码进行try/catch、合理的严谨的条件判断等。

# 面试题

- 介绍一下你最近做的项目？介绍一下这个项目？
- 详细说一下你这个项目用到了哪些技术栈？
- 说一下你项目中有什么亮点？
- 说一下你项目中遇到过一些什么难点？你是怎么解决的？
- 你封装过哪些有代表性的组件？举两个例子。
- 你做过哪些项目优化？
- 你做过如此SEO优化？
- 你是怎么部署上线的？上线有哪些注意的？
- 你这个项目的鉴权是怎么做？
- 除了以上这些常问的题目，还会问一些场景题。
