---
title: 从零搭建博客
description: 详细介绍如何基于本主题从零搭建个人博客，包括安装、配置、部署全流程。
date: 2024-05-10
tags: [教程, 入门]
category: 教程
cover: https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200
---

## 环境准备

确保已安装 [Bun](https://bun.sh)（推荐）或 Node.js 18+。

```bash
# 安装 Bun
curl -fsSL https://bun.sh/install | bash
```

## 创建项目

```bash
# 克隆或初始化项目
git clone <your-repo-url> my-blog
cd my-blog
bun install
```

### 本地开发

```bash
bun dev
```

浏览器打开 `http://localhost:4321`，支持热重载。

### 构建生产版本

```bash
bun run build
```

### 预览生产构建

```bash
bun preview
```

## 配置站点

编辑 `src/consts.ts` 文件，修改以下配置：

```typescript
// 站点基本信息
export const SITE_TITLE = 'My Blog';
export const SITE_DESCRIPTION = '这是我的个人博客';
export const SITE_AUTHOR = 'Your Name';
export const SITE_URL = 'https://example.com';
export const SITE_AVATAR = '/avatar.png';
export const SITE_COVER = '/cover.jpg';

// 每页文章数
export const PAGE_SIZE = 10;

// 导航菜单
export const NAV_ITEMS = [
  { label: '首页', href: '/' },
  { label: '周刊', href: '/weekly' },
  { label: '文章', href: '/archives' },
  { label: '友链', href: '/friends' },
  { label: '关于', href: '/about' },
];

// 社交链接
export const SOCIAL_LINKS = [
  { name: 'GitHub', href: 'https://github.com/yourname', icon: 'github' },
  { name: 'RSS', href: '/rss.xml', icon: 'rss' },
];
```

## 编写文章

在 `src/content/blog/` 目录下创建 `.md` 或 `.mdx` 文件。

### 文章 Frontmatter

```yaml
---
title: 文章标题
description: 文章描述
date: 2024-06-01
tags: [标签1, 标签2]
category: 分类
cover: https://example.com/cover.jpg  # 或 ./images/cover.webp
pinned: false   # 是否置顶
draft: false    # 是否为草稿
---
```

### 文章存放方式

支持两种目录结构：

```
src/content/blog/
├── post-slug.md              # 单文件
└── post-slug/
    ├── index.md              # 目录形式
    └── cover.webp            # 本地图片
```

## 部署

### Vercel

```bash
# 一键部署
vercel
```

### Cloudflare Pages

- 构建命令：`bun run build`
- 输出目录：`dist`

### 其他平台

任何支持静态文件托管的平台可直接部署 `dist/` 目录。

## 自定义主题

编辑 `src/styles/global.css` 中的 CSS 变量来自定义配色：

```css
@theme {
  --color-primary: #e9536a;       /* 主色调 */
  --color-bg-light: #f5f5f5;      /* 浅色背景 */
  --color-bg-dark: #1a1a2e;       /* 深色背景 */
  --color-card-light: #ffffff;    /* 浅色卡片 */
  --color-card-dark: #1e2a45;     /* 深色卡片 */
}
```

修改站点字体：

```css
--font-family-sans: 'Inter', 'Noto Sans SC', sans-serif;
--font-family-mono: 'JetBrains Mono', 'Fira Code', monospace;
```
