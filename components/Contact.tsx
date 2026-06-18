"use client"

import { useState, useRef, useEffect } from "react"
import emailjs from '@emailjs/browser'
import { NoiseTexture } from "@/components/ui/noise-texture"
import SplitText from "@/components/ui/SplitText"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')
  const [headerVisible, setHeaderVisible] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { setHeaderVisible(e.isIntersecting); }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage('')

    try {
      const serviceID = 'service_2fivl1c'
      const templateID = 'template_nkc4blp'
      const publicKey = 'qyQcXmyfvb9_DanG7'

      await emailjs.send(
        serviceID,
        templateID,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_email: 'contact@johanf.fr'
        },
        publicKey
      )

      setSubmitMessage('Message envoyé avec succès ! Je vous répondrai bientôt.')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error)
      setSubmitMessage('Erreur lors de l\'envoi du message. Veuillez réessayer.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section 
      id="contact"       
      className="relative overflow-hidden py-20 px-6 bg-[#0b0a0d] min-h-screen"
    >
      <NoiseTexture className="absolute inset-0 z-0" />
      <div className="relative w-full max-w-7xl mx-auto grid gap-12 lg:grid-cols-[minmax(280px,360px)_1fr]">
        <div className="space-y-8">
          <div ref={headerRef} className="sticky top-32">
            <div className={`transition-all duration-700 ease-out ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 delay-0"}`}>
              <span className="text-sm uppercase tracking-[0.3em] text-purple-300">Contact</span>
            </div>
            <SplitText text="Entrons en contact" tag="h2" className="mt-4 text-4xl md:text-5xl font-extrabold text-white font-playfair" textAlign="left" delay={60} duration={0.8} splitType="chars" from={{ opacity: 0, y: 30 }} to={{ opacity: 1, y: 0 }} rootMargin="-50px" />
            <p className={`mt-6 text-white/70 text-lg leading-8 transition-all duration-700 ease-out ${headerVisible ? "delay-200 opacity-100 translate-y-0" : "opacity-0 translate-y-6 delay-0"}`}>
              Vous avez un projet en tête ou souhaitez discuter de collaboration ? N'hésitez pas à me contacter via ce formulaire.
            </p>
            <br />
            <br />
            <a
              href="mailto:contact@johanf.fr"
              className="px-6 py-3 border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white rounded-full font-playfair shadow-lg transition-all transform hover:scale-105"
            >
              Envoyer un email direct
            </a>
          </div>
        </div>

        <div className="relative border border-white/[0.08] rounded-2xl bg-white/[0.02] backdrop-blur-sm p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                Nom
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Votre nom"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                Adresse email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="votre.email@example.com"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-white mb-2">
                Sujet
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Sujet de votre message"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                placeholder="Votre message..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-playfair rounded-full shadow-lg hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
            </button>

            {submitMessage && (
              <p className={`text-center ${submitMessage.includes('succès') ? 'text-green-400' : 'text-red-400'}`}>
                {submitMessage}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}