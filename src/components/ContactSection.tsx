import React, { useState } from 'react';
import { Mail, Linkedin, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { submitContactMessage } from '../services/portfolioService';
import { WebsiteSettings } from '../types/portfolio';

interface ContactProps {
  settings: WebsiteSettings;
}

export const ContactSection: React.FC<ContactProps> = ({ settings }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setErrorMessage('Please fill out all required fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus('error');
      setErrorMessage('Please provide a valid email address.');
      return;
    }

    try {
      setStatus('submitting');
      setErrorMessage('');
      await submitContactMessage({
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim() || 'General Inquiry',
        message: formData.message.trim()
      });

      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 6000);
    } catch (err: any) {
      console.error('Contact form submission error:', err);
      setStatus('error');
      setErrorMessage('Failed to send message. Please reach out directly via email.');
    }
  };

  return (
    <section id="contact" className="py-14 sm:py-20 bg-white relative border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          
          {/* Left Column: Contact Copy & Direct Channels */}
          <div className="lg:col-span-5">
            <span className="text-xs font-bold tracking-widest uppercase text-[#542C91] mb-1.5 block">
              Get in Touch
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#191624] tracking-tight mb-3">
              Have an Idea? Let's Build Something.
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 sm:mb-8">
              Whether it's a project, collaboration, or simply a conversation about technology and finance, I'd love to hear from you.
            </p>

            <div className="space-y-3 sm:space-y-4">
              <a
                href={`mailto:${settings.email || 'hsaif9240@gmail.com'}`}
                className="flex items-center gap-3 sm:gap-4 p-3.5 sm:p-4 rounded-2xl bg-[#FAF9FF] border border-slate-200/80 hover:border-[#542C91]/40 transition-colors group"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white text-[#542C91] border border-[#542C91]/15 flex items-center justify-center shrink-0 shadow-2xs group-hover:bg-[#542C91] group-hover:text-white transition-colors">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Email</p>
                  <p className="text-xs sm:text-sm font-bold text-[#191624] group-hover:text-[#542C91] transition-colors truncate">
                    {settings.email || 'hsaif9240@gmail.com'}
                  </p>
                </div>
              </a>

              <a
                href={settings.linkedin || 'https://www.linkedin.com/in/ihamzasaif/'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 sm:gap-4 p-3.5 sm:p-4 rounded-2xl bg-[#FAF9FF] border border-slate-200/80 hover:border-[#542C91]/40 transition-colors group"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white text-[#542C91] border border-[#542C91]/15 flex items-center justify-center shrink-0 shadow-2xs group-hover:bg-[#542C91] group-hover:text-white transition-colors">
                  <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">LinkedIn</p>
                  <p className="text-xs sm:text-sm font-bold text-[#191624] group-hover:text-[#542C91] transition-colors truncate">
                    {settings.linkedin
                      ? settings.linkedin.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')
                      : 'linkedin.com/in/ihamzasaif'}
                  </p>
                </div>
              </a>
            </div>
          </div>

          {/* Right Column: Functional Contact Form */}
          <div className="lg:col-span-7 bg-[#FAF9FF] p-4 sm:p-7 rounded-3xl border border-slate-200/80 shadow-2xs">
            <h3 className="text-lg sm:text-xl font-bold text-[#191624] mb-4 sm:mb-6">
              Send a Message
            </h3>

            {status === 'success' && (
              <div className="p-3.5 mb-5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-2.5 text-xs sm:text-sm">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                <p className="font-medium">
                  Thank you! Your message has been sent successfully. I will get back to you shortly.
                </p>
              </div>
            )}

            {status === 'error' && (
              <div className="p-3.5 mb-5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 flex items-center gap-2.5 text-xs sm:text-sm">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <p className="font-medium">{errorMessage}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#542C91]/30 focus:border-[#542C91]"
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Email Address *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="sarah@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#542C91]/30 focus:border-[#542C91]"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-subject" className="block text-xs font-semibold text-slate-700 mb-1">
                  Subject
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Collaboration, project inquiry, or general question"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#542C91]/30 focus:border-[#542C91]"
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-xs font-semibold text-slate-700 mb-1">
                  Message *
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Share details about what you'd like to collaborate on..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#542C91]/30 focus:border-[#542C91] resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full py-3 px-5 rounded-xl bg-[#542C91] hover:bg-[#432373] text-white text-xs sm:text-sm font-semibold shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {status === 'submitting' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
};
