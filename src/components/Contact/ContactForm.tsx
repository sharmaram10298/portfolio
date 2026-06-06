import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, Loader2 } from 'lucide-react';
import { submitContactForm } from '@/lib/emailjs';
import type { ContactFormData } from '@/types/index';

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Max 100 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(1, 'Subject is required').max(150, 'Max 150 characters'),
  message: z.string().min(20, 'Min 20 characters').max(2000, 'Max 2000 characters'),
});

interface ContactFormProps {
  onSuccess: () => void;
  onError: () => void;
}

export function ContactForm({ onSuccess, onError }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      await submitContactForm(data);
      reset();
      onSuccess();
    } catch {
      onError();
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    'w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-text-primary placeholder-text-secondary focus:outline-none focus:border-accent-primary transition-colors text-sm';
  const errorClass = 'text-red-400 text-xs mt-1';

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
      <div>
        <input
          {...register('name')}
          placeholder="Your Name"
          className={inputClass}
        />
        {errors.name && <p className={errorClass}>{errors.name.message}</p>}
      </div>

      <div>
        <input
          {...register('email')}
          type="email"
          placeholder="Your Email"
          className={inputClass}
        />
        {errors.email && <p className={errorClass}>{errors.email.message}</p>}
      </div>

      <div>
        <input
          {...register('subject')}
          placeholder="Subject"
          className={inputClass}
        />
        {errors.subject && <p className={errorClass}>{errors.subject.message}</p>}
      </div>

      <div>
        <textarea
          {...register('message')}
          placeholder="Your Message (min 20 characters)"
          rows={5}
          className={`${inputClass} resize-none`}
        />
        {errors.message && <p className={errorClass}>{errors.message.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-accent-primary text-white font-semibold hover:bg-accent-primary/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed min-h-[44px]"
      >
        {isSubmitting ? (
          <>
            <Loader2 size={18} className="animate-spin" /> Sending...
          </>
        ) : (
          <>
            <Send size={18} /> Send Message
          </>
        )}
      </button>
    </form>
  );
}
