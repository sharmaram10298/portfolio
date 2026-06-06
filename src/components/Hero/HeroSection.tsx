import { motion } from 'framer-motion';
import { Github, Linkedin, Download, Mail, Briefcase } from 'lucide-react';
import { heroData } from '@/data/hero';
import { heroStaggerVariants, fadeInUp } from '@/lib/animations';
import { ParticleCanvas } from './ParticleCanvas';
import { TypingAnimator } from './TypingAnimator';
import { StatsCard } from './StatsCard';

export function HeroSection() {
  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleResumeDownload = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('/resume.pdf');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(new Blob([blob], { type: 'application/pdf' }));
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Ram R. Sharma - Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch {
      // fallback — direct open
      window.open('/resume.pdf', '_blank');
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-bg-primary"
    >
      {/* Particle background */}
      <ParticleCanvas count={80} />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-bg-primary/20 to-bg-primary/60 pointer-events-none"
        style={{ zIndex: 1 }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-8 text-center pt-24 pb-16">
        <motion.div
          variants={heroStaggerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-6"
        >
          {/* Heading */}
          <motion.div variants={fadeInUp}>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-text-primary leading-tight">
              {heroData.name}
            </h1>
          </motion.div>

          {/* Typing animator */}
          <motion.div variants={fadeInUp} className="text-xl md:text-2xl lg:text-3xl font-medium">
            <TypingAnimator
              strings={heroData.roles}
              typingSpeed={80}
              deletingSpeed={40}
              pauseAfterType={1500}
            />
          </motion.div>

          {/* Tagline */}
          <motion.p
            variants={fadeInUp}
            className="text-base md:text-lg text-text-secondary max-w-2xl leading-relaxed"
          >
            {heroData.tagline}
          </motion.p>

          {/* Buttons */}
          <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 justify-center">
            <a
              href={heroData.resumeUrl}
              onClick={handleResumeDownload}
              download="Ram R. Sharma - Resume.pdf"
              type="application/pdf"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent-primary text-white font-semibold hover:bg-accent-primary/90 transition-colors min-h-[44px]"
            >
              <Download size={18} />
              Download Resume
            </a>
            <button
              onClick={handleContactClick}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-accent-primary text-accent-primary font-semibold hover:bg-accent-primary/10 transition-colors min-h-[44px]"
            >
              <Mail size={18} />
              Contact Me
            </button>
          </motion.div>

          {/* Social links */}
          <motion.div variants={fadeInUp} className="flex gap-4">
            <a
              href={heroData.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="p-3 rounded-xl border border-white/10 hover:border-accent-primary hover:text-accent-primary text-text-secondary transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              <Github size={20} />
            </a>
            <a
              href={heroData.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="p-3 rounded-xl border border-white/10 hover:border-accent-primary hover:text-accent-primary text-text-secondary transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="https://www.naukri.com/mnjuser/profile"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Naukri profile"
              className="p-3 rounded-xl border border-white/10 hover:border-accent-primary hover:text-accent-primary text-text-secondary transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              <Briefcase size={20} />
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 justify-center mt-4">
            {heroData.stats.map((stat) => (
              <StatsCard key={stat.label} label={stat.label} value={stat.value} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
