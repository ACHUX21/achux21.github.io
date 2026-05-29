---
title: 欢迎使用 Sify Blog
description: Sify Blog 是一个基于 Astro 构建的现代化博客主题，支持 Markdown/MDX、数学公式、代码高亮、搜索、评论等丰富功能。
date: 2024-06-01
tags: [Astro, 教程]
category: 笔记
pinned: true
cover: https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200
---

## 快速开始

Sify Blog 是一个功能完备的 Astro 博客主题。本文介绍各项功能的快速用法。

[Astro文档](https://astro.build)

### 安装运行

```bash
bun install
bun dev
```

打开 `http://localhost:4321` 即可预览。

### 配置站点信息

编辑 `src/consts.ts` 修改站点标题、描述、头像、社交链接等基本信息：

```typescript
export const SITE_TITLE = 'Sify Blog';
export const SITE_DESCRIPTION = '一个基于 Astro 的现代化博客主题';
export const SITE_AUTHOR = 'santisify';
```

## 特性一览

| 特性 | 说明 |
|------|------|
| Markdown / MDX | 支持标准 Markdown 和 JSX 组件 |
| 数学公式 | KaTeX 渲染行内和块级公式 |
| 代码高亮 | Shiki 主题，复制按钮 |
| 暗色模式 | 跟随系统 + 手动切换 |
| 全站搜索 | 标题+正文匹配，高亮显示 |
| 评论系统 | Waline 评论区 |
| RSS | 自动生成 RSS Feed |
| 友链 | 好友链接 + 友链圈动态 |
| 文章封面 | 本地图片 / 远程 URL |
| 响应式 | 移动端适配 |

## 页面路由

| 路径 | 页面 |
|------|------|
| `/` | 首页（文章列表 + Hero） |
| `/post/[...slug]` | 文章详情页 |
| `/categories/[category]` | 分类页面 |
| `/tags/[tag]` | 标签页面 |
| `/archives` | 文章归档 |
| `/weekly` | 周刊 |
| `/friends` | 友链页面 |
| `/about` | 关于页面 |
| `/rss.xml` | RSS 订阅 |

> 💡 使用 `Ctrl + K` 快捷键随时唤出搜索面板。
