import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HeroSection from './components/HeroSection';
import ProjectsSection from './components/ProjectsSection';
import ProjectDetail from './components/ProjectDetail';

function HomePage() {
  return (
    <>
      <HeroSection />
      <ProjectsSection />
    </>
  );
}

function Footer() {
  return (
    <footer
      style={{
        background: 'black',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: '40px 24px',
        textAlign: 'center',
      }}
    >
      <p
        style={{
          color: 'rgba(255,255,255,0.5)',
          fontSize: '12px',
          marginTop: '8px',
        }}
      >
        &copy; {new Date().getFullYear()} Kaeyoung
      </p>
    </footer>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="bg-black min-h-screen">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HomePage />
                <Footer />
              </>
            }
          />
          <Route path="/project/:slug" element={<ProjectDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
