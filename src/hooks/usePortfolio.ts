import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface PortfolioProject {
  id: string;
  title: string;
  category: string;
  description: string;
  image_url: string | null;
  website_url: string | null;
  tags: string[];
  featured: boolean;
  status: string;
  traffic_increase: string | null;
  conversion_increase: string | null;
  seo_ranking: string | null;
  completion_date: string;
  created_at: string;
  updated_at: string;
}

export const usePortfolio = () => {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('portfolio_projects')
        .select('*')
        .eq('status', 'active')
        .order('completion_date', { ascending: false });

      if (fetchError) {
        throw fetchError;
      }

      setProjects(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching portfolio projects:', err);
    } finally {
      setLoading(false);
    }
  };

  const getProjectsByCategory = (category: string) => {
    if (category === 'all') return projects;
    return projects.filter(project => project.category === category);
  };

  const getFeaturedProject = (): PortfolioProject | null => {
    return projects.find(project => project.featured) || projects[0] || null;
  };

  const searchProjects = (searchTerm: string, category: string = 'all') => {
    let filteredProjects = category === 'all' ? projects : projects.filter(project => project.category === category);
    
    if (!searchTerm) return filteredProjects;

    return filteredProjects.filter(project => {
      const searchLower = searchTerm.toLowerCase();
      return (
        project.title.toLowerCase().includes(searchLower) ||
        project.description.toLowerCase().includes(searchLower) ||
        project.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    });
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return {
    projects,
    loading,
    error,
    refetch: fetchProjects,
    getProjectsByCategory,
    getFeaturedProject,
    searchProjects
  };
};