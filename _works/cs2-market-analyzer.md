---
image: /assets/images/works/cs2-analyzer.svg
title: CS2 Market Analyzer
description: Real-time CS2 market analytics with candlestick charts, AI-powered price predictions, and multi-key Steam API rotation.
date: 2026-05-01
tech:
  - Django
  - Python
  - Steam API
  - DeepSeek AI
  - SQLite
github: https://github.com/KaeyoungLIAN/CS2-Market-Analyzer-Backend
tags:
  - 数据分析
  - AI
  - 后端
---

**CS2 Market Analyzer** is a real-time market analytics platform for Counter-Strike 2. It crawls the Steam Community Market, generates candlestick charts, and uses LLM-powered analysis for price predictions.

### Features

- **K-line charts** — Red-for-up, green-for-down (Chinese market convention) with `lightweight-charts`
- **AI analysis** — Pre-cached DeepSeek-powered analysis for every item, with automatic daily updates
- **Large-scale scraping** — Concurrent fetcher with 39k+ items, incremental K-line updates using `--update` mode
- **Steam API key rotation** — Multi-key round-robin for rate limit avoidance
- **Cron automation** — Daily market data refresh and K-line sync via Hermes cron jobs

### Architecture

Django backend serving a REST API. The scraper worker uses concurrent HTTP requests with a producer-consumer pattern — one worker fetches BUFF data, another writes to SQLite. Exit condition: 3 consecutive empty queues before shutdown.

[View source →](https://github.com/KaeyoungLIAN/CS2-Market-Analyzer-Backend)
