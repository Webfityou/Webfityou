import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface ArticleBlog {
  id: string;
  slug: string;
  status: string;
  featured: boolean;
  category: string;
  tags: string[];
  image_url: string;
  read_time: number;
  created_at: string;
  updated_at: string;
  translations: {
    language: string;
    title: string;
    excerpt: string;
    content: string;
    meta_title: string;
    meta_description: string;
  }[];
}

export interface TraductionArticle {
  language: string;
  title: string;
  excerpt: string;
  content: string;
  meta_title: string;
  meta_description: string;
}

export const useArticlesBlog = (language: string = 'fr') => {
  const [articles, setArticles] = useState<ArticleBlog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const recupererArticles = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('articles_blog')
        .select(`
          *,
          translations:traductions_articles(*)
        `)
        .eq('status', 'published')
        .order('created_at', { ascending: false });

      if (fetchError) {
        throw fetchError;
      }

      setArticles(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Erreur lors de la récupération des articles:', err);
    } finally {
      setLoading(false);
    }
  };

  const getArticlesByCategory = (category: string) => {
    if (category === 'all') return articles;
    return articles.filter(article => article.category === category);
  };

  const getTraductionArticle = (article: ArticleBlog, lang: string): TraductionArticle | null => {
    return article.translations.find(t => t.language === lang) || null;
  };

  const rechercherArticles = (searchTerm: string, category: string = 'all') => {
    let filteredArticles = category === 'all' ? articles : articles.filter(article => article.category === category);
    
    if (!searchTerm) return filteredArticles;

    return filteredArticles.filter(article => {
      const translation = getTraductionArticle(article, language);
      if (!translation) return false;

      const searchLower = searchTerm.toLowerCase();
      return (
        translation.title.toLowerCase().includes(searchLower) ||
        translation.excerpt.toLowerCase().includes(searchLower) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    });
  };

  const getArticleVedette = (): ArticleBlog | null => {
    return articles.find(article => article.featured) || articles[0] || null;
  };

  useEffect(() => {
    recupererArticles();
  }, []);

  return {
    articles,
    loading,
    error,
    refetch: recupererArticles,
    getArticlesByCategory,
    getTraductionArticle,
    rechercherArticles,
    getArticleVedette
  };
};