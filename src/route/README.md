└── routes               # 主路由和异步分割点
│       ├── index.js         # 用store启动主程序路由
│       ├── Root.js          # 为上下文providers包住组件
│       └── Home             # 不规则路由
│           ├── index.js     # 路由定义和代码异步分割
│           ├── assets       # 组件引入的静态资源
│           ├── components   # 直观React组件
│           ├── container    # 连接actions和store
│           ├── modules      # reducers/constants/actions的集合
│           └── routes **    # 不规则子路由(** 可选择的)
