import { Github } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

export default function Header() {
  const { lang, toggleLang, t } = useLanguage();

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: '16px 24px',
      }}
    >
      <nav
        className="liquid-glass"
        style={{
          borderRadius: '9999px',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '10px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          style={{
            color: 'white',
            fontWeight: 600,
            fontSize: '16px',
            textDecoration: 'none',
          }}
        >
          Kaeyoung
        </Link>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Skills */}
          <Link
            to="/skills"
            className="liquid-glass"
            style={{
              borderRadius: '9999px',
              padding: '6px 12px',
              color: 'rgba(255,255,255,0.8)',
              fontSize: '13px',
              fontWeight: 500,
              textDecoration: 'none',
            }}
          >
            Skills
          </Link>
          {/* GitHub */}
          <a
            href="https://github.com/KaeyoungLIAN"
            target="_blank"
            rel="noopener noreferrer"
            className="liquid-glass"
            style={{
              borderRadius: '9999px',
              padding: '6px 12px',
              color: 'rgba(255,255,255,0.8)',
              fontSize: '13px',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              textDecoration: 'none',
            }}
          >
            <Github className="w-3.5 h-3.5" />
            <span>{t('nav.github')}</span>
          </a>

          {/* Divider */}
          <div
            style={{
              width: '1px',
              height: '20px',
              background: 'rgba(255,255,255,0.1)',
            }}
          />

          {/* Lang toggle */}
          <button
            onClick={toggleLang}
            className="liquid-glass"
            style={{
              borderRadius: '9999px',
              padding: '6px 10px',
              border: 'none',
              cursor: 'pointer',
              color: 'rgba(255,255,255,0.8)',
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.05em',
              display: 'flex',
              alignItems: 'center',
              gap: '0',
              fontFamily: "'Outfit', sans-serif",
            }}
          >
            <span
              style={{
                padding: '2px 6px',
                borderRadius: '9999px',
                background: lang === 'zh' ? 'rgba(255,255,255,0.15)' : 'transparent',
                color: lang === 'zh' ? 'white' : 'rgba(255,255,255,0.5)',
                transition: 'all 0.2s',
              }}
            >
              ZH
            </span>
            <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '10px', margin: '0 1px' }}>
              |
            </span>
            <span
              style={{
                padding: '2px 6px',
                borderRadius: '9999px',
                background: lang === 'en' ? 'rgba(255,255,255,0.15)' : 'transparent',
                color: lang === 'en' ? 'white' : 'rgba(255,255,255,0.5)',
                transition: 'all 0.2s',
              }}
            >
              EN
            </span>
          </button>
        </div>
      </nav>
    </header>
  );
}
