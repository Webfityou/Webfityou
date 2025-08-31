/*
  # Create audit requests table

  1. New Tables
    - `audit_requests`
      - `id` (uuid, primary key)
      - `website` (text, optional)
      - `business_sector` (text)
      - `goals` (text array)
      - `budget` (text)
      - `first_name` (text)
      - `last_name` (text)
      - `email` (text)
      - `phone` (text, optional)
      - `status` (text, default 'pending')
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `audit_requests` table
    - Add policy for authenticated users to manage audit requests
    - Add policy for public users to insert audit requests

  3. Indexes
    - Index on email for faster lookups
    - Index on status for filtering
    - Index on created_at for sorting
*/

CREATE TABLE IF NOT EXISTS audit_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  website text,
  business_sector text NOT NULL,
  goals text[] NOT NULL DEFAULT '{}',
  budget text NOT NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE audit_requests ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Anyone can submit audit requests"
  ON audit_requests
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all audit requests"
  ON audit_requests
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update audit requests"
  ON audit_requests
  FOR UPDATE
  TO authenticated
  USING (true);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_audit_requests_email ON audit_requests(email);
CREATE INDEX IF NOT EXISTS idx_audit_requests_status ON audit_requests(status);
CREATE INDEX IF NOT EXISTS idx_audit_requests_created_at ON audit_requests(created_at DESC);

-- Status constraint
ALTER TABLE audit_requests 
ADD CONSTRAINT audit_requests_status_check 
CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled'));

-- Update trigger
CREATE OR REPLACE FUNCTION update_audit_requests_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_audit_requests_updated_at
  BEFORE UPDATE ON audit_requests
  FOR EACH ROW
  EXECUTE FUNCTION update_audit_requests_updated_at();