# UniSASE 官网

安信道合（北京）科技发展有限公司官方网站 - 坚如磐石的网络与安全服务提供商。

## 📋 项目简介

本项目是 UniSASE（磐络）产品的官方展示网站，采用现代化的技术栈构建，提供产品介绍、解决方案、资源下载和公司信息等内容。

## 🚀 技术栈

- **框架**: React 18.3.1（稳定版）
- **构建工具**: Vite 7.2.4
- **语言**: TypeScript 5.9.3
- **样式**: Tailwind CSS 3.4.19
- **UI 组件**: Radix UI
- **图标**: Lucide React
- **测试**: Vitest + Testing Library
- **包管理器**: pnpm 9.15.4+（推荐）

## 📦 环境要求

- **Node.js**: >= 18.0.0（推荐 20.11.0 LTS）
- **pnpm**: >= 8.0.0（推荐 9.15.4+）
- **可选**: nvm（Node 版本管理）

## 🔧 安装与启动

> 💡 **推荐使用 pnpm** - 更快的安装速度，节省 50-70% 磁盘空间。详见 [SETUP_GUIDE.md](SETUP_GUIDE.md)

### 快速开始

#### 使用 pnpm（推荐）

```bash
# 1. 安装 pnpm（如果还没有）
npm install -g pnpm

# 2. 克隆项目
git clone ssh://git@git.unisase.cn:10022/skylab/website_v2.git
cd website_v2

# 3. 使用项目推荐的 Node.js 版本（需要先安装 nvm）
nvm use

# 4. 安装依赖
pnpm install

# 5. 配置环境变量
cp .env.example .env.local

# 6. 启动开发服务器
pnpm dev
```

#### 使用 npm（传统方式）

```bash
# 1. 克隆项目
git clone ssh://git@git.unisase.cn:10022/skylab/website_v2.git
cd website_v2

# 2. 安装依赖
npm install

# 3. 配置环境变量
cp .env.example .env.local

# 4. 启动开发服务器
npm run dev
```

### 环境变量配置

环境变量说明：

```env
# 应用配置
VITE_APP_TITLE=安信道合 UniSASE

# 下载链接
VITE_DOWNLOAD_WINDOWS_URL=https://download.gsase.com/app/unimobile/windows/UniMobile.exe
VITE_DOWNLOAD_MAC_URL=https://apps.apple.com/app/id6753884805
VITE_DOWNLOAD_IOS_URL=https://apps.apple.com/app/id6753885045
VITE_DOWNLOAD_ANDROID_URL=https://download.gsase.com/app/unimobile/android/UniMobile.apk

# 外部链接
VITE_BEIAN_URL=https://beian.miit.gov.cn/#/Integrated/index
VITE_PRIVACY_POLICY_URL=https://www.unisase.cn/privacy_policy_en

# 百度地图配置
VITE_BAIDU_MAP_LOCATION=40.05880,116.37
VITE_COMPANY_NAME=安信道合（北京）科技发展有限公司
VITE_COMPANY_ADDRESS=北京市海淀区东升科技园北街2号院5号楼10层101
```

访问 http://localhost:5173

## 📝 可用脚本

### 开发命令

```bash
# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 预览生产构建
pnpm preview

# 清理构建产物和缓存
pnpm clean
```

### 代码质量

```bash
# 代码检查
pnpm lint

# 自动修复代码问题
pnpm lint:fix

# TypeScript 类型检查
pnpm type-check

# 格式化代码
pnpm format
```

### 测试

```bash
# 运行测试
pnpm test

# 测试 UI 界面
pnpm test:ui

# 测试覆盖率
pnpm test:coverage
```

**注意**: 如果使用 npm，将 `pnpm` 替换为 `npm run`

## 📁 项目结构

```
unisase_website/
├── public/                 # 静态资源
│   ├── *.png              # 图片文件
│   ├── *.jpg              # 图片文件
│   └── *.pdf              # 文档文件
├── src/
│   ├── components/        # UI 组件
│   │   └── ui/           # Radix UI 组件封装
│   ├── hooks/            # 自定义 Hooks
│   ├── lib/              # 工具函数
│   ├── sections/         # 页面区块组件
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── Features.tsx
│   │   ├── Architecture.tsx
│   │   ├── Footer.tsx
│   │   ├── HomePage.tsx
│   │   ├── PlatformPage.tsx
│   │   ├── SolutionsPage.tsx
│   │   ├── ResourcesPage.tsx
│   │   └── CompanyPage.tsx
│   ├── test/             # 测试配置
│   ├── App.tsx           # 主应用组件
│   ├── main.tsx          # 入口文件
│   ├── index.css         # 全局样式
│   └── vite-env.d.ts     # 环境变量类型定义
├── .gitignore            # Git 忽略文件
├── .env.example          # 环境变量示例
├── eslint.config.js      # ESLint 配置
├── tailwind.config.js    # Tailwind CSS 配置
├── postcss.config.js     # PostCSS 配置
├── tsconfig.json         # TypeScript 配置
├── tsconfig.node.json    # Node TypeScript 配置
├── vite.config.ts        # Vite 配置
└── package.json          # 项目配置
```

## 🎨 开发说明

### 代码风格

项目使用 ESLint 和 TypeScript 进行代码质量控制。在提交代码前请确保：

```bash
# 运行 lint 检查
npm run lint

# 运行类型检查
npx tsc --noEmit
```

### 添加新页面

1. 在 `src/sections/` 创建新组件
2. 在 `App.tsx` 中导入并添加到路由
3. 在 `Navbar.tsx` 和 `Footer.tsx` 中添加导航链接

### 图片资源规范

- **格式**: 优先使用 WebP > JPEG > PNG
- **尺寸**: 宽度不超过 1920px
- **大小**: 单文件不超过 500KB
- **命名**: 使用小写字母和连字符，如 `hero-dashboard.png`

上传新图片前请使用压缩工具（如 TinyPNG、Squoosh）进行优化。

## 🧪 测试

```bash
# 运行所有测试
npm run test

# 监听模式运行测试
npm run test -- --watch

# 生成覆盖率报告
npm run test:coverage

# 启动测试 UI
npm run test:ui
```

## 🏗️ 构建与部署

### 构建

```bash
npm run build
```

构建产物将输出到 `dist/` 目录。

### 预览构建

```bash
npm run preview
```

### 部署

1. 确保所有环境变量配置正确
2. 运行构建命令
3. 将 `dist/` 目录部署到服务器或 CDN

**注意**: `dist/` 目录已添加到 `.gitignore`，不应提交到版本控制。

## 📄 许可证

Copyright © 2025 安信道合（北京）科技发展有限公司. All rights reserved.

## 🤝 贡献指南

1. Fork 本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

## 📞 联系方式

- **商务邮箱**: business@unisase.cn
- **公司地址**: 北京市海淀区东升科技园北街2号院5号楼10层101
- **备案号**: 京ICP备2025109513号

## 🔗 相关链接

- [UniSASE 官网](https://www.unisase.cn)
- [隐私政策](https://www.unisase.cn/privacy_policy_en)

---

由 ❤️ 使用 React + Vite + TypeScript 构建
