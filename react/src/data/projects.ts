export interface Project {
  slug: string;
  title: string;
  tag: string;
  tagZh: string;
  description: string;
  descriptionZh?: string;
  longDescription: string;
  longDescriptionZh?: string;
  tech: string[];
  techZh: string[];
  accent: string;
  bg: string;
  githubUrl: string;
  liveUrl?: string;
  screenshot: string;
}

const makeScreenshot = (
  label: string,
  accent: string
) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="400" viewBox="0 0 640 400">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0.25"/>
      <stop offset="50%" stop-color="#0f172a" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#020617" stop-opacity="1"/>
    </linearGradient>
    <linearGradient id="glow" x1="0.5" y1="0" x2="0.5" y2="1">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="${accent}" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="line" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0"/>
      <stop offset="50%" stop-color="${accent}" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="${accent}" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="640" height="400" fill="url(#bg)"/>
  <rect x="80" y="60" width="480" height="280" rx="16" fill="none" stroke="url(#line)" stroke-width="1.5"/>
  <line x1="80" y1="100" x2="560" y2="100" stroke="url(#line)" stroke-width="1"/>
  <rect x="100" y="120" width="160" height="100" rx="8" fill="${accent}" opacity="0.12"/>
  <rect x="100" y="120" width="160" height="4" rx="2" fill="${accent}" opacity="0.5"/>
  <rect x="100" y="140" width="120" height="6" rx="3" fill="rgba(255,255,255,0.12)"/>
  <rect x="100" y="155" width="80" height="6" rx="3" fill="rgba(255,255,255,0.07)"/>
  <rect x="280" y="120" width="180" height="6" rx="3" fill="rgba(255,255,255,0.12)"/>
  <rect x="280" y="140" width="140" height="6" rx="3" fill="rgba(255,255,255,0.07)"/>
  <rect x="280" y="160" width="160" height="6" rx="3" fill="rgba(255,255,255,0.07)"/>
  <rect x="100" y="200" width="200" height="20" rx="10" fill="${accent}" opacity="0.08"/>
  <rect x="320" y="200" width="100" height="20" rx="10" fill="rgba(255,255,255,0.04)"/>
  <rect x="100" y="240" width="440" height="3" rx="1.5" fill="url(#glow)" opacity="0.3"/>
  <rect x="100" y="260" width="200" height="5" rx="2.5" fill="rgba(255,255,255,0.08)"/>
  <rect x="100" y="275" width="160" height="5" rx="2.5" fill="rgba(255,255,255,0.05)"/>
  <text x="320" y="350" font-family="system-ui" font-size="14" fill="rgba(255,255,255,0.15)" text-anchor="middle">${label}</text>
</svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
};

