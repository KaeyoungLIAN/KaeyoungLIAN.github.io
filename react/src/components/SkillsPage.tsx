import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface Skill {
  n: string;
  d: string;
  l: number;
  s?: number;
}

interface Category {
  c: string;
  skills: Skill[];
}

function scoreClass(score: number | undefined): string {
  if (score === undefined) return '';
  if (score >= 60) return 'score-high';
  if (score >= 45) return 'score-mid';
  return 'score-low';
}

function iconChar(name: string): string {
  return name.charAt(0).toUpperCase();
}

export default function SkillsPage() {
  const [data, setData] = useState<Category[]>([]);
  const [scoresMap, setScoresMap] = useState<Record<string, number>>({});
  const [filter, setFilter] = useState('');

  useEffect(() => {
    Promise.all([
      fetch('/skills-data.json').then(r => r.json()),
      fetch('/skills-scores.json').then(r => r.json()),
    ]).then(([skills, scores]) => {
      setData(skills);
      const m: Record<string, number> = {};
      (scores as { n: string; s: number }[]).forEach(s => { m[s.n] = s.s; });
      setScoresMap(m);
    });
  }, []);

  const q = filter.toLowerCase().trim();

  return (
    <div className="skills-page">
      <style>{`
        .skills-page {
          min-height: 100vh;
          background: #000;
          color: #f5f5f7;
          padding: 120px 24px 80px;
          font-family: 'SF Pro Display', 'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        .skills-inner {
          max-width: 960px;
          margin: 0 auto;
        }
        .skills-header {
          text-align: center;
          margin-bottom: 48px;
        }
        .skills-header h1 {
          font-size: 48px;
          font-weight: 700;
          letter-spacing: -0.02em;
          margin-bottom: 8px;
          background: linear-gradient(135deg, #f5f5f7 0%, #86868b 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .skills-subtitle {
          color: #86868b;
          font-size: 18px;
          margin-bottom: 20px;
        }
        .skills-stats {
          display: flex;
          justify-content: center;
          gap: 16px;
          flex-wrap: wrap;
        }
        .stat-badge {
          padding: 6px 16px;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 9999px;
          font-size: 13px;
          color: #86868b;
          background: rgba(255,255,255,0.03);
        }
        .stat-badge strong {
          color: #f5f5f7;
          font-weight: 600;
        }
        .skills-search {
          max-width: 400px;
          margin: 0 auto 40px;
          position: relative;
        }
        .skills-search input {
          width: 100%;
          padding: 12px 16px 12px 40px;
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 9999px;
          font-size: 14px;
          color: #f5f5f7;
          background: rgba(255,255,255,0.05);
          outline: none;
          transition: all 0.2s;
          font-family: inherit;
        }
        .skills-search input:focus {
          border-color: rgba(0,113,227,0.5);
          box-shadow: 0 0 0 3px rgba(0,113,227,0.15);
        }
        .skills-search input::placeholder { color: rgba(255,255,255,0.3); }
        .search-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(255,255,255,0.3);
          pointer-events: none;
          font-size: 16px;
        }
        .category-section { margin-bottom: 40px; }
        .category-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
          padding-bottom: 10px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .category-header h2 {
          font-size: 20px;
          font-weight: 600;
          text-transform: capitalize;
          color: #f5f5f7;
        }
        .category-count {
          font-size: 12px;
          color: rgba(255,255,255,0.3);
          background: rgba(255,255,255,0.06);
          padding: 2px 10px;
          border-radius: 9999px;
        }
        .skills-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }
        @media (max-width: 640px) {
          .skills-grid { grid-template-columns: 1fr; }
        }
        .skill-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 14px 16px;
          border-radius: 12px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          transition: all 0.2s;
          cursor: default;
        }
        .skill-item:hover {
          border-color: rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.06);
        }
        .skill-icon {
          flex-shrink: 0;
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: rgba(0,113,227,0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          color: #0071e3;
          font-weight: 600;
        }
        .skill-body { flex: 1; min-width: 0; }
        .skill-name {
          font-size: 14px;
          font-weight: 600;
          color: #f5f5f7;
          line-height: 1.3;
          margin-bottom: 2px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .skill-desc {
          font-size: 12px;
          line-height: 1.4;
          color: rgba(255,255,255,0.45);
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .skill-meta {
          flex-shrink: 0;
          font-size: 11px;
          color: rgba(255,255,255,0.25);
          font-weight: 500;
          margin-top: 2px;
        }
        .skill-score {
          display: inline-block;
          font-size: 10px;
          font-weight: 600;
          padding: 1px 6px;
          border-radius: 4px;
          margin-left: 6px;
          vertical-align: middle;
        }
        .score-high { background: rgba(46,125,50,0.25); color: #81c784; }
        .score-mid  { background: rgba(230,81,0,0.2); color: #ffb74d; }
        .score-low  { background: rgba(198,40,40,0.2); color: #ef9a9a; }
        .score-legend {
          display: flex;
          gap: 16px;
          justify-content: center;
          margin-top: 40px;
          flex-wrap: wrap;
        }
        .score-legend span {
          font-size: 11px;
          color: rgba(255,255,255,0.3);
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .score-legend .dot {
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 4px;
        }
        .back-home {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: #0071e3;
          text-decoration: none;
          font-size: 14px;
          margin-bottom: 32px;
          transition: opacity 0.2s;
        }
        .back-home:hover { opacity: 0.8; }
        .no-results {
          text-align: center;
          color: rgba(255,255,255,0.3);
          padding: 60px 0;
        }
      `}</style>

      <div className="skills-inner">
        <Link to="/" className="back-home">← 返回首页</Link>

        <div className="skills-header">
          <h1>代理技能库</h1>
          <p className="skills-subtitle">Hermes 技能库 — 共 {data.reduce((a, c) => a + c.skills.length, 0)} 个技能</p>
          <div className="skills-stats">
            <span className="stat-badge">
              <strong>{data.reduce((a, c) => a + c.skills.length, 0)}</strong> 个技能
            </span>
            <span className="stat-badge">
              <strong>{data.length}</strong> 个分类
            </span>
          </div>
        </div>

        <div className="skills-search">
          <span className="search-icon">⌕</span>
          <input
            type="text"
            placeholder="搜索技能..."
            value={filter}
            onChange={e => setFilter(e.target.value)}
          />
        </div>

        {data.map(cat => {
          // 按分数降序排列（有分的在前，无分的在后）
          const sorted = [...cat.skills].sort((a, b) => {
            const sa = scoresMap[a.n] ?? -1;
            const sb = scoresMap[b.n] ?? -1;
            return sb - sa;
          });
          const matched = q
            ? sorted.filter(s => s.n.includes(q) || s.d.toLowerCase().includes(q))
            : sorted;
          if (matched.length === 0) return null;

          return (
            <div key={cat.c} className="category-section">
              <div className="category-header">
                <h2>{cat.c.replace(/-/g, ' ')}</h2>
                <span className="category-count">{matched.length}</span>
              </div>
              <div className="skills-grid">
                {matched.map(s => {
                  const score = scoresMap[s.n];
                  const sc = scoreClass(score);
                  const scoreHtml = score !== undefined
                    ? <span className={`skill-score ${sc}`}>{score}</span>
                    : null;

                  return (
                    <div key={s.n} className="skill-item">
                      <div className="skill-icon">{iconChar(s.n)}</div>
                      <div className="skill-body">
                        <div className="skill-name">
                          {s.n}
                          {scoreHtml}
                        </div>
                        <div className="skill-desc">{s.d || '—'}</div>
                      </div>
                      <div className="skill-meta">{s.l} 行</div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {data.length > 0 && !data.some(c => c.skills.some(s => q ? s.n.includes(q) : true)) && (
          <div className="no-results">没有找到匹配的技能。</div>
        )}

        <div className="score-legend">
          <span><span className="dot" style={{background:'#81c784'}}></span> 强 (≥60)</span>
          <span><span className="dot" style={{background:'#ffb74d'}}></span> 中等 (45-59)</span>
          <span><span className="dot" style={{background:'#ef9a9a'}}></span> 弱 (&lt;45)</span>
        </div>
      </div>
    </div>
  );
}
