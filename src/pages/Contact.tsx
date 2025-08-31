import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Send, 
  CheckCircle,
  Clock,
  MessageCircle,
  User,
  Building
} from 'lucide-react';

const Contact: React.FC = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: '',
    budget: '',
    message: '',
    timeline: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const services = [
    t('contact.form.fields.service.options.vitrine'),
    t('contact.form.fields.service.options.ecommerce'),
    t('contact.form.fields.service.options.seo'),
    t('contact.form.fields.service.options.social'),
    t('contact.form.fields.service.options.branding'),
    t('contact.form.fields.service.options.complete'),
    t('contact.form.fields.service.options.other')
  ];

  const budgets = [
    t('contact.form.fields.budget.options.low'),
    t('contact.form.fields.budget.options.medium'),
    t('contact.form.fields.budget.options.high'),
    t('contact.form.fields.budget.options.premium'),
    t('contact.form.fields.budget.options.enterprise')
  ];

  const timelines = [
    t('contact.form.fields.timeline.options.urgent'),
    t('contact.form.fields.timeline.options.fast'),
    t('contact.form.fields.timeline.options.standard'),
    t('contact.form.fields.timeline.options.flexible')
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ici, en production, on enverrait les données vers Supabase ou un service d'email
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        service: '',
        budget: '',
        message: '',
        timeline: ''
      });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: t('contact.info.email.title'),
      content: "webfityou@gmail.com",
      description: t('contact.info.email.description')
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: t('contact.info.phone.title'),
      content: "+33 6 38 22 98 04",
      description: t('contact.info.phone.description')
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: t('contact.info.address.title'),
      content: "75001 Paris, France",
      description: t('contact.info.address.description')
    }
  ];

  return (
    <>
      <Helmet>
        <title>{t('nav.contact')} - WebFitYou</title>
        <meta name="description" content={t('contact.subtitle')} />
      </Helmet>

      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-blue-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">
              {t('contact.title')}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto transition-colors duration-300">
              {t('contact.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">
                    {t('contact.info.title')}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-8 transition-colors duration-300">
                    {t('contact.info.description')}
                  </p>
                </div>

                <div className="space-y-6">
                  {contactInfo.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start space-x-4"
                    >
                      <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center transition-colors duration-300">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1 transition-colors duration-300">
                          {item.title}
                        </h3>
                        <p className="text-gray-900 dark:text-white font-medium transition-colors duration-300">
                          {item.content}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Calendly Integration Placeholder */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-r from-blue-600 to-teal-600 text-white p-6 rounded-2xl shadow-lg"
                >
                  <div className="flex items-center mb-4">
                    <Calendar className="w-6 h-6 mr-3" />
                    <h3 className="font-semibold">{t('contact.info.booking.title')}</h3>
                  </div>
                  <p className="text-blue-100 mb-4">
                    {t('contact.info.booking.description')}
                  </p>
                  <button className="w-full bg-white text-blue-600 font-semibold py-3 rounded-xl hover:bg-gray-100 transition-colors">
                    {t('contact.info.booking.button')}
                  </button>
                </motion.div>
              </motion.div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 transition-colors duration-300"
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">
                  {t('contact.form.title')}
                </h2>

                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-300">
                      {t('contact.form.success.title')}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-200 transition-colors duration-300">
                      {t('contact.form.success.description')}
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Personal Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2 transition-colors duration-300">
                          {t('contact.form.fields.name.label')} *
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300"
                            placeholder={t('contact.form.fields.name.placeholder')}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2 transition-colors duration-300">
                          {t('contact.form.fields.email.label')} *
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300"
                            placeholder={t('contact.form.fields.email.placeholder')}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2 transition-colors duration-300">
                          {t('contact.form.fields.company.label')}
                        </label>
                        <div className="relative">
                          <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input
                            type="text"
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300"
                            placeholder={t('contact.form.fields.company.placeholder')}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2 transition-colors duration-300">
                          {t('contact.form.fields.phone.label')}
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300"
                            placeholder={t('contact.form.fields.phone.placeholder')}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Project Details */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label htmlFor="service" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2 transition-colors duration-300">
                          {t('contact.form.fields.service.label')} *
                        </label>
                        <select
                          id="service"
                          name="service"
                          value={formData.service}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300"
                        >
                          <option value="">{t('contact.form.fields.service.placeholder')}</option>
                          {services.map((service) => (
                            <option key={service} value={service}>
                              {service}
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="budget" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2 transition-colors duration-300">
                          {t('contact.form.fields.budget.label')}
                        </label>
                        <select
                          id="budget"
                          name="budget"
                          value={formData.budget}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300"
                        >
                          <option value="">{t('contact.form.fields.budget.placeholder')}</option>
                          {budgets.map((budget) => (
                            <option key={budget} value={budget}>
                              {budget}
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="timeline" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2 transition-colors duration-300">
                          {t('contact.form.fields.timeline.label')}
                        </label>
                        <select
                          id="timeline"
                          name="timeline"
                          value={formData.timeline}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300"
                        >
                          <option value="">{t('contact.form.fields.timeline.placeholder')}</option>
                          {timelines.map((timeline) => (
                            <option key={timeline} value={timeline}>
                              {timeline}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2 transition-colors duration-300">
                        {t('contact.form.fields.message.label')} *
                      </label>
                      <div className="relative">
                        <MessageCircle className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                          rows={5}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300"
                          placeholder={t('contact.form.fields.message.placeholder')}
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-blue-600 text-white font-semibold py-4 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center group"
                    >
                      <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                      {t('contact.form.submit')}
                    </button>

                    <div className="flex items-center justify-center text-sm text-gray-500 dark:text-gray-300 transition-colors duration-300">
                      <Clock className="w-4 h-4 mr-2" />
                      {t('contact.form.guarantee')}
                    </div>
                  </form>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
              {t('contact.faq.title')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 transition-colors duration-300">
              {t('contact.faq.subtitle')}
            </p>
          </motion.div>

          <div className="space-y-6">
            {t('contact.faq.questions', { returnObjects: true }).map((faq: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm transition-colors duration-300"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 transition-colors duration-300">
                  {faq.question}
                </h3>
                <p className="text-gray-600 dark:text-gray-200 transition-colors duration-300">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;