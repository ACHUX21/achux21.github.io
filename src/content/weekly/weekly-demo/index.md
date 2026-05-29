---
title: 周刊 #1 — 本周前端动态
description: 第一期周刊，包含 Astro 6.x 更新、Tailwind CSS v4 实践、Bun 生态进展等前端技术动态。
date: 2024-06-02
tags: [前端, Astro, CSS]
issue: 1
cover: https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=1200
---

## 本周推荐

### Astro 6.x 正式发布

Astro 6 带来了全新的内容层 API 和更快的构建速度。

- 新的 `content.config.ts` 替代 `content/config.ts`
- `unified()` 处理器统一 Markdown/MDX 插件配置
- 构建速度提升约 30%

### Tailwind CSS v4

Tailwind CSS v4 采用 CSS-first 配置方式，无需 `tailwind.config.js`：

```css
@import 'tailwindcss';

@theme {
  --color-primary: #e9536a;
}
```

### Bun 1.3

Bun 1.3 改进了包管理器的稳定性和兼容性：

- 更快的 `bun install`
- 改进的 Node.js 兼容层
- 新增 `bun build` 优化

## 工具推荐

| 工具 | 用途 |
|------|------|
| [Waline](https://waline.js.org) | 轻量评论系统 |
| [KaTeX](https://katex.org) | Web 数学公式渲染 |
| [Shiki](https://shiki.style) | 代码语法高亮 |

## 代码片段

### React 自定义 Hook

```typescript
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
```

### CSS Grid 响应式布局

```css
.grid-layout {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}
```

## 精选文章

- [Content Collections in Astro 6](https://docs.astro.build/en/guides/content-collections/)
- [MDX Guide](https://docs.astro.build/en/guides/integrations-guide/mdx/)
- [CSS Container Queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_container_queries)

## 下期预告

下期将介绍 TypeScript 5.5 新特性和 React 19 更新。敬请期待！
