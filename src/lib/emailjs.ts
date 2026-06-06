import emailjs from '@emailjs/browser';
import type { ContactFormData } from '@/types/index';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;

export async function submitContactForm(data: ContactFormData): Promise<void> {
  const result = await emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    {
      from_name: data.name,
      from_email: data.email,
      subject: data.subject,
      message: data.message,
      time: new Date().toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        dateStyle: 'medium',
        timeStyle: 'short',
      }),
    },
    PUBLIC_KEY
  );

  if (result.status !== 200) {
    throw new Error(`EmailJS error: ${result.text}`);
  }
}
