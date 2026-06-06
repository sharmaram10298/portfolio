import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from '@/context/ThemeContext';
import { SEOHead } from '@/components/common/SEOHead';
import { Navbar } from '@/components/Navbar/Navbar';
import { HeroSection } from '@/components/Hero/HeroSection';
import { AboutSection } from '@/components/About/AboutSection';
import { SkillsSection } from '@/components/Skills/SkillsSection';
import { ExperienceSection } from '@/components/Experience/ExperienceSection';
import { ProjectsSection } from '@/components/Projects/ProjectsSection';
import { ServicesSection } from '@/components/Services/ServicesSection';
import { AchievementsSection } from '@/components/Achievements/AchievementsSection';
import { ContactSection } from '@/components/Contact/ContactSection';
import { Footer } from '@/components/Footer/Footer';

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <SEOHead
          title="Ram R. Sharma — Backend Developer | Laravel | API Architect | AWS"
          description="Backend Developer with 2+ years building scalable APIs, Laravel apps, and AWS cloud deployments. Available for freelance and full-time opportunities."
          ogImage="https://ramsharma.dev/images/og-image.png"
          ogUrl="https://ramsharma.dev"
        />
        <div className="min-h-screen bg-bg-primary text-text-primary">
          <Navbar />
          <main>
            <HeroSection />
            <AboutSection />
            <SkillsSection />
            <ExperienceSection />
            <ProjectsSection />
            <ServicesSection />
            <AchievementsSection />
            <ContactSection />
          </main>
          <Footer />
        </div>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
