---
title: 主题组件与快捷功能
description: 介绍本主题内置的各种快捷功能和 UI 组件，包括主题切换、侧边栏、分页、目录导航等。
date: 2024-05-05
tags: [Astro, 定制]
category: 工具
cover: https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200
---

## 主题切换

点击 Header 右侧的 🌙 / ☀️ 按钮切换暗色/亮色模式。

- 自动跟随系统偏好设置
- 手动选择会存储到 `localStorage`
- 所有组件均适配两种模式

### 实现原理

```typescript
// 通过 .dark class 控制
:root {
  --color-bg: #f5f5f5;
  --color-text: #2c3e50;
}

:root.dark {
  --color-bg: #1a1a2e;
  --color-text: #e8e8e8;
}
```

## 侧边栏

侧边栏包含：

| 区块 | 内容 |
|------|------|
| 个人信息 | 头像、简介、社交链接、文章统计 |
| 分类 | 所有分类的 badge 列表，支持折叠展开 |
| 标签 | 按使用数量排序的标签 cloud |
| 随机推荐 | 5 篇随机文章 |

### 移动端适配

移动端侧边栏收起到右下角浮动按钮，点击后以 Drawer 形式滑出。

## 文章目录

文章页左侧显示基于 `h2`/`h3` 标题自动生成的目录导航：

- 自动高亮当前阅读位置
- 点击平滑滚动到对应章节
- 移动端隐藏

## 分页

首页和归档页支持分页，每页 `PAGE_SIZE`（默认 10）篇文章：

- `/` — 第 1 页
- `/page/2` — 第 2 页
- `/page/3` — 第 3 页
- ...

## 文章卡片

每篇文章卡片显示：

- 封面图片（或首字母占位符）
- 分类 badge
- 置顶 ★ 标记
- 编辑中 🖊 标记
- 发布日期
- 字数统计
- 阅读时间
- 标签列表

hover 效果：卡片上浮 + 阴影 + 封面缩放。

## 全站搜索

- `Ctrl+K` 或点击 🔍 打开搜索面板
- 搜索标题、描述、分类、标签和**文章正文**
- 匹配词高亮显示
- 显示上下文摘要片段

## RSS 订阅

自动生成 `/rss.xml`，包含全部已发布文章。订阅链接在 Header 社交图标和 SEO `<head>` 中。

## SEO 优化

每页自动注入：

| Meta 标签 | 来源 |
|-----------|------|
| `<title>` | `frontmatter.title + 站点名` |
| `<meta description>` | `frontmatter.description` |
| `og:title / og:image` | 文章标题 / 封面图 |
| `twitter:card` | `summary_large_image` |

## 评论区

使用 Waline 作为评论系统，支持：

- 昵称 / 邮箱 / 网址
- Markdown 语法
- 表情包
- 暗色模式自动适配
