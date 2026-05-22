import HeroSection from './components/HeroSection';
import ProjectsSection from './components/ProjectsSection';

export default function App() {
  return (
    <div className="bg-black min-h-screen">
      <HeroSection />
      <ProjectsSection />

      {/* Footer */}
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
    </div>
  );
}
