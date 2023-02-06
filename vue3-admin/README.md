# 一、导学（生态、文档、学习路径）

- 两个时间：2020年9月（Vue3、TS）  2022年春节（Vue3正式发布）

- 1、Vue3官网：https://vuejs.org/
- 2、VueRouter(V4)：https://router.vuejs.org/
- 3、Pinia(V2)：https://pinia.vuejs.org/
- 4、Vite构建工具：https://vitejs.dev/
- 5、ElementPlus：https://element-plus.gitee.io/zh-CN/
- 6、Vant(v3)：https://vant-contrib.gitee.io/vant/#/zh-CN

- 技术栈：Vue3+VueRouter4+Pinia2+Vant3/ElementPlus


# 二、搭建环境

- 一、搭建环境的两种方式：@vue/cli、vite（推荐）
  ```
  yarn create vite vue3-admin --template vue-ts
  cd vue3-admin
  yarn
  npm run dev / yarn dev
  ```

- 二、目录分析
  - vite.config.js 是Vite官方配置文件，各种配置参考Vite官网。
  - tsconfig.json  是TypeScript的配置文件
  - index.html  是SPA挂载的根页面
  - xxx.d.ts 是TypeScript的声明文件
  - main.ts  是入口文件
  - App.vue  是根组件（SFC单文件组织）

- 三、VScode编辑器
  - 在VScode中支持SFC高亮和TS检测：安装 volar插件
  - 在VScode中支持中文提示：安装 Chinese中文插件

- 四、在Vue3中关于SFC的若干变化：
  - 支持多个style标签、支持多个script标签、template支持多个根节点
  - 在<script lang='ts'></script>
  - 在style标签中，可以使用  v-bind指令。

# 三、两种语法范式

- 选项式：完成支持Vue2写法、可以使用setup()+选项式写法，还可以只使用setup()选项式写法。
- 组合式：在<script setup>，只支持组合式写法，规避选项式写法。

- 注意：对Vue3开发者，要有能力在这两种写法之间灵活切换语法。

# 四、Vue3最重要的特性

- 开发思想的变化：Vue3通过使用组合API，可以方便地封装Hooks，分离组件中的“逻辑关注点”。
- 具体怎么实践这种思想？第一步，用组合API替换掉传统的选项写法；第二步，梳理逻辑关注点封装自定义Hooks。

- 自定义Hooks有几个需要注意的问题：自定义Hooks一定要以use*开头，自定义Hooks可以被复用，自定义Hooks不要过度与泛滥。
- 思考：组件封装 与 Hooks封装，有什么本质的区别？前者是视图结构的封装，后者是逻辑功能的封装。

# 五、组合API详解

- ref / reactive / watch / computed / watchEffect
- toRefs
- onMounted / onBeforeUnmount / onActivated / onDeactivated
- 其它的组合API都是面试题

- 坑：provide / inject 用setup语法糖组合时是有响应式的，如果用选项式写法是没有响应式的（需要使用computed包裹一层）

# 六、Vue3变化的若干细节

- 一、移除了哪些？
  - $children移除了（注意$parent还在）
  - new Vue({ data:{} }) 这个写法淘汰了，如果用到data一定要使用工厂函数。
  - 移除了 $on / $off / $once （注意$emit还在）
  - 在V3中，事件总线这种通信这种基于订阅发布模式的通信方案也不能用了。
  - 移除了全局过滤器（Vue.filter）、移除了局部过滤器 filters选项。
  - 在V3中，Vue这个构造函数不能用了，所以像V2中的那个全局API都不能了，所以Vue的原型链也不能用了。
  - 在V3中，不再支持修改键盘码了。
  - 移除了$listeners （注意$attrs还在）
  - 移除了 el选项、model选项、propsData选项。。。
  - v-on的.native修饰符已被移除。

- 二、新增了哪些？
  - 在V3中，增加了 emits选项、defineEmits，用于在子组件中接收自定义事件。
  - 在组件中，使用 getCurrentInstance 可以访问 app根实例。
  - 新增了 <suspense>，用于给异步组件添加交互效果。
  - 新增了 <teleport to>，用于把包裹的视图结构“穿梭”到父级的DOM节点中去。
  - 新增了样式的玩法，第一个玩法是在<style>中可以使用v-bind来做动态样式；在<style module='default'>实现样式模块化，在组合中使用useCssModule访问样式模块。
  - 新增了一个指令 v-memo，用法 <div v-memo='[a,b]'></div>，有且仅有当a或b变化时，其包裹的视图结构才会更新。
  - 在V3中，新增了 useSlots，用于在子组件中访问插槽实例。相当于V2中的this.$slots。


