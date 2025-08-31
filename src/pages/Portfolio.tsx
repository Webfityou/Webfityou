import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ExternalLink, Eye, Filter } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  url: string;
  tags: string[];
  results: {
    traffic: string;
    conversion: string;
    ranking: string;
  };
}

const Portfolio: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { t } = useTranslation();

  const categories = [
    { id: 'all', label: t('portfolio.categories.all') },
    { id: 'ecommerce', label: t('portfolio.categories.ecommerce') },
    { id: 'services', label: t('portfolio.categories.services') },
    { id: 'restaurant', label: t('portfolio.categories.restaurant') },
    { id: 'health', label: t('portfolio.categories.health') },
    { id: 'craft', label: t('portfolio.categories.craft') }
  ];

  const projects: Project[] = [
    {
      id: 1,
      title: "Épicerie Bio Marie",
      category: "ecommerce",
      description: "Site e-commerce moderne pour épicerie bio avec système de commande en ligne et livraison.",
      image: "https://images.pexels.com/photos/3985062/pexels-photo-3985062.jpeg?w=500&h=300&fit=crop",
      url: "https://epicerie-bio-marie.com",
      tags: ["E-commerce", "Bio", "Livraison"],
      results: {
        traffic: "+250%",
        conversion: "+180%",
        ranking: "Top 3 Google"
      }
    },
    {
      id: 2,
      title: "Consultant Thomas Martin",
      category: "services",
      description: "Site vitrine professionnel pour consultant en stratégie d'entreprise avec prise de RDV intégrée.",
      image: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?w=500&h=300&fit=crop",
      url: "https://thomas-martin-conseil.com",
      tags: ["Consulting", "B2B", "RDV"],
      results: {
        traffic: "+320%",
        conversion: "+200%",
        ranking: "Position #1"
      }
    },
    {
      id: 3,
      title: "Restaurant Le Petit Bistrot",
      category: "restaurant",
      description: "Site web élégant avec menu interactif, réservations en ligne et galerie photos.",
      image: "https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg?w=500&h=300&fit=crop",
      url: "https://lepetitbistrot-paris.fr",
      tags: ["Restaurant", "Réservation", "Menu"],
      results: {
        traffic: "+150%",
        conversion: "+120%",
        ranking: "Top 5 Google"
      }
    },
    {
      id: 4,
      title: "Studio Yoga Zen",
      category: "health",
      description: "Plateforme de bien-être avec cours en ligne, planning et système de réservation.",
      image: "https://images.pexels.com/photos/3822906/pexels-photo-3822906.jpeg?w=500&h=300&fit=crop",
      url: "https://studio-yoga-zen.com",
      tags: ["Yoga", "Bien-être", "Cours en ligne"],
      results: {
        traffic: "+280%",
        conversion: "+160%",
        ranking: "Top 3 Google"
      }
    },
    {
      id: 5,
      title: "Artisan Menuisier Moreau",
      category: "craft",
      description: "Showcase professionnel avec galerie de réalisations et formulaire de devis personnalisé.",
      image: "https://images.pexels.com/photos/1251176/pexels-photo-1251176.jpeg?w=500&h=300&fit=crop",
      url: "https://menuiserie-moreau.fr",
      tags: ["Artisanat", "Bois", "Sur-mesure"],
      results: {
        traffic: "+200%",
        conversion: "+140%",
        ranking: "Position #2"
      }
    },
    {
      id: 6,
      title: "Cabinet Dentaire Smile",
      category: "health",
      description: "Site médical moderne avec prise de RDV en ligne, informations pratiques et équipe.",
      image: "https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg?w=500&h=300&fit=crop",
      url: "https://cabinet-smile.com",
      tags: ["Médical", "Dentaire", "RDV"],
      results: {
        traffic: "+190%",
        conversion: "+130%",
        ranking: "Top 3 Google"
      }
    }
  ];

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  return (
    <>
      <Helmet>
        <title>{t('portfolio.title')} - WebFitYou</title>
        <meta name="description" content={t('portfolio.subtitle')} />
      </Helmet>

      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-blue-50 via-white to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {t('portfolio.title')}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('portfolio.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            layout 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-blue-600 bg-opacity-0 group-hover:bg-opacity-90 transition-all duration-300 flex items-center justify-center">
                    <Eye className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-blue-100 text-blue-600 text-xs font-medium rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-lg font-bold text-green-600">
                        {project.results.traffic}
                      </div>
                      <div className="text-xs text-gray-500">{t('portfolio.results.traffic')}</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-blue-600">
                        {project.results.conversion}
                      </div>
                      <div className="text-xs text-gray-500">{t('portfolio.results.conversion')}</div>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-orange-600">
                        {project.results.ranking}
                      </div>
                      <div className="text-xs text-gray-500">{t('portfolio.results.seo')}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Project Modal */}
      {selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-64 md:h-80 object-cover"
              />
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {selectedProject.title}
              </h2>
              <p className="text-gray-600 mb-6">
                {t('portfolio.noResults')}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    {selectedProject.results.traffic}
                  </div>
                  <div className="text-sm text-gray-600">Augmentation du trafic</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    {selectedProject.results.conversion}
                  </div>
                  <div className="text-sm text-gray-600">Taux de conversion</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-xl">
                  <div className="text-sm font-bold text-orange-600 mb-1">
                    {selectedProject.results.ranking}
                  </div>
                  <div className="text-sm text-gray-600">Positionnement SEO</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {selectedProject.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <a
                href={selectedProject.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
              >
                <ExternalLink className="w-5 h-5 mr-2" />
                {t('portfolio.viewSite')}
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default Portfolio;