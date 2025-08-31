import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Target, 
  Users, 
  CheckCircle, 
  ArrowRight,
  Star,
  Play
} from 'lucide-react';
import Hero from '../components/home/Hero';
import TestimonialsSlider from '../components/home/TestimonialsSlider';
import FormulaireAuditMini from '../components/home/MiniAuditForm';
import SEOGrowthAnimation from '../components/home/SEOGrowthAnimation';

const Home: React.FC = () => {
  const { t } = useTranslation();

  const benefits = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: t('benefits.express.title'),
      description: t('benefits.express.description')
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: t('benefits.seo.title'),
      description: t('benefits.seo.description')
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: t('benefits.support.title'),
      description: t('benefits.support.description')
    }
  ];

  const stats = [
    { number: "+30", label: "sites créés" },
    { number: "100%", label: "des clients satisfaits" },
    { number: "4.2x", label: "plus de trafic" },
    { number: "24/7", label: t('hero.stats.support') }
  ];

  return (
    <>
      <Helmet>
        <title>WebFitYou - Agence Digitale Nouvelle Génération | Sites Web + SEO Automatisé</title>
        <meta name="description" content="Créez votre site web professionnel en 7 jours avec WebFitYou. SEO automatisé par GPT-5, design responsive et accompagnement personnalisé. Devis gratuit." />
      </Helmet>

      {/* Hero Section */}
      <Hero />

      {/* SEO Growth Animation Section */}
      <SEOGrowthAnimation />

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50 sm:bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {t('benefits.title')}
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              {t('benefits.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={`text-center p-6 sm:p-8 bg-white sm:bg-gray-50 rounded-2xl hover:shadow-lg transition-shadow border border-gray-100 sm:border-transparent ${
                  index === 1 ? 'relative group overflow-hidden' : ''
                }`}
              >
                {index === 1 ? (
                  <>
                    {/* Bordure néon rotative pour SEO IA */}
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 border-4 animate-color-cycle"></div>
                    <div className="relative z-10">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-600 rounded-xl mb-6">
                        <img 
                          src="https://ptzpnswtgevfxfeosjfj.supabase.co/storage/v1/object/public/Images/IA-logo.avif" 
                          alt="IA Logo" 
                          className="w-8 h-8"
                        />
                      </div>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
                        <span className="bg-gradient-to-r from-yellow-400 via-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent font-bold text-xl sm:text-2xl">
                          {benefit.title}
                        </span>
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600">
                        {benefit.description}
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-600 rounded-xl mb-6">
                      {benefit.icon}
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
                      {benefit.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600">
                      {benefit.description}
                    </p>
                  </>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
                  {stat.number}
                </div>
                <div className="text-sm sm:text-base text-blue-100">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white sm:bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {t('testimonials.title')}
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 px-4">
              {t('testimonials.subtitle')}
            </p>
          </motion.div>
          
          <TestimonialsSlider />
        </div>
      </section>

      {/* Mini Audit Form Section */}
      <section className="py-20 bg-gray-50 sm:bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {t('audit.title')}
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 px-4">
              {t('audit.subtitle')}
            </p>
          </motion.div>
          
          <FormulaireAuditMini />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6">
              {t('cta.title')}
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 mb-8 px-4">
              {t('cta.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
              <Link
                to="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors group"
              >
                {t('cta.startProject')}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/tarifs"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-transparent text-white border-2 border-white font-semibold rounded-xl hover:bg-white hover:text-gray-900 transition-colors"
              >
                {t('cta.viewPricing')}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Home;