import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, Search, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useBlog } from '../hooks/useBlog';

const Blog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const { t, i18n } = useTranslation();
  const { posts, loading, error, searchPosts, getFeaturedPost, getPostTranslation } = useBlog(i18n.language);

  const categories = [
    { id: 'all', label: t('blog.categories.all') },
    { id: 'seo', label: t('blog.categories.seo') },
    { id: 'design', label: t('blog.categories.design') },
    { id: 'marketing', label: t('blog.categories.marketing') },
    { id: 'ia', label: t('blog.categories.ia') },
    { id: 'conseils', label: t('blog.categories.conseils') }
  ];

  const filteredArticles = searchPosts(searchTerm, selectedCategory);
  const featuredArticle = getFeaturedPost();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{t('common.error')}: {error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {t('common.retry')}
          </button>
        </div>
      </div>
    );
  }
  return (
    <>
      <Helmet>
        <title>{t('blog.title')} - WebFitYou</title>
        <meta name="description" content={t('blog.subtitle')} />
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
              {t('blog.title')}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto transition-colors duration-300">
              {t('blog.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={t('blog.search')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-300"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category.id
                     ? 'bg-blue-600 text-white'
                     : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {selectedCategory === 'all' && !searchTerm && (
        <section className="py-16 bg-white">
          {(() => {
            const translation = getPostTranslation(featuredArticle, i18n.language);
            if (!translation) return null;
            
            return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-2xl overflow-hidden shadow-xl"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <div className="p-8 lg:p-12 text-white">
                  <div className="inline-flex items-center px-3 py-1 bg-white/20 rounded-full text-sm font-medium mb-4">
                    {t('blog.featured')}
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-bold mb-4">
                    {translation.title}
                  </h2>
                  <p className="text-blue-100 mb-6">
                    {translation.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-blue-100 text-sm mb-6">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      WebFitYou Team
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {new Date(featuredArticle.created_at).toLocaleDateString(i18n.language === 'fr' ? 'fr-FR' : 'en-US')}
                    </div>
                  </div>
                  <Link
                    to={`/blog/${featuredArticle.slug}`}
                    className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors group"
                  >
                    {t('blog.readArticle')}
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
                <div className="relative">
                  <img
                    src={featuredArticle.image_url || ''}
                    alt={translation.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </div>
            );
          })()}
        </section>
      )}

      {/* Articles Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredArticles.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-gray-600 text-lg">
                {t('blog.noResults')}
              </p>
            </motion.div>
          ) : (
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredArticles.slice(selectedCategory === 'all' && !searchTerm && featuredArticle ? 1 : 0).map((article, index) => {
                const translation = getPostTranslation(article, i18n.language);
                if (!translation) return null;
                
                return (
                <motion.article
                  key={`${article.id}-${i18n.language}`}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={article.image_url || ''}
                      alt={translation.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">
                        {categories.find(cat => cat.id === article.category)?.label}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {translation.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {translation.excerpt}
                    </p>

                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-2" />
                        WebFitYou Team
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        {new Date(article.created_at).toLocaleDateString(i18n.language === 'fr' ? 'fr-FR' : 'en-US')}
                      </div>
                      <div>
                        {article.read_time} {t('blog.readTime')}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {article.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Link
                      to={`/blog/${article.slug}`}
                      className="inline-flex items-center text-blue-600 font-medium hover:underline group-hover:translate-x-1 transition-transform"
                    >
                      {t('blog.readMore')}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </div>
                </motion.article>
                );
              })}
            </motion.div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t('blog.newsletter.title')}
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              {t('blog.newsletter.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
              <input
                type="email"
                placeholder={t('blog.newsletter.placeholder')}
                className="flex-1 px-6 py-4 bg-white text-gray-900 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <button className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors">
                {t('blog.newsletter.subscribe')}
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Blog;