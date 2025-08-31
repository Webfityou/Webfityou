import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface BlogPost {
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

export interface BlogTranslation {
  language: string;
  title: string;
  excerpt: string;
  content: string;
  meta_title: string;
  meta_description: string;
}

export const useBlog = (language: string = 'fr') => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('blog_posts')
        .select(`
          *,
          translations:blog_translations(*)
        `)
        .eq('status', 'published')
        .order('created_at', { ascending: false });

      if (fetchError) {
        throw fetchError;
      }

      setPosts(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching blog posts:', err);
    } finally {
      setLoading(false);
    }
  };

  const getPostsByCategory = (category: string) => {
    if (category === 'all') return posts;
    return posts.filter(post => post.category === category);
  };

  const getPostTranslation = (post: BlogPost, lang: string): BlogTranslation | null => {
    return post.translations.find(t => t.language === lang) || null;
  };

  const searchPosts = (searchTerm: string, category: string = 'all') => {
    let filteredPosts = category === 'all' ? posts : posts.filter(post => post.category === category);
    
    if (!searchTerm) return filteredPosts;

    return filteredPosts.filter(post => {
      const translation = getPostTranslation(post, language);
      if (!translation) return false;

      const searchLower = searchTerm.toLowerCase();
      return (
        translation.title.toLowerCase().includes(searchLower) ||
        translation.excerpt.toLowerCase().includes(searchLower) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    });
  };

  const getFeaturedPost = (): BlogPost | null => {
    return posts.find(post => post.featured) || posts[0] || null;
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return {
    posts,
    loading,
    error,
    refetch: fetchPosts,
    getPostsByCategory,
    getPostTranslation,
    searchPosts,
    getFeaturedPost
  };
};