/*
  # Renommer les tables en français

  1. Renommage des tables
    - `audit_requests` → `demandes_audit`
    - `pricing_simulations` → `simulations_tarifs`
    - `blog_posts` → `articles_blog`
    - `blog_translations` → `traductions_articles`
    - `portfolio_projects` → `projets_portfolio`

  2. Mise à jour des contraintes et index
    - Renommage automatique des contraintes et index
    - Conservation de toutes les politiques RLS
    - Conservation des triggers et fonctions

  3. Sécurité
    - Toutes les politiques RLS sont préservées
    - Aucune perte de données
*/

-- Renommer les tables principales
ALTER TABLE IF EXISTS audit_requests RENAME TO demandes_audit;
ALTER TABLE IF EXISTS pricing_simulations RENAME TO simulations_tarifs;
ALTER TABLE IF EXISTS blog_posts RENAME TO articles_blog;
ALTER TABLE IF EXISTS blog_translations RENAME TO traductions_articles;
ALTER TABLE IF EXISTS portfolio_projects RENAME TO projets_portfolio;

-- Mettre à jour les contraintes de clés étrangères
DO $$
BEGIN
  -- Contrainte pour traductions_articles
  IF EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'blog_translations_post_id_fkey'
  ) THEN
    ALTER TABLE traductions_articles 
    DROP CONSTRAINT blog_translations_post_id_fkey;
    
    ALTER TABLE traductions_articles 
    ADD CONSTRAINT traductions_articles_post_id_fkey 
    FOREIGN KEY (post_id) REFERENCES articles_blog(id) ON DELETE CASCADE;
  END IF;
END $$;