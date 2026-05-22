---
image: /assets/images/works/glass-todo.svg
title: GlassToDo
description: 窗口级毛玻璃待办 · 弹簧物理 · 零 emoji
date: 2026-05-11
tech:
  - Tauri 2
  - React 19
  - Rust
  - CSS Glassmorphism
github: https://github.com/KaeyoungLIAN/GlassToDo
tags:
  - 桌面应用
  - Tauri
  - 毛玻璃
---

**GlassToDo** 是一款追求极致的毛玻璃待办应用——弹簧物理动画、单色系设计、逐项交错入场、零 emoji。约 **5MB** 单文件，零运行时依赖。

### 功能

- **任务管理**：添加/编辑/删除/完成/置顶/排序/搜索，内联撤销栏告别弹窗
- **提醒系统**：单次提醒 + 每周重复提醒，系统通知推送
- **日期导航**：DateBar + DatePicker 日历，智能过滤当日任务
- **双主题**：暗色 + 亮色，CSS 变量体系一键切换，无需重启
- **三语界面**：中文 / English / 日本語，设置中一键切换
- **系统托盘**：关闭不退出，后台检查提醒

### 技术实现

- **窗口级毛玻璃**（Windows Acrylic Blur）+ CSS `backdrop-filter` 玻璃效果
- **Tauri 2** Rust 后端，单文件构建约 5MB
- **React 19** 前端，弹簧物理动画（`@react-spring/web`）
- **增量式国际化**，23 个 CSS 变量控制双主题
- 使用 `completed_dates` 每日追踪替代传统任务拆分

> 每一个像素都不是偶然——从 40ms 交错入场到 check-fade 动画，都经过反复调校。

[查看源码 →](https://github.com/KaeyoungLIAN/GlassToDo)
