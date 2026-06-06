import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { services } from '@/data/services';
import { fadeInUp } from '@/lib/animations';
import { ServiceCard } from './ServiceCard';

export function ServicesSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="services" ref={ref} className="py-20 px-4 md:px-8 lg:px-16 bg-bg-secondary">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-3xl md:text-4xl font-bold text-text-primary text-center mb-12"
        >
          My <span className="text-accent-primary">Services</span>
        </motion.h2>

        <motion.div
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          {services.map((service) => (
            <ServiceCard key={service.id} {...service} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
