export interface Project {
  slug: string;
  title: string;
  tag: string;
  description: string;
  longDescription: string;
  tech: string[];
  accent: string;
  bg: string;
  githubUrl: string;
  liveUrl?: string;
  screenshot: string; // gradient SVG data URL or path
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
    description:
      'Window-level glassmorphism todo app with spring physics, multi-language support, dark/light themes, and a 5MB Tauri 2 binary.',
    longDescription: `GlassToDo is a desktop todo application built with Tauri 2 and React 19, featuring a distinctive glassmorphism design system. The window itself becomes a canvas — acrylic blur, backdrop-filter transparency, and spring-physics animations create a tactile, premium feel that blends into the desktop environment.

Key highlights include multi-language i18n support, persistent dark/light themes with smooth transitions, an intuitive drag-based task management system, and daily completion tracking via completed_dates arrays. The entire application compiles to under 5MB, leveraging Rust's system-level performance for window management while React handles the reactive UI layer.

The architecture follows a clean separation of concerns: Rust commands (#[tauri::command]) handle all window effects and OS-level operations, while React manages UI state through a minimal, dependency-light stack.`,
    tech: ['Tauri 2', 'React 19', 'Rust', 'CSS Glassmorphism'],
    accent: '#10b981',
    bg: 'radial-gradient(ellipse at 20% 0%, #10b98130 0%, transparent 60%), radial-gradient(ellipse at 80% 100%, #0d948830 0%, transparent 50%), radial-gradient(ellipse at 50% 50%, #0f172a 0%, #020617 100%)',
    githubUrl: 'https://github.com/KaeyoungLIAN/GlassToDo',
    screenshot: makeScreenshot('GlassToDo', '#10b981'),
  },
  {
    slug: 'cs2-market-analyzer',
    title: 'CS2 Market Analyzer',
    tag: 'Analytics',
    description:
      'Real-time Steam market analytics with K-line charts, AI-powered price predictions via DeepSeek, and multi-key API rotation for 39k+ items.',
    longDescription: `CS2 Market Analyzer is a comprehensive market intelligence platform for Counter-Strike 2 in-game items. It scrapes and analyzes pricing data from the Steam Community Market in real-time, covering over 39,000 unique items with automatic price tracking and historical K-line chart generation.

The system features AI-powered price prediction using DeepSeek models, providing buy/sell/hold recommendations based on historical patterns and market sentiment analysis. A multi-key API rotation system ensures reliable data collection without hitting rate limits, while the Django backend efficiently stores and queries millions of price data points.

Built with a focus on data accuracy and performance, the analyzer runs scheduled collection tasks, generates actionable insights, and presents everything through a clean, data-dense interface.`,
    tech: ['Django', 'Python', 'Steam API', 'DeepSeek AI'],
    accent: '#6366f1',
    bg: 'radial-gradient(ellipse at 80% 0%, #6366f130 0%, transparent 60%), radial-gradient(ellipse at 20% 100%, #4f46e530 0%, transparent 50%), radial-gradient(ellipse at 50% 50%, #0f172a 0%, #020617 100%)',
    githubUrl: 'https://github.com/KaeyoungLIAN/CS2-Market-Analyzer-Backend',
    screenshot: makeScreenshot('CS2 Market Analyzer', '#6366f1'),
  },
  {
    slug: 'pingpong-mate',
    title: 'PingPong Mate',
    tag: 'WeChat Mini Program',
    description:
      'WeChat social app for ping-pong enthusiasts — find matches, track scores, manage court bookings with Django REST API backend.',
    longDescription: `PingPong Mate is a WeChat Mini Program ecosystem connecting ping-pong enthusiasts in local communities. Players can discover nearby matches, challenge opponents, track their win/loss records with Elo-based rating, and book court slots — all within the WeChat super-app ecosystem.

The backend is a Django REST Framework application with Token Authentication, serving the WeChat frontend through a well-architected API layer. Key features include matchmaking with skill-based pairing, score submission and verification, court availability calendars, and player statistics with historical performance trends.

The project demonstrates full-stack capability across mobile and server: the WeChat Mini Program provides a native-feeling UX within WeChat's constraints, while the Django backend handles complex business logic, data persistence in SQLite/PostgreSQL, and API security.`,
    tech: ['Django', 'WeChat Mini Program', 'DRF', 'Token Auth'],
    accent: '#f59e0b',
    bg: 'radial-gradient(ellipse at 30% 0%, #f59e0b30 0%, transparent 60%), radial-gradient(ellipse at 70% 100%, #d9770630 0%, transparent 50%), radial-gradient(ellipse at 50% 50%, #0f172a 0%, #020617 100%)',
    githubUrl: 'https://github.com/KaeyoungLIAN/pingpong-mate-server',
    screenshot: makeScreenshot('PingPong Mate', '#f59e0b'),
  },
  {
    slug: 'workday-allocator',
    title: 'Workday Allocator',
    tag: 'Scheduling',
    description:
      'Smart work hours allocation system with weighted priority scoring, recurring shifts, and constraint-satisfaction scheduling logic.',
    longDescription: `Workday Allocator is a smart scheduling engine that optimizes work hour allocation across teams and shifts. Instead of manual spreadsheet juggling, it uses constraint-satisfaction algorithms and weighted priority scoring to produce fair, balanced schedules that respect both business requirements and employee preferences.

The system handles recurring shift patterns, availability constraints, skill requirements, and overtime limits — generating schedules that maximize coverage while minimizing conflicts. A Django backend with SQLite provides persistent storage and a REST API for integration with existing HR tools.

Built with a practical, algorithm-first approach, Workday Allocator focuses on solving real scheduling headaches: last-minute swaps, uneven workload distribution, and compliance with labor hour regulations.`,
    tech: ['Django', 'Python', 'SQLite'],
    accent: '#06b6d4',
    bg: 'radial-gradient(ellipse at 60% 0%, #06b6d430 0%, transparent 60%), radial-gradient(ellipse at 40% 100%, #0891b230 0%, transparent 50%), radial-gradient(ellipse at 50% 50%, #0f172a 0%, #020617 100%)',
    githubUrl: 'https://github.com/KaeyoungLIAN/workday_allocation',
    screenshot: makeScreenshot('Workday Allocator', '#06b6d4'),
  },
];
