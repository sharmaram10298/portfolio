import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CheckCircle, XCircle, X } from 'lucide-react';
import { slideInLeft, slideInRight, fadeInUp } from '@/lib/animations';
import { ContactForm } from './ContactForm';
import { ContactInfo } from './ContactInfo';

type ToastType = 'success' | 'error' | null;

export function ContactSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [toast, setToast] = useState<ToastType>(null);

  const showToast = (type: ToastType) => {
    setToast(type);
    setTimeout(() => setToast(null), 4000);
  };

  return (
    <section id="contact" ref={ref} className="py-20 px-4 md:px-8 lg:px-16 bg-bg-secondary">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-3xl md:text-4xl font-bold text-text-primary text-center mb-12"
        >
          Contact <span className="text-accent-primary">Me</span>
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form — slides from left */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8"
          >
            <ContactForm
              onSuccess={() => showToast('success')}
              onError={() => showToast('error')}
            />
          </motion.div>

          {/* Info — slides from right */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="flex items-start"
          >
            <ContactInfo />
          </motion.div>
        </div>
      </div>

      {/* Toast notification */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-xl shadow-xl border text-sm font-medium transition-all ${
            toast === 'success'
              ? 'bg-green-900/90 border-green-500/30 text-green-100'
              : 'bg-red-900/90 border-red-500/30 text-red-100'
          }`}
        >
          {toast === 'success' ? (
            <CheckCircle size={18} className="text-green-400 flex-shrink-0" />
          ) : (
            <XCircle size={18} className="text-red-400 flex-shrink-0" />
          )}
          {toast === 'success'
            ? 'Message sent successfully!'
            : 'Failed to send. Please try again.'}
          <button
            onClick={() => setToast(null)}
            aria-label="Dismiss notification"
            className="ml-2 hover:opacity-70 transition-opacity"
          >
            <X size={16} />
          </button>
        </div>
      )}
    </section>
  );
}