export const projects: Project[] = [
  {
    slug: 'glass-todo',
    title: 'GlassToDo',
    tag: 'Desktop',
    tagZh: '桌面应用',
    description:
      'Window-level glassmorphism todo app with spring physics, multi-language support, dark/light themes, and a 5MB Tauri 2 binary.',
    descriptionZh:
      '窗口级毛玻璃待办应用，支持弹簧物理动画、多语言、深色/浅色主题，打包后仅 5MB 的 Tauri 2 桌面应用。',
    longDescription: `GlassToDo is a desktop todo application built with Tauri 2 and React 19, featuring a distinctive glassmorphism design system. The window itself becomes a canvas — acrylic blur, backdrop-filter transparency, and spring-physics animations create a tactile, premium feel that blends into the desktop environment.

Key highlights include multi-language i18n support, persistent dark/light themes with smooth transitions, an intuitive drag-based task management system, and daily completion tracking via completed_dates arrays. The entire application compiles to under 5MB, leveraging Rust's system-level performance for window management while React handles the reactive UI layer.

The architecture follows a clean separation of concerns: Rust commands (#[tauri::command]) handle all window effects and OS-level operations, while React manages UI state through a minimal, dependency-light stack.`,
    longDescriptionZh: `GlassToDo 是一款基于 Tauri 2 和 React 19 构建的桌面待办应用，拥有独特的毛玻璃设计系统。窗口本身即画布——丙烯酸模糊、backdrop-filter 透明度和弹簧物理动画共同营造出质感高级、融入桌面的使用体验。

核心亮点包括多语言国际化支持、深色/浅色主题平滑切换、直观的拖拽任务管理以及基于 completed_dates 数组的每日完成追踪。整个应用编译后不到 5MB，利用 Rust 的系统级性能处理窗口管理，React 负责响应式 UI 层。

架构遵循清晰的关注点分离：Rust 命令（#[tauri::command]）处理所有窗口特效和操作系统级操作，React 通过极简的轻依赖栈管理 UI 状态。`,
    tech: ['Tauri 2', 'React 19', 'Rust', 'CSS Glassmorphism'],
    techZh: ['Tauri 2', 'React 19', 'Rust', 'CSS 毛玻璃'],
    accent: '#10b981',
    bg: 'radial-gradient(ellipse at 20% 0%, #10b98130 0%, transparent 60%), radial-gradient(ellipse at 80% 100%, #0d948830 0%, transparent 50%), radial-gradient(ellipse at 50% 50%, #0f172a 0%, #020617 100%)',
    githubUrl: 'https://github.com/KaeyoungLIAN/GlassToDo',
    screenshot: makeScreenshot('GlassToDo', '#10b981'),
  },
  {
    slug: 'cs2-market-analyzer',
    title: 'CS2 Market Analyzer',
    tag: 'Analytics',
    tagZh: '数据分析',
    description:
      'Real-time Steam market analytics with K-line charts, AI-powered price predictions via DeepSeek, and multi-key API rotation for 39k+ items.',
    descriptionZh:
      '实时 Steam 市场分析工具，支持 K 线图、DeepSeek AI 价格预测、多密钥 API 轮询，覆盖 39,000+ 道具。',
    longDescription: `CS2 Market Analyzer is a comprehensive market intelligence platform for Counter-Strike 2 in-game items. It scrapes and analyzes pricing data from the Steam Community Market in real-time, covering over 39,000 unique items with automatic price tracking and historical K-line chart generation.

The system features AI-powered price prediction using DeepSeek models, providing buy/sell/hold recommendations based on historical patterns and market sentiment analysis. A multi-key API rotation system ensures reliable data collection without hitting rate limits, while the Django backend efficiently stores and queries millions of price data points.

Built with a focus on data accuracy and performance, the analyzer runs scheduled collection tasks, generates actionable insights, and presents everything through a clean, data-dense interface.`,
    longDescriptionZh: `CS2 Market Analyzer 是一款面向 CS2 游戏道具的综合市场情报平台。它实时从 Steam 社区市场抓取并分析定价数据，覆盖 39,000 多种独特道具，支持自动价格追踪和历史 K 线图生成。

系统利用 DeepSeek 模型进行 AI 驱动的价格预测，基于历史模式和市场情绪分析提供买入/卖出/持有建议。多密钥 API 轮询系统确保在不触达限速的前提下稳定采集数据，Django 后端高效存储和查询数百万价格数据点。

专注于数据准确性和性能，分析器运行定时采集任务、生成可执行的洞察，并通过清晰的数据密集型界面呈现一切。`,
    tech: ['Django', 'Python', 'Steam API', 'DeepSeek AI'],
    techZh: ['Django', 'Python', 'Steam 接口', 'DeepSeek AI'],
    accent: '#6366f1',
    bg: 'radial-gradient(ellipse at 80% 0%, #6366f130 0%, transparent 60%), radial-gradient(ellipse at 20% 100%, #4f46e530 0%, transparent 50%), radial-gradient(ellipse at 50% 50%, #0f172a 0%, #020617 100%)',
    githubUrl: 'https://github.com/KaeyoungLIAN/CS2-Market-Analyzer-Backend',
    screenshot: makeScreenshot('CS2 Market Analyzer', '#6366f1'),
  },
  {
    slug: 'pingpong-mate',
    title: 'PingPong Mate',
    tag: 'WeChat Mini Program',
    tagZh: '微信小程序',
    description:
      'WeChat social app for ping-pong enthusiasts — find matches, track scores, manage court bookings with Django REST API backend.',
    descriptionZh:
      '连接乒乓球爱好者的微信小程序——发现附近球友、约战计分、场地预约，配套 Django REST API 后端。',
    longDescription: `PingPong Mate is a WeChat Mini Program ecosystem connecting ping-pong enthusiasts in local communities. Players can discover nearby matches, challenge opponents, track their win/loss records with Elo-based rating, and book court slots — all within the WeChat super-app ecosystem.

The backend is a Django REST Framework application with Token Authentication, serving the WeChat frontend through a well-architected API layer. Key features include matchmaking with skill-based pairing, score submission and verification, court availability calendars, and player statistics with historical performance trends.

The project demonstrates full-stack capability across mobile and server: the WeChat Mini Program provides a native-feeling UX within WeChat's constraints, while the Django backend handles complex business logic, data persistence in SQLite/PostgreSQL, and API security.`,
    longDescriptionZh: `PingPong Mate 是一个连接本地社区乒乓球爱好者的微信小程序生态。玩家可以发现附近的比赛、挑战对手、通过 Elo 评分系统追踪胜负记录、预订场地——全部在微信超级应用生态内完成。

后端是采用 Token 认证的 Django REST Framework 应用，通过架构良好的 API 层服务微信前端。核心功能包括基于技能水平的匹配、比分提交与验证、场地可用日历以及带有历史表现趋势的玩家统计。

该项目展示了跨移动端和服务端的全栈能力：微信小程序在微信框架内提供了原生级的用户体验，Django 后端处理复杂业务逻辑、SQLite/PostgreSQL 数据持久化和 API 安全。`,
    tech: ['Django', 'WeChat Mini Program', 'DRF', 'Token Auth'],
    techZh: ['Django', '微信小程序', 'DRF', 'Token 认证'],
    accent: '#f59e0b',
    bg: 'radial-gradient(ellipse at 30% 0%, #f59e0b30 0%, transparent 60%), radial-gradient(ellipse at 70% 100%, #d9770630 0%, transparent 50%), radial-gradient(ellipse at 50% 50%, #0f172a 0%, #020617 100%)',
    githubUrl: 'https://github.com/KaeyoungLIAN/pingpong-mate-server',
    screenshot: makeScreenshot('PingPong Mate', '#f59e0b'),
  },
  {
    slug: 'workday-allocator',
    title: 'Workday Allocator',
    tag: 'Scheduling',
    tagZh: '智能排班',
    description:
      'Smart work hours allocation system with weighted priority scoring, recurring shifts, and constraint-satisfaction scheduling logic.',
    descriptionZh:
      '智能工时分配系统，支持加权优先级评分、循环排班和约束满足调度算法。',
    longDescription: `Workday Allocator is a smart scheduling engine that optimizes work hour allocation across teams and shifts. Instead of manual spreadsheet juggling, it uses constraint-satisfaction algorithms and weighted priority scoring to produce fair, balanced schedules that respect both business requirements and employee preferences.

The system handles recurring shift patterns, availability constraints, skill requirements, and overtime limits — generating schedules that maximize coverage while minimizing conflicts. A Django backend with SQLite provides persistent storage and a REST API for integration with existing HR tools.

Built with a practical, algorithm-first approach, Workday Allocator focuses on solving real scheduling headaches: last-minute swaps, uneven workload distribution, and compliance with labor hour regulations.`,
    longDescriptionZh: `Workday Allocator 是一款智能调度引擎，优化跨团队和班次的工时分配。它摒弃了手动电子表格的繁琐，使用约束满足算法和加权优先级评分，生成既尊重业务需求又照顾员工偏好的公平、平衡的排班方案。

系统处理循环班次模式、可用性约束、技能要求和加班限制——生成的排班表最大化覆盖同时最小化冲突。基于 Django 和 SQLite 的后端提供持久化存储和 REST API，便于与现有 HR 工具集成。

采用务实的算法优先方法，Workday Allocator 致力于解决真实的排班难题：临时换班、工作量分配不均、工时合规等。`,
    tech: ['Django', 'Python', 'SQLite'],
    techZh: ['Django', 'Python', 'SQLite'],
    accent: '#06b6d4',
    bg: 'radial-gradient(ellipse at 60% 0%, #06b6d430 0%, transparent 60%), radial-gradient(ellipse at 40% 100%, #0891b230 0%, transparent 50%), radial-gradient(ellipse at 50% 50%, #0f172a 0%, #020617 100%)',
    githubUrl: 'https://github.com/KaeyoungLIAN/workday_allocation',
    liveUrl: 'https://kaeyounglian.github.io/workday_allocation/',
    screenshot: makeScreenshot('Workday Allocator', '#06b6d4'),
  },
  {
    slug: 'quant-wiki',
    title: 'Quant',
    tag: 'Wiki',
    tagZh: '知识库',
    description:
      'A self-contained quantitative finance wiki covering prerequisite math (calculus through graph theory) and quant finance (options, strategies, backtesting, execution).',
    descriptionZh:
      '自包含的量化金融 Wiki，覆盖预备数学（微积分到图论）和量化金融（期权、策略、回测、执行算法）。',
    longDescription: `Quant is a comprehensive, self-contained wiki for learning quantitative finance from the ground up. It spans two major sections: Prerequisite Math (10 chapters from calculus through graph theory, built with VitePress) and Quantitative Finance (market instruments, options pricing, Greeks, portfolio theory, factor models, backtesting, market microstructure, and execution algorithms).

Every concept follows a three-step pedagogical pattern: definition → hand-calculation with step-by-step tables → Quant Link showing practical application. The wiki is designed to be fully self-contained — no external references needed, every concept defined before it's used. Clean, minimal VitePress theme with KaTeX math rendering.`,

    longDescriptionZh: `Quant 是一个全面的、自包含的量化金融学习 Wiki。它涵盖两大板块：预备数学（10 章从微积分到图论，VitePress 构建）和量化金融（交易品种、期权定价、Greeks、组合理论、因子模型、回测、市场微观结构、执行算法）。

每个知识点遵循三步教学法：定义 → 手算（含分步表格）→ Quant Link 展示量化应用。Wiki 设计为完全自包含——不依赖外部资料，每个概念在使用前都已定义。采用简洁极简的 VitePress 主题，支持 KaTeX 数学公式渲染。`,
    tech: ['VitePress', 'KaTeX', 'Markdown', 'Math'],
    techZh: ['VitePress', 'KaTeX', 'Markdown', '数学'],
    accent: '#8b5cf6',
    bg: 'radial-gradient(ellipse at 50% 0%, #8b5cf630 0%, transparent 60%), radial-gradient(ellipse at 50% 100%, #7c3aed30 0%, transparent 50%), radial-gradient(ellipse at 50% 50%, #0f172a 0%, #020617 100%)',
    githubUrl: 'https://github.com/KaeyoungLIAN/Quant',
    screenshot: makeScreenshot('Quant Wiki', '#8b5cf6'),
  },
];
