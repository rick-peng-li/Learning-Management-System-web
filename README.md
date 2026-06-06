<!-- 项目 Git 地址：git@github.com:rick-peng-li/Learning-Management-System-web.git -->

# Learning-Management-System-web

一个基于 MERN 技术栈实现的学习管理系统（LMS）Web 项目，包含前端学员端/教师端/管理端页面，以及后端认证、课程、选课、用户管理等接口能力。项目适合作为全栈课程项目、权限系统实践和 React + Node.js + MongoDB 的综合示例。

## 项目简介

本项目围绕在线课程平台的核心流程展开，覆盖用户注册登录、课程展示、课程发布、学员选课、角色化后台等常见场景。

当前系统内置 3 类角色：

- Student：浏览课程、报名课程、查看个人学习面板
- Teacher：发布课程、查看用户数据、进入教师控制台
- Admin：查看平台用户数据、进行全局管理

同时项目还提供忘记密码与重置密码流程，方便演示基于 JWT 的认证和用户状态管理。

## 功能概览

- 用户注册、登录、退出登录
- 基于 JWT 的身份认证
- 基于角色的访问控制（Student / Teacher / Admin）
- 课程列表展示
- 学员报名课程
- 教师发布课程
- 学员查看已报名课程与教师列表
- 管理员查看用户列表
- 忘记密码与重置密码

## 技术架构

### 整体架构

项目采用前后端分离结构：

- frontend：基于 React + Vite 的单页应用
- backend：基于 Node.js + Express 的 REST API 服务
- database：基于 MongoDB 的文档型数据存储

请求流转关系如下：

- 浏览器访问前端页面
- 前端通过 fetch 调用后端 `/api/*` 接口
- 后端通过 Express 路由进入控制器
- 控制器结合 Mongoose 模型访问 MongoDB
- 认证接口通过 JWT 完成登录态校验

### 前端技术栈

- React 19
- Vite 8
- React Router DOM 7
- Tailwind CSS 4
- Lucide React
- ESLint 9

### 后端技术栈

- Node.js
- Express 5
- MongoDB
- Mongoose
- jsonwebtoken
- bcryptjs
- dotenv
- cors
- nodemon

## 目录结构

```text
Learning-Management-System-web
├─ backend
│  ├─ config
│  ├─ controllers
│  ├─ middleware
│  ├─ models
│  ├─ routes
│  ├─ package.json
│  └─ server.js
├─ frontend
│  ├─ public
│  ├─ src
│  │  ├─ components
│  │  ├─ pages
│  │  ├─ App.jsx
│  │  └─ main.jsx
│  └─ package.json
├─ .gitignore
└─ README.md
```

## 核心模块说明

### 前端模块

- `src/pages/Home.jsx`：首页与课程列表展示
- `src/pages/Login.jsx` / `Register.jsx`：注册登录流程
- `src/pages/ForgotPassword.jsx` / `ResetPassword.jsx`：密码找回与重置
- `src/pages/StudentDashboard.jsx`：学员控制台
- `src/pages/TeacherDashboard.jsx`：教师控制台与发课能力
- `src/pages/AdminDashboard.jsx`：管理员控制台
- `src/components/Navbar.jsx` / `Footer.jsx`：全局导航与底部布局

### 后端模块

- `routes/authRoutes.js`：认证相关接口
- `routes/courseRoutes.js`：课程查询与创建接口
- `routes/enrollmentRoutes.js`：报名与我的课程接口
- `routes/userRoutes.js`：用户与教师列表接口
- `middleware/authMiddleware.js`：登录鉴权与角色校验
- `models/User.js`：用户模型，包含角色字段
- `models/Course.js`：课程模型
- `models/Enrollment.js`：选课模型

## 环境要求

建议本地环境满足以下条件：

- Node.js 18 或更高版本
- npm 9 或更高版本
- MongoDB 本地实例或 MongoDB Atlas

## 环境变量

### 后端 `backend/.env`

后端启动前需要创建 `backend/.env` 文件：

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/lms_db
JWT_SECRET=your_jwt_secret
```

字段说明：

- `PORT`：后端服务端口，默认 5000
- `MONGO_URI`：MongoDB 连接地址
- `JWT_SECRET`：JWT 签名密钥

### 前端 `frontend/.env`

前端默认会请求 `http://localhost:5000`，如果需要自定义后端地址，可以创建 `frontend/.env`：

```env
VITE_API_URL=http://localhost:5000
```

## 启动方式

### 1. 获取代码

```bash
git clone git@github.com:rick-peng-li/Learning-Management-System-web.git
cd Learning-Management-System-web
```

### 2. 启动后端

```bash
cd backend
npm install
npm run dev
```

默认启动后端接口服务：

- 服务地址：`http://localhost:5000`
- 根路径测试：`http://localhost:5000/`

### 3. 启动前端

新开一个终端执行：

```bash
cd frontend
npm install
npm run dev
```

启动后通常可在本地访问：

- 前端页面：`http://localhost:5173`

## 常用脚本

### backend

```bash
npm run dev
npm start
```

- `npm run dev`：使用 nodemon 启动开发服务
- `npm start`：使用 node 启动生产方式服务

### frontend

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

- `npm run dev`：启动 Vite 开发服务
- `npm run build`：构建前端产物
- `npm run preview`：本地预览构建结果
- `npm run lint`：执行 ESLint 检查

## 角色与权限说明

| 角色 | 主要能力 |
| --- | --- |
| Student | 浏览课程、报名课程、查看我的课程与教师列表 |
| Teacher | 发布课程、查看用户数据、进入教师面板 |
| Admin | 查看平台用户列表、执行后台管理操作 |

## 接口模块概览

后端接口统一以 `/api` 为前缀，主要分为以下几类：

- `/api/auth`：注册、登录、忘记密码、重置密码
- `/api/courses`：获取课程列表、教师创建课程
- `/api/enrollments`：课程报名、获取我的课程
- `/api/users`：获取用户列表、获取教师列表

## 开发说明

- 前端通过 `localStorage` 保存用户 token 和用户信息
- 前端接口地址支持通过 `VITE_API_URL` 配置覆盖
- 后端通过中间件完成鉴权与角色校验
- 数据层使用 Mongoose 模型管理用户、课程和报名记录

## 适用场景

- React + Node.js 全栈练习项目
- JWT 鉴权与 RBAC 权限控制学习
- MongoDB 数据建模与接口设计示例
- 在线教育平台原型开发