- 三、变化了哪些？
  - 在V2中，v-for和ref一起作用，可以自动收集refs对象，在this.$refs上访问。在V3中，不能自动收集了，需要自己封装收集方法，<v-for :ref='collect'>。
  - 在V2中，ref属性作用在HTML标签或组件上，可以在this.$refs上访问DOM或组件实例；在V3中，ref属性配合ref这个组合API为完成对DOM或组件实例的方法，<div ref='box'>，这个box是一个ref对象，使用box.value访问对应的DOM。
  - 在V3中，使用 defineAsyncComponent 定义更加友好的异步组件。
  - 在V2中，使用this.$attrs访问父组件传递过来的属性们（不包括class和style）；在V3中，使用useAttrs/context.attrs/$attrs访问父组件传递过来的自定义属性们（包含class和style）。
  - 在V3中，使用 app.directive({}/fn) 自定义指令，注意在指令的选项钩了发生了若干变化。
  - 在V3中，template视图模块支持多节点。（当在自定义组件上使用class/style时、在自定义组件上使用多个v-model时，都报了多节点的警告，这时建议将其改成单一根节点）
  - 在V2中，provide/inject是没有响应式的。在V3中，provide用选项写法时，必须配合computed才能实现响应式；provide用组合写法时，默认就有响应式。
  - 在V2中，Vue.nextTick() / this.$nextTick 不能支持 Webpack 的 Tree-Shaking 功能的。在 V3 中的 nextTick ，考虑到了对 Tree-Shaking 的支持。
  - V3中，对于 v-if/v-else/v-else-if的各分支项，无须再手动绑定 key了， V3会自动生成唯一的key。比如<transition>对多节点执行动画时，无须再加key了。
  - 在V3中，render选项的函数参数不再是h函数了，如果要使用h函数，得从vue导入。
  - <transition>过渡动画的变化：v-enter-from/v-enter-active/v-enter-to和V2不同了；对多节点执行显示与隐藏时，不需要再加key了。当我们封装自定义组件时，如果<transition>是这个组件的根节点，要使用props传值来触发动画。
  - 同一节点上使用 v-for 和 v-if ，在V2中不推荐这么用，且v-for优先级更高。在V3中，这种写法是允许的，但 v-if 的优秀级更高。
  - watch这个组合API：允许同时监听多个变量的变化，允许停止监听。const stop = watch([a,b], callback)
  - 在V3中，使用defineProps接收自定义属性时，如果这个属性是对象类型，其default: () => { return }，并且在这个default工厂函数中可以使用inject。
  - v-model有三个变化，在自定义组件上v-model = :modelValue + @update:modelValue， v-model:name = :name + @update:name；在自定义组件上，可以同时使用多个v-model，<People v-model='age' v-model:name='name' />；还支持自定义修饰符，注意在子组件中必须使用defineProps来分别接收自定义修饰符。


# 七、VueRouter(V4)

- 一、如何使用路由V4？
  - 第1步：安装vue-router(v4)并创建路由实例，在main.js注册。
  - 第2步：编写路由规则 { path, component, children, meta, props, name, alias, redirect }
  - 第3步：使用 <router-view>显示匹配成功的页面组件，使用<router-link>设计菜单导航。

- 二、路由V4对比V3有哪些细节变化？（8条）

  - 在vue3环境中，必须要使用vue-router(v4)
  - 创建router实例的方式变了，使用 const router = createRouter({history, routes:[]})
  - 指定路由模式的属性变了，使用history属性：createWebHashHistory() / createWebHistory()
  - 路由注册，在mian.js中 app.use(router)
  - 如果是选项式组件，this.$router/this.$route可以正常使用；如果是组合式API进行开发，必须使用 useRoute、userRouter等Hooks API进行开发。
  - <router-link>已经没有tag属性的，可以用custom和插槽实现自定义渲染。
  - <router-view>新增了"插槽"功能，极其强大，参见路由文档中的伪代码，它在实现<keep-alive>和<transition>动画将变得更简单，还可以Suspense实现Loading。
  - 新增了几个组合API：useRoute / useRouter / useLink。
  - 在V4中，淘汰了router.addRoutes()，只保留了 router.addRoute()，用于实现动态权限路由设计。


# 八、ElementPlus入门使用

- 参考文档, 建议翻一翻,写一写.

# 九、Pinia(V2)

- 一、Pinia简介
  - Pinia(V2)，是Vuex的下一版本，在Vue2和Vue3中都能用。
  - Pinia支持多store开发，可以非常自由地组织"状态管理"的数据流逻辑。
  - Pinia对Hooks编程思想非常友好，它对TS也非常友好。
  - 如果你想学习更多，去看官网和社区。

- 二、如何集成pinia这个状态管理工具？
  - 安装，创建pinia实例，注册app.use(pinia)

- 三、pinia学习哪些内容？
  - createPinia() 用于创建pinia实例
  - defineStore('storeId', { state, getters, actions }) 会定义store, 每个store都一个以use*开头的Hooks函数, state必须是工厂函数, getters不仅可以对state进行计算,还可以另一个getters进行计算, actions不仅可以编写同步方法,还可以编写异步逻辑.
  - 怎么修饰store中的state? 可以使用 $patch({})进行批量修改, 还可以调用actions方法来修改.
  - 怎么重置store中的state? 使用$reset() 方法重置store.
  - 如何监听store中的state的变化? 使用$subscribe((mutations,state)=>{})进行监听. 监听是一个副作用, 建议放在watchEffect中.
  - 如何测量actions方法的执行时间? 使用$onAction(({name,after})=>{})
  - 警告: 如果你对store进行解构, 响应式会失效, 使用 storeToRefs包裹一层即可.

# 十、扩展理解

- 响应式原理
- 虚拟DOM与Diff运算
- Vite构建工具
