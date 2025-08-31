/*
  # Create Multilingual Blog System

  1. New Tables
    - `blog_posts`
      - `id` (uuid, primary key)
      - `slug` (text, unique identifier for the post)
      - `status` (text, published/draft)
      - `featured` (boolean, for featured articles)
      - `author_id` (uuid, reference to auth.users)
      - `category` (text, article category)
      - `tags` (text array, article tags)
      - `image_url` (text, featured image)
      - `read_time` (integer, estimated reading time)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `blog_translations`
      - `id` (uuid, primary key)
      - `post_id` (uuid, foreign key to blog_posts)
      - `language` (text, 'fr' or 'en')
      - `title` (text, translated title)
      - `excerpt` (text, translated excerpt)
      - `content` (text, translated full content)
      - `meta_title` (text, SEO title)
      - `meta_description` (text, SEO description)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for public read access
    - Add policies for authenticated users to manage their posts

  3. Indexes
    - Add indexes for performance optimization
    - Composite indexes for language filtering
*/

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  status text DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  featured boolean DEFAULT false,
  author_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  category text NOT NULL,
  tags text[] DEFAULT '{}',
  image_url text,
  read_time integer DEFAULT 5,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create blog_translations table
CREATE TABLE IF NOT EXISTS blog_translations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid REFERENCES blog_posts(id) ON DELETE CASCADE,
  language text NOT NULL CHECK (language IN ('fr', 'en')),
  title text NOT NULL,
  excerpt text NOT NULL,
  content text NOT NULL,
  meta_title text,
  meta_description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(post_id, language)
);

-- Enable RLS
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_translations ENABLE ROW LEVEL SECURITY;

-- Create policies for blog_posts
CREATE POLICY "Anyone can read published blog posts"
  ON blog_posts
  FOR SELECT
  TO public
  USING (status = 'published');

CREATE POLICY "Authors can manage their own posts"
  ON blog_posts
  FOR ALL
  TO authenticated
  USING (auth.uid() = author_id);

-- Create policies for blog_translations
CREATE POLICY "Anyone can read translations for published posts"
  ON blog_translations
  FOR SELECT
  TO public
  USING (
    EXISTS (
      SELECT 1 FROM blog_posts 
      WHERE blog_posts.id = blog_translations.post_id 
      AND blog_posts.status = 'published'
    )
  );

CREATE POLICY "Authors can manage translations for their posts"
  ON blog_translations
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM blog_posts 
      WHERE blog_posts.id = blog_translations.post_id 
      AND blog_posts.author_id = auth.uid()
    )
  );

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_featured ON blog_posts(featured);
CREATE INDEX IF NOT EXISTS idx_blog_posts_created_at ON blog_posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_translations_language ON blog_translations(language);
CREATE INDEX IF NOT EXISTS idx_blog_translations_post_language ON blog_translations(post_id, language);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_translations_updated_at
  BEFORE UPDATE ON blog_translations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();