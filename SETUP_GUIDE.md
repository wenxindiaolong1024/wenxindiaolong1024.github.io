# 项目安装与配置指南

> 更新时间：2026-02-15
> 项目已优化为使用 pnpm + React 18 稳定版

---

## 📋 前置要求

### 必需软件

| 软件 | 版本要求 | 说明 |
|------|---------|------|
| **Node.js** | >= 18.0.0 | 推荐使用 20.11.0 LTS |
| **pnpm** | >= 8.0.0 | 推荐使用 9.15.4+ |

---

## 🚀 快速开始

### 方法一：使用 pnpm（推荐）

#### 1. 安装 pnpm

```bash
# 使用 npm 安装 pnpm
npm install -g pnpm

# 或使用 Homebrew (macOS)
brew install pnpm

# 验证安装
pnpm --version
```

#### 2. 使用 nvm 切换 Node.js 版本（推荐）

项目包含 [.nvmrc](.nvmrc) 文件，指定了推荐的 Node.js 版本。

```bash
# 如果还没安装 nvm
# macOS/Linux:
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# 使用项目指定的 Node.js 版本
nvm use

# 如果版本未安装，会提示安装：
nvm install
```

#### 3. 克隆项目并安装依赖

```bash
# 克隆项目
git clone ssh://git@git.unisase.cn:10022/skylab/website_v2.git
cd website_v2

# 安装依赖
pnpm install
```

#### 4. 配置环境变量

```bash
# 复制环境变量模板
cp .env.example .env.local

# 编辑 .env.local，根据需要修改配置
# 使用你喜欢的编辑器打开，例如：
code .env.local  # VS Code
vim .env.local   # Vim
```

#### 5. 启动开发服务器

```bash
pnpm dev
```

访问 http://localhost:5173

---

### 方法二：使用 npm（传统方式）

```bash
# 克隆项目
git clone ssh://git@git.unisase.cn:10022/skylab/website_v2.git
cd website_v2

# 安装依赖
npm install

# 配置环境变量
cp .env.example .env.local

# 启动开发服务器
npm run dev
```

**注意**：虽然可以使用 npm，但推荐使用 pnpm 以获得更好的性能。

---

## 📝 可用命令

### 开发命令

```bash
# 启动开发服务器（热重载）
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
# 运行 ESLint 检查
pnpm lint

# 自动修复 ESLint 问题
pnpm lint:fix

# TypeScript 类型检查
pnpm type-check

# 格式化代码（Prettier）
pnpm format
```

### 测试

```bash
# 运行测试
pnpm test

# 测试 UI 界面
pnpm test:ui

# 生成测试覆盖率报告
pnpm test:coverage
```

---

## 🔧 依赖版本说明

本项目已优化依赖版本，使用稳定、成熟的技术栈：

### 核心框架
- ✅ **React 18.3.1** - 稳定版本，生态系统完全成熟
- ✅ **React DOM 18.3.1** - 配套版本
- ✅ **Vite 7.2.4** - 最新构建工具，极快的开发体验
- ✅ **TypeScript 5.9.3** - 严格类型检查

### UI 框架
- ✅ **Tailwind CSS 3.4.19** - 原子化 CSS 框架
- ✅ **Radix UI** - 无障碍、可定制的组件库
- ✅ **Lucide React** - 美观的图标库

### 表单与验证
- ✅ **React Hook Form 7.70.0** - 高性能表单管理
- ✅ **Zod 3.23.8** - TypeScript 优先的 schema 验证

### 为什么降级到 React 18？

虽然 React 19 已发布，但为了确保：
- ✅ **稳定性**：React 18 生态系统完全成熟
- ✅ **兼容性**：所有第三方库都完全支持
- ✅ **生产就绪**：无潜在兼容性风险

未来可以在验证兼容性后升级到 React 19。

---

## 🎯 pnpm 优势

相比 npm/yarn，pnpm 提供：

### 1. 更快的安装速度

```bash
# 初次安装
pnpm install  # 比 npm install 快 2-3 倍

# 后续安装（有缓存）
pnpm install  # 快 3-5 倍
```

### 2. 节省磁盘空间

- **符号链接机制**：所有依赖只存储一次
- **共享存储**：多个项目共享相同的依赖
- **节省 50-70% 磁盘空间**

### 3. 更严格的依赖管理

- **幽灵依赖检测**：防止使用未声明的依赖
- **扁平化控制**：更可预测的 node_modules 结构

### 4. 工作区支持

如果将来需要 monorepo：

```yaml
# pnpm-workspace.yaml
packages:
  - 'packages/*'
  - 'apps/*'
```

---

## ⚙️ 配置文件说明

### .nvmrc
```
20.11.0
```
指定项目使用的 Node.js 版本。团队成员使用 `nvm use` 即可切换。

### .npmrc
```ini
shamefully-hoist=true          # 提升依赖，兼容部分工具
strict-peer-dependencies=false # 不严格检查 peer 依赖
auto-install-peers=true        # 自动安装 peer 依赖
prefer-offline=true            # 优先使用缓存
store-dir=~/.pnpm-store        # 全局存储目录
```

### .prettierrc
```json
{
  "semi": true,
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2
}
```

代码格式化配置，运行 `pnpm format` 使用。

---

## 🐛 常见问题

### Q1: 安装依赖时出现 peer dependency 警告

**解决方案**：
```bash
# pnpm 配置为自动安装 peer 依赖
# 如果还有警告，可以忽略（已配置 strict-peer-dependencies=false）
```

### Q2: Node.js 版本不对

**解决方案**：
```bash
# 使用 nvm 切换版本
nvm use

# 如果提示版本未安装
nvm install 20.11.0
nvm use 20.11.0
```

### Q3: pnpm 命令找不到

**解决方案**：
```bash
# 重新安装 pnpm
npm install -g pnpm@latest

# 验证安装
pnpm --version
```

### Q4: TypeScript 类型错误

**解决方案**：
```bash
# 确保已安装依赖
pnpm install

# 重新构建类型
rm -rf node_modules/.vite
pnpm type-check
```

### Q5: 环境变量不生效

**解决方案**：
```bash
# 确保创建了 .env.local
cp .env.example .env.local

# 重启开发服务器
pnpm dev
```

### Q6: 想切换回 npm

**解决方案**：
```bash
# 删除 pnpm 相关文件
rm -rf node_modules pnpm-lock.yaml

# 使用 npm 安装
npm install

# 继续使用 npm 命令
npm run dev
```

---

## 🔄 升级依赖

### 检查过期依赖

```bash
# 使用 pnpm
pnpm outdated

# 或使用 npm
npm outdated
```

### 更新依赖

```bash
# 交互式更新（推荐）
pnpm update --interactive

# 更新所有依赖到最新兼容版本
pnpm update

# 更新特定依赖
pnpm update react react-dom
```

### 安全更新

```bash
# 检查安全漏洞
pnpm audit

# 自动修复安全问题
pnpm audit --fix
```

---

## 📦 生产部署

### 1. 构建生产版本

```bash
# 清理旧文件
pnpm clean

# 重新安装依赖
pnpm install

# 类型检查
pnpm type-check

# 代码检查
pnpm lint

# 构建
pnpm build
```

### 2. 预览构建结果

```bash
pnpm preview
```

访问 http://localhost:4173

### 3. 部署 dist/ 目录

将 `dist/` 目录部署到：
- 静态托管服务（Vercel、Netlify、GitHub Pages）
- CDN（阿里云 OSS、腾讯云 COS）
- 自建服务器（Nginx、Apache）

### 示例：Nginx 配置

```nginx
server {
    listen 80;
    server_name unisase.cn;
    root /var/www/unisase_website/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # 缓存静态资源
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

---

## 🔗 相关文档

- [README.md](README.md) - 项目说明
- [OPTIMIZATION_CHECKLIST.md](OPTIMIZATION_CHECKLIST.md) - 优化清单
- [IMAGE_OPTIMIZATION_GUIDE.md](IMAGE_OPTIMIZATION_GUIDE.md) - 图片优化指南
- [DEPENDENCY_ANALYSIS.md](DEPENDENCY_ANALYSIS.md) - 依赖分析报告
- [.env.example](.env.example) - 环境变量模板

---

## 📞 获取帮助

如果遇到问题：

1. 查看本文档的常见问题部分
2. 查看 [README.md](README.md) 中的项目说明
3. 联系团队技术支持：business@unisase.cn

---

**Happy Coding! 🎉**
