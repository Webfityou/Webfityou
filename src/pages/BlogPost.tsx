import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowLeft, Share2, Clock, Tag } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { BlogPost as BlogPostType, BlogTranslation } from '../hooks/useBlog';

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [translation, setTranslation] = useState<BlogTranslation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;

      try {
        setLoading(true);
        setError(null);

        const { data, error: fetchError } = await supabase
          .from('blog_posts')
          .select(`
            *,
            translations:blog_translations(*)
          `)
          .eq('slug', slug)
          .eq('status', 'published')
          .single();

        if (fetchError) {
          throw fetchError;
        }

        setPost(data);
        
        // Find translation for current language
        const currentTranslation = data.translations.find(
          (t: BlogTranslation) => t.language === i18n.language
        );
        
        // Fallback to French if English not available
        const fallbackTranslation = data.translations.find(
          (t: BlogTranslation) => t.language === 'fr'
        );
        
        setTranslation(currentTranslation || fallbackTranslation || null);

      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching blog post:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug, i18n.language]);

  const handleShare = async () => {
    if (navigator.share && translation) {
      try {
        await navigator.share({
          title: translation.title,
          text: translation.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert(t('blog.post.linkCopied'));
    }
  };

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

  if (error || !post || !translation) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {t('blog.post.notFound')}
          </h1>
          <p className="text-gray-600 mb-6">
            {error || t('blog.post.notFoundDescription')}
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            {t('blog.post.backToBlog')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{translation.meta_title || translation.title} - WebFitYou</title>
        <meta name="description" content={translation.meta_description || translation.excerpt} />
        <meta property="og:title" content={translation.title} />
        <meta property="og:description" content={translation.excerpt} />
        <meta property="og:image" content={post.image_url || ''} />
        <meta property="og:type" content="article" />
      </Helmet>

      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-blue-50 via-white to-teal-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Back Button */}
            <Link
              to="/blog"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8 group"
            >
              <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              {t('blog.post.backToBlog')}
            </Link>

            {/* Article Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
              <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full font-medium">
                {categories.find(cat => cat.id === post.category)?.label || post.category}
              </span>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                {new Date(post.created_at).toLocaleDateString(i18n.language === 'fr' ? 'fr-FR' : 'en-US')}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                {post.read_time} {t('blog.readTime')}
              </div>
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                WebFitYou Team
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {translation.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {translation.excerpt}
            </p>

            {/* Share Button */}
            <button
              onClick={handleShare}
              className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Share2 className="w-4 h-4 mr-2" />
              {t('blog.post.share')}
            </button>
          </motion.div>
        </div>
      </section>

      {/* Featured Image */}
      {post.image_url && (
        <section className="py-8 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <img
                src={post.image_url}
                alt={translation.title}
                className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-lg"
              />
            </motion.div>
          </div>
        </section>
      )}

      {/* Article Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="prose prose-lg max-w-none"
          >
            <div 
              className="text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ 
                __html: translation.content.replace(/\n/g, '<br>').replace(/## (.*)/g, '<h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">$1</h2>').replace(/### (.*)/g, '<h3 class="text-xl font-semibold text-gray-900 mt-6 mb-3">$1</h3>') 
              }}
            />
          </motion.div>

          {/* Tags */}
          {post.tags.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-12 pt-8 border-t border-gray-200"
            >
              <div className="flex items-center mb-4">
                <Tag className="w-5 h-5 text-gray-600 mr-2" />
                <span className="font-medium text-gray-900">{t('blog.post.tags')}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full hover:bg-gray-200 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              {t('blog.post.ctaTitle')}
            </h2>
            <p className="text-gray-600 mb-8">
              {t('blog.post.ctaSubtitle')}
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors group"
            >
              {t('blog.post.ctaButton')}
              <ArrowLeft className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default BlogPost;