/*
  # Create portfolio projects table

  1. New Tables
    - `portfolio_projects`
      - `id` (uuid, primary key)
      - `title` (text, project title)
      - `category` (text, project category)
      - `description` (text, project description)
      - `image_url` (text, project image URL)
      - `website_url` (text, live website URL)
      - `tags` (text array, project tags)
      - `featured` (boolean, is featured project)
      - `status` (text, project status - active/archived)
      - `traffic_increase` (text, traffic improvement percentage)
      - `conversion_increase` (text, conversion improvement percentage)
      - `seo_ranking` (text, SEO ranking achievement)
      - `completion_date` (date, project completion date)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `portfolio_projects` table
    - Add policy for public read access to active projects
    - Add policy for authenticated users to manage projects

  3. Indexes
    - Index on category for filtering
    - Index on featured for featured projects
    - Index on status for active projects
    - Index on completion_date for ordering
*/

CREATE TABLE IF NOT EXISTS portfolio_projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text NOT NULL,
  description text NOT NULL,
  image_url text,
  website_url text,
  tags text[] DEFAULT '{}',
  featured boolean DEFAULT false,
  status text DEFAULT 'active' CHECK (status IN ('active', 'archived')),
  traffic_increase text,
  conversion_increase text,
  seo_ranking text,
  completion_date date DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE portfolio_projects ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Anyone can read active portfolio projects"
  ON portfolio_projects
  FOR SELECT
  TO public
  USING (status = 'active');

CREATE POLICY "Authenticated users can manage portfolio projects"
  ON portfolio_projects
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_portfolio_projects_category 
  ON portfolio_projects(category);

CREATE INDEX IF NOT EXISTS idx_portfolio_projects_featured 
  ON portfolio_projects(featured);

CREATE INDEX IF NOT EXISTS idx_portfolio_projects_status 
  ON portfolio_projects(status);

CREATE INDEX IF NOT EXISTS idx_portfolio_projects_completion_date 
  ON portfolio_projects(completion_date DESC);

-- Update trigger
CREATE OR REPLACE FUNCTION update_portfolio_projects_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_portfolio_projects_updated_at
  BEFORE UPDATE ON portfolio_projects
  FOR EACH ROW
  EXECUTE FUNCTION update_portfolio_projects_updated_at();

-- Insert sample data
INSERT INTO portfolio_projects (title, category, description, image_url, website_url, tags, featured, traffic_increase, conversion_increase, seo_ranking) VALUES
('Épicerie Bio Marie', 'ecommerce', 'Site e-commerce moderne pour épicerie bio avec système de commande en ligne et livraison.', 'https://images.pexels.com/photos/3985062/pexels-photo-3985062.jpeg?w=500&h=300&fit=crop', 'https://epicerie-bio-marie.com', ARRAY['E-commerce', 'Bio', 'Livraison'], true, '+250%', '+180%', 'Top 3 Google'),
('Consultant Thomas Martin', 'services', 'Site vitrine professionnel pour consultant en stratégie d''entreprise avec prise de RDV intégrée.', 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?w=500&h=300&fit=crop', 'https://thomas-martin-conseil.com', ARRAY['Consulting', 'B2B', 'RDV'], false, '+320%', '+200%', 'Position #1'),
('Restaurant Le Petit Bistrot', 'restaurant', 'Site web élégant avec menu interactif, réservations en ligne et galerie photos.', 'https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg?w=500&h=300&fit=crop', 'https://lepetitbistrot-paris.fr', ARRAY['Restaurant', 'Réservation', 'Menu'], false, '+150%', '+120%', 'Top 5 Google'),
('Studio Yoga Zen', 'health', 'Plateforme de bien-être avec cours en ligne, planning et système de réservation.', 'https://images.pexels.com/photos/3822906/pexels-photo-3822906.jpeg?w=500&h=300&fit=crop', 'https://studio-yoga-zen.com', ARRAY['Yoga', 'Bien-être', 'Cours en ligne'], false, '+280%', '+160%', 'Top 3 Google'),
('Artisan Menuisier Moreau', 'craft', 'Showcase professionnel avec galerie de réalisations et formulaire de devis personnalisé.', 'https://images.pexels.com/photos/1251176/pexels-photo-1251176.jpeg?w=500&h=300&fit=crop', 'https://menuiserie-moreau.fr', ARRAY['Artisanat', 'Bois', 'Sur-mesure'], false, '+200%', '+140%', 'Position #2'),
('Cabinet Dentaire Smile', 'health', 'Site médical moderne avec prise de RDV en ligne, informations pratiques et équipe.', 'https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg?w=500&h=300&fit=crop', 'https://cabinet-smile.com', ARRAY['Médical', 'Dentaire', 'RDV'], false, '+190%', '+130%', 'Top 3 Google');