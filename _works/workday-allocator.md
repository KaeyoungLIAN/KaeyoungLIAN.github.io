---
image: /assets/images/works/workday-allocator.svg
title: Workday Allocator
description: Smart work hours allocation with weighted priority scoring — plan your week, track completion, manage recurring shifts.
date: 2026-03-01
tech:
  - Django
  - Python
  - SQLite
github: https://github.com/KaeyoungLIAN/workday_allocation
tags:
  - 工具
  - 排班
  - 后端
---

**Workday Allocator** is a smart scheduling system that allocates work hours across multiple positions based on priority rules and constraints.

### Features

- **Priority-based allocation** — Dual-priority rules: position importance + task urgency
- **Recurring shifts** — Weekly patterns with manual override support
- **Visual schedule** — Clear timeline view of daily allocations
- **Data persistence** — SQLite with Django admin interface
- **Conflict resolution** — Automatic detection of scheduling conflicts

### Approach

Uses a constraint-satisfaction approach: hard-coded position rules (min/max hours, required days) combined with soft scoring (preference weights). No external solver — pure Python with Django ORM.

[View source →](https://github.com/KaeyoungLIAN/workday_allocation)
