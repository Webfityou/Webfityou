import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Database {
  public: {
    Tables: {
      articles_blog: {
        Row: {
          id: string;
          slug: string;
          status: string;
          featured: boolean;
          author_id: string | null;
          category: string;
          tags: string[];
          image_url: string | null;
          read_time: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          status?: string;
          featured?: boolean;
          author_id?: string | null;
          category: string;
          tags?: string[];
          image_url?: string | null;
          read_time?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          status?: string;
          featured?: boolean;
          author_id?: string | null;
          category?: string;
          tags?: string[];
          image_url?: string | null;
          read_time?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      traductions_articles: {
        Row: {
          id: string;
          post_id: string;
          language: string;
          title: string;
          excerpt: string;
          content: string;
          meta_title: string | null;
          meta_description: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          post_id: string;
          language: string;
          title: string;
          excerpt: string;
          content: string;
          meta_title?: string | null;
          meta_description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          post_id?: string;
          language?: string;
          title?: string;
          excerpt?: string;
          content?: string;
          meta_title?: string | null;
          meta_description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      demandes_audit: {
        Row: {
          id: string;
          website: string | null;
          business_sector: string;
          goals: string[];
          budget: string;
          first_name: string;
          last_name: string;
          email: string;
          phone: string | null;
          status: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          website?: string | null;
          business_sector: string;
          goals: string[];
          budget: string;
          first_name: string;
          last_name: string;
          email: string;
          phone?: string | null;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          website?: string | null;
          business_sector?: string;
          goals?: string[];
          budget?: string;
          first_name?: string;
          last_name?: string;
          email?: string;
          phone?: string | null;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      simulations_tarifs: {
        Row: {
          id: string;
          project_type: string;
          pages: number;
          features: string[];
          timeline: string;
          support: string;
          estimated_price: number;
          first_name: string;
          last_name: string;
          email: string;
          phone: string | null;
          status: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          project_type: string;
          pages: number;
          features: string[];
          timeline: string;
          support: string;
          estimated_price: number;
          first_name: string;
          last_name: string;
          email: string;
          phone?: string | null;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          project_type?: string;
          pages?: number;
          features?: string[];
          timeline?: string;
          support?: string;
          estimated_price?: number;
          first_name?: string;
          last_name?: string;
          email?: string;
          phone?: string | null;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      projets_portfolio: {
        Row: {
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
        };
        Insert: {
          id?: string;
          title: string;
          category: string;
          description: string;
          image_url?: string | null;
          website_url?: string | null;
          tags?: string[];
          featured?: boolean;
          status?: string;
          traffic_increase?: string | null;
          conversion_increase?: string | null;
          seo_ranking?: string | null;
          completion_date?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          category?: string;
          description?: string;
          image_url?: string | null;
          website_url?: string | null;
          tags?: string[];
          featured?: boolean;
          status?: string;
          traffic_increase?: string | null;
          conversion_increase?: string | null;
          seo_ranking?: string | null;
          completion_date?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}