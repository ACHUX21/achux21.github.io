# Sify Blog

基于 Astro 6 + Tailwind CSS v4 的现代化博客主题，支持亮色/暗色模式、MDX、数学公式、全站搜索、评论系统。

![Astro](https://img.shields.io/badge/Astro-6.x-BC52EE?logo=astro)
![Tailwind](https://img.shields.io/badge/Tailwind-v4-06B6D4?logo=tailwindcss)
![License](https://img.shields.io/badge/license-MIT-blue)

## 特性

- **Markdown / MDX** — 支持标准 Markdown 和 JSX 内嵌组件
- **KaTeX 数学公式** — 行内与块级 LaTeX 数学公式渲染
- **代码高亮** — Shiki 语法高亮 + 一键复制按钮
- **暗色模式** — 跟随系统偏好 + 手动切换，`localStorage` 持久化
- **全站搜索** — `Ctrl+K` 唤出，匹配标题/正文，高亮显示
- **Waline 评论** — 开箱即用的评论系统
- **友链页面** — 好友链接 + 友链圈文章动态
- **文章封面** — 支持远程 URL 和本地图片
- **RSS 订阅** — 自动生成 `/rss.xml`
- **响应式设计** — 桌面端双栏 + 移动端抽屉侧边栏
- **SEO 优化** — Open Graph、Twitter Card、Canonical URL
- **侧边栏** — 个人信息、分类/标签云、随机推荐

## 技术栈

| 技术 | 用途 |
|------|------|
| [Astro 6](https://astro.build) | 静态站点生成 |
| [Tailwind CSS v4](https://tailwindcss.com) | CSS 框架 |
| [Shiki](https://shiki.style) | 代码语法高亮 |
| [KaTeX](https://katex.org) | 数学公式渲染 |
| [MDX](https://mdxjs.com) | Markdown + JSX |
| [Waline](https://waline.js.org) | 评论系统 |

## 快速开始

### 环境要求

- [Bun](https://bun.sh)（推荐）或 Node.js 18+

### 安装

```bash
git clone <your-repo-url> my-blog
cd my-blog
bun install
```

### 本地开发

```bash
bun dev
```

打开 <http://localhost:4321>，支持热重载。

### 构建

```bash
bun run build
```

输出在 `dist/` 目录。

### 预览生产构建

```bash
bun preview
```

## 配置

编辑 `src/consts.ts`：

```typescript
export const SITE_TITLE = 'Sify Blog';
export const SITE_DESCRIPTION = '一个基于 Astro 的现代化博客主题';
export const SITE_AUTHOR = 'santisify';
export const SITE_URL = 'https://example.com';
export const SITE_AVATAR = '/favicon.svg';
export const SITE_COVER = '/images/cover.jpg';

export const PAGE_SIZE = 10;

export const NAV_ITEMS = [
  { label: '首页', href: '/' },
  { label: '周刊', href: '/weekly' },
  { label: '文章', href: '/archives' },
  { label: '友链', href: '/friends' },
  { label: '关于', href: '/about' },
];

export const SOCIAL_LINKS = [
  { name: 'GitHub', href: 'https://github.com/yourname', icon: 'github' },
  { name: 'RSS', href: '/rss.xml', icon: 'rss' },
];
```

### 自定义主题色

编辑 `src/styles/global.css`：

```css
@theme {
  --color-primary: #e9536a;
  --color-bg-light: #f5f5f5;
  --color-bg-dark: #1a1a2e;
  --color-card-light: #ffffff;
  --color-card-dark: #1e2a45;
}
```

### 自定义字体

```css
--font-family-sans: 'Inter', 'Noto Sans SC', sans-serif;
--font-family-mono: 'JetBrains Mono', 'Fira Code', monospace;
```

## 编写文章

在 `src/content/blog/` 下创建 `.md` 或 `.mdx` 文件。

### Frontmatter

```yaml
---
title: 文章标题
description: 文章描述
date: 2024-06-01
updated: 2024-06-15     # 可选，更新日期
tags: [标签1, 标签2]
category: 分类
cover: ./images/cover.webp  # 远程 URL 或本地相对路径
pinned: false              # 是否置顶
draft: false               # 草稿不入 RSS
---
```

### 目录结构

支持两种方式：

```
src/content/blog/
├── my-post.md              # 单文件（slug: my-post）
└── another-post/
    ├── index.md             # 目录形式（slug: another-post）
    └── cover.webp           # 本地图片
```

### 周刊

在 `src/content/weekly/` 下创建文章，额外需要 `issue` 字段：

```yaml
---
title: 周刊 #1
date: 2024-06-02
tags: [前端]
issue: 1
cover: https://example.com/cover.jpg
---
```

## MDX 与组件

在 MDX 文件中可以 import 并使用自定义 Astro 组件：

```mdx
---
title: MDX 示例
date: 2024-06-01
---

import LinkCard from '../../../components/LinkCard.astro';

<LinkCard
  url="https://astro.build"
  title="Astro 官方文档"
  description="适合内容型网站的全能 web 框架"
/>
```

内置组件：

- `LinkCard` — 外链卡片（`src/components/LinkCard.astro`）

创建新组件：

1. 在 `src/components/` 下创建 `.astro` 文件
2. 在 MDX 文件中 import 使用

## 数学公式

KaTeX 已预配置。在 Markdown 中直接使用 `$...$` 或 `$$...$$`：

```markdown
行内公式：$E = mc^2$

块级公式：
$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$
```

## 评论系统

配置 Waline 评论服务器：

编辑 `src/components/waline/Comment.astro`，修改 `serverURL`：

```typescript
walineInit({
  el: '#waline',
  serverURL: 'https://your-waline-server.com',
  lang: 'zh-CN',
  // ...
});
```

## 友链

编辑 `public/links.json` 添加好友链接：

```json
{
  "friends": [
    {
      "id_name": "cf-links",
      "desc": "好友链接",
      "link_list": [
        {
          "name": "Friend's Blog",
          "link": "https://friend.example.com",
          "avatar": "https://friend.example.com/avatar.jpg",
          "intro": "个人简介"
        }
      ]
    }
  ]
}
```

## 部署

### Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

一键部署，无需额外配置。

### Cloudflare Pages

| 配置项 | 值 |
|--------|-----|
| 构建命令 | `bun run build` |
| 输出目录 | `dist` |

### 其他静态托管

构建后直接将 `dist/` 目录内容上传到任意静态文件服务器。

### 部署前检查

```bash
# 构建
bun run build

# 预览（可选）
bun preview
```

确保以下文件存在：
- `dist/index.html`
- `dist/rss.xml`
- `dist/search-index.json`
- `dist/favicon.svg`

## 目录结构

```
astro-theme-sify/
├── src/
│   ├── components/       # Astro 组件
│   │   └── waline/       # Waline 评论组件
│   ├── content/
│   │   ├── blog/         # 博客文章
│   │   └── weekly/       # 周刊文章
│   ├── layouts/          # 布局组件
│   ├── pages/            # 路由页面
│   └── styles/           # 全局样式
├── public/               # 静态资源
│   └── links.json        # 友链数据
├── astro.config.ts       # Astro 配置
├── src/consts.ts         # 站点配置
├── src/content.config.ts # 内容集合 Schema
└── package.json
```

## License

MIT
