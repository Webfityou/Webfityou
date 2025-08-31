/*
  # Create pricing simulations table

  1. New Tables
    - `pricing_simulations`
      - `id` (uuid, primary key)
      - `project_type` (text) - Type de projet choisi
      - `pages` (integer) - Nombre de pages
      - `features` (text[]) - Fonctionnalités sélectionnées
      - `timeline` (text) - Délai de livraison
      - `support` (text) - Type de support
      - `estimated_price` (integer) - Prix estimé calculé
      - `first_name` (text) - Prénom du prospect
      - `last_name` (text) - Nom du prospect
      - `email` (text) - Email du prospect
      - `phone` (text, nullable) - Téléphone du prospect
      - `status` (text) - Statut de la simulation
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `pricing_simulations` table
    - Add policy for anonymous users to insert simulations
    - Add policy for authenticated users to view all simulations
*/

CREATE TABLE IF NOT EXISTS pricing_simulations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_type text NOT NULL,
  pages integer NOT NULL DEFAULT 5,
  features text[] NOT NULL DEFAULT '{}',
  timeline text NOT NULL,
  support text NOT NULL,
  estimated_price integer NOT NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE pricing_simulations ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to insert pricing simulations
CREATE POLICY "Anonymous users can submit pricing simulations"
  ON pricing_simulations
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow authenticated users to view all pricing simulations
CREATE POLICY "Authenticated users can view all pricing simulations"
  ON pricing_simulations
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users to update pricing simulations
CREATE POLICY "Authenticated users can update pricing simulations"
  ON pricing_simulations
  FOR UPDATE
  TO authenticated
  USING (true);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_pricing_simulations_created_at 
  ON pricing_simulations (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_pricing_simulations_email 
  ON pricing_simulations (email);

CREATE INDEX IF NOT EXISTS idx_pricing_simulations_status 
  ON pricing_simulations (status);

-- Add constraint for status values
ALTER TABLE pricing_simulations 
ADD CONSTRAINT pricing_simulations_status_check 
CHECK (status IN ('pending', 'contacted', 'converted', 'cancelled'));

-- Add trigger for updated_at
CREATE OR REPLACE FUNCTION update_pricing_simulations_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_pricing_simulations_updated_at
  BEFORE UPDATE ON pricing_simulations
  FOR EACH ROW
  EXECUTE FUNCTION update_pricing_simulations_updated_at();