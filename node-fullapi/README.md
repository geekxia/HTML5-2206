# 安装MongoDB数据库软件

- 软件版本：mongodb-5.0.9.msi

- 软件安装步骤
  - 双击安装
  - 选择Custom安装模式，自定义安装到你的电脑 D:\MongoDB 目录
  - 取消打勾“安装MongoDB Compass”
  - 在安装过程遇到提示说“MongoDB启动失败”，点击“Ignore”即可
  - 点击“Finish”

- 配置环境变量
  - 在电脑图标右键打开属性
  - 选择高级系统设置
  - 选择环境变量
  - 在“Path”字段上双击、打开环境变量的编辑容口
  - 点击“新建”，输入 D:\MongoDB\bin
  - 然后一步步点击“确定”即可

- 测试是否安装成功
  - 打开 D:\MongoDB，检查其中是否有文件
  - 打开命令行，输出 mongo，看是否有版本号打印

- 如何手动启动MongoDB服务
  - 在命令行输入：mongod --dbpath "D:\MongoDB\data"
  - MongoDB服务启动成功后，命令行容口不要关闭
  - 打开新的命令行输入：mongo （命令行连接MongoDB服务）

# 安装Robo3T可视化工具

- 软件版本：studio-3t.exe

- 安装步骤
  - 双击安装
  - 选择你的安装目录：D:\Robo3T
  - 下一步直到成功
  - 如果安装成功，在你的电脑桌面有一个Robo3T图标

- 如何使用Robo3T呢？
  - 先启动MongoDB数据库服务 `mongod --dbpath "D:\MongoDB\data"`
  - 双击Robo3T图标、打开软件
  - 如果出现注册界面，你就随便注册一下
  - 在弹框界面中添加或选择“27017连接记录”
  - 点击“connect”确定连接
  - 在左侧界面能够看到三个默认的数据库，即是成功。

# 项目目录介绍

- README.md（运行说明、打包说明、业务性的坑、Bug列表。。）
- package.json（依赖、运行命令）
- app.js 入口文件
  - 连接数据库的 connect.j s代码（你可以修改数据库名字）
  - 在Robo3T中手动创建对应的数据库
- public 目录，静态资源目录，使用 localhost:9999/* 可访问它们
- utils 目录，放置工具方法
  - connect.js 使用mongoose驱动模块连接MongoDB数据服务器的逻辑
  - jwt.js 使用jsonwebtoken这个包，生成token、验证token的逻辑
- middlewares 目录，放置中间件逻辑的
  - checkToken.js 用于解析验证token的中间件
- routes 目录，定义API接口的地方
  - webapp.js 是咱们Vue webapp的接口（今天只用看这个）
  - element.js 是咱们Vue 管理系统项目的接口
  - react.js 是咱们React 管理系统项目的接口
- controllers 目录，编写API接口的逻辑
  - webapp/user.js 是注册逻辑、登录逻辑
  - webapp/good.js 是商品接口逻辑
  - webapp/cart.js 是购物车中的增删改查接口逻辑
  - system 目录，是管理系统中要用到的接口逻辑
- models 目录，封装的是操作MongoDB集合的模型
  - 这里有四个集合，查询这四个文件，可以用于设计你自己的集合数据
  - 造假数据，可以参考这里的数据结构。
- 如何启动node-fullapi服务？
  ```
  # 启动MongoDB服务
  mongod --dbpath "D:\MongoDB\data"   
  ```
  ```
  cnpm install  安装依赖包
  npm start     启动node服务
  ```
- 在Robo3T中造假数据，一定要参考models目录的数据结构。

# 编写接口文档

- baseURL: http://localhost:9999
- version: /api/v1/vant

- POST /user/regist
  - 描述：用于webapp端的用户注册
  - 入参：{ username:'lisi', password:'123456' }
  - 出参：{ err: 0, msg: '注册成功', data: { username } }

- POST /user/login
  - 描述：用于webapp端的用户登录
  - 入参：{ username:'lisi', password:'123456' }
  - 出参：{ err: 0, msg: '登录成功', data: { token }}


# 六个步骤启动Node项目

- 第一步：启动MongoDB数据库服务（mongod --dbpath "D:\MongoDB\data"）。（怎么验证我的数据库服务启动是成功的呢？）

- 第二步：双击运行Studio3T，连接MongoDB数据库服务。（左侧面板出现了三个数据库）

- 第三步：在Studio3T左侧面板，创建一个名字叫 qfdb 的数据库。

- 第四步：在码云中拿到最新node-fullapi项目，在其根目录中安装依赖，安装完成后 npm start 启动Node程序。

- 第五步：在Studio3T中，选中qfdb这个数据库，创建一个名字叫 goods 集合（表），然后向这个表中插入假数据（假数据参考node-fullapi项目根目录中的 GOOD.md）

- 第六步：在浏览器地址栏中 http://localhost:9999/api/v1/vant/good/list，如果有数据表示上面的工作都是对的。