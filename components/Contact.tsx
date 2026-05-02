"use client"

import { useState } from "react"
import emailjs from '@emailjs/browser'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

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
      const serviceID = ''
      const templateID = ''
      const publicKey = ''

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

      setSubmitMessage('Message envoyé avec succès !')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error)
      setSubmitMessage('Erreur lors de l\'envoi du message. Veuillez réessayer.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-20 px-6 bg-transparent min-h-screen flex items-center" data-scroll data-scroll-section>
      <div className="w-full max-w-7xl mx-auto grid gap-12 lg:grid-cols-[minmax(280px,360px)_1fr] items-start">
        <div className="space-y-8">
          <div className="sticky top-32">
            <span className="text-sm uppercase tracking-[0.3em] text-purple-300">Contact</span>
            <h2 className="mt-4 text-4xl md:text-5xl font-extrabold text-white font-geist-sans">Entrons en contact</h2>
            <p className="mt-6 text-white/70 text-lg leading-8">
              Vous avez un projet en tête ou souhaitez discuter de collaboration ? N'hésitez pas à me contacter via ce formulaire.
            </p>
            <br />
            <br />
            <a
              href="mailto:contact@johanf.fr"
              className="px-6 py-3 border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white rounded-full font-semibold shadow-lg transition-all transform hover:scale-105"
            >
              Envoyer un email direct
            </a>
          </div>
        </div>

        <div className="bg-gray-800 rounded-2xl p-8 shadow-xl" data-scroll data-scroll-speed="0.08">
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
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                placeholder="Votre message..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
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