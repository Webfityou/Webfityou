import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface ProjetPortfolio {
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

export const useRealisations = () => {
  const [projets, setProjets] = useState<ProjetPortfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const recupererProjets = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('projets_portfolio')
        .select('*')
        .eq('status', 'active')
        .order('completion_date', { ascending: false });

      if (fetchError) {
        throw fetchError;
      }

      setProjets(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Erreur lors de la récupération des projets:', err);
    } finally {
      setLoading(false);
    }
  };

  const getProjetsByCategory = (category: string) => {
    if (category === 'all') return projets;
    return projets.filter(projet => projet.category === category);
  };

  const getProjetVedette = (): ProjetPortfolio | null => {
    return projets.find(projet => projet.featured) || projets[0] || null;
  };

  const rechercherProjets = (searchTerm: string, category: string = 'all') => {
    let filteredProjets = category === 'all' ? projets : projets.filter(projet => projet.category === category);
    
    if (!searchTerm) return filteredProjets;

    return filteredProjets.filter(projet => {
      const searchLower = searchTerm.toLowerCase();
      return (
        projet.title.toLowerCase().includes(searchLower) ||
        projet.description.toLowerCase().includes(searchLower) ||
        projet.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    });
  };

  useEffect(() => {
    recupererProjets();
  }, []);

  return {
    projets,
    loading,
    error,
    refetch: recupererProjets,
    getProjetsByCategory,
    getProjetVedette,
    rechercherProjets
  };
};