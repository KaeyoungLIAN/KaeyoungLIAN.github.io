import { createContext, useContext, useState, useCallback } from 'react';

type Lang = 'zh' | 'en';

const translations: Record<string, { zh: string; en: string }> = {
  'hero.subtitle': {
    zh: '构建工具、应用和系统——从桌面毛玻璃到AI驱动的分析',
    en: 'Builds tools, apps, and systems — from desktop glassmorphism to AI-powered analytics.',
  },
  'hero.viewProjects': {
    zh: '查看项目',
    en: 'View projects',
  },
  'projects.title': {
    zh: '我的项目',
    en: 'My Projects',
  },
  'projects.heading': {
    zh: '我做过的项目',
    en: "Things I've built",
  },
  'projects.view': {
    zh: '查看',
    en: 'View',
  },
  'detail.back': {
    zh: '返回项目列表',
    en: 'Back to projects',
  },
  'detail.about': {
    zh: '关于项目',
    en: 'About this project',
  },
  'detail.techStack': {
    zh: '技术栈',
    en: 'Tech Stack',
  },
  'detail.viewGitHub': {
    zh: '查看 GitHub',
    en: 'View on GitHub',
  },
  'detail.liveProject': {
    zh: '在线项目',
    en: 'Live Project',
  },
  'detail.notFound': {
    zh: '项目不存在',
    en: 'Project not found',
  },
  'detail.backHome': {
    zh: '返回首页',
    en: 'Back to home',
  },
  'nav.github': {
    zh: 'GitHub',
    en: 'GitHub',
  },
};

interface LanguageContextType {
  lang: Lang;
  toggleLang: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'zh',
  toggleLang: () => {},
  t: (key: string) => key,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('zh');

  const toggleLang = useCallback(() => {
    setLang((prev) => (prev === 'zh' ? 'en' : 'zh'));
  }, []);

  const t = useCallback(
    (key: string): string => {
      const entry = translations[key];
      if (!entry) return key;
      return entry[lang];
    },
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
