import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Server, Cloud, GitBranch } from 'lucide-react';
import { aboutData } from '@/data/about';
import { slideInLeft, slideInRight, staggerContainer, fadeInUp } from '@/lib/animations';
import { GlassmorphismCard } from '@/components/common/GlassmorphismCard';

const iconMap: Record<string, React.ReactNode> = {
  Server: <Server size={24} className="text-accent-primary" />,
  Cloud: <Cloud size={24} className="text-accent-primary" />,
  GitBranch: <GitBranch size={24} className="text-accent-primary" />,
};

export function AboutSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src =
      'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxMDAiIGN5PSI4MCIgcj0iNDAiIGZpbGw9IiM0ZjQ2ZTUiLz48ZWxsaXBzZSBjeD0iMTAwIiBjeT0iMTcwIiByeD0iNjAiIHJ5PSI0MCIgZmlsbD0iIzRmNDZlNSIvPjwvc3ZnPg==';
  };

  return (
    <section
      id="about"
      ref={ref}
      className="py-20 px-4 md:px-8 lg:px-16 bg-bg-secondary"
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-3xl md:text-4xl font-bold text-text-primary text-center mb-16"
        >
          About <span className="text-accent-primary">Me</span>
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: text content */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="flex flex-col gap-6"
          >
            <p className="text-text-secondary text-base md:text-lg leading-relaxed">
              {aboutData.summary}
            </p>
            <p className="text-accent-primary font-medium text-sm md:text-base">
              {aboutData.roleTitle}
            </p>
          </motion.div>

          {/* Right: image + cards */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="flex flex-col items-center gap-8"
          >
            {/* Profile image with gradient ring */}
            <div className="relative p-1 rounded-full bg-gradient-to-br from-accent-primary via-accent-secondary to-purple-500">
              <img
                src={aboutData.profileImageUrl}
                alt="Ram R. Sharma — Backend Developer"
                onError={handleImageError}
                className="w-48 h-48 rounded-full object-cover bg-bg-secondary"
              />
            </div>

            {/* Specialization cards */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="grid grid-cols-1 gap-4 w-full"
            >
              {aboutData.specializations.map((spec) => (
                <motion.div key={spec.title} variants={fadeInUp}>
                  <GlassmorphismCard className="p-4 flex items-start gap-4">
                    <div className="flex-shrink-0 mt-0.5">
                      {iconMap[spec.icon] ?? <Server size={24} className="text-accent-primary" />}
                    </div>
                    <div>
                      <h3 className="font-semibold text-text-primary text-sm">{spec.title}</h3>
                      <p className="text-text-secondary text-xs mt-1">{spec.description}</p>
                    </div>
                  </GlassmorphismCard>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
