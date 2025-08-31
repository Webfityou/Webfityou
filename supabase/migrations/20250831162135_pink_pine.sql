/*
  # Fix RLS policy for audit requests

  1. Security Changes
    - Add policy for anonymous users to insert audit requests
    - Ensure public can submit audit forms without authentication

  2. Notes
    - This allows the public audit form to work properly
    - Only INSERT permission is granted to anonymous users
    - Authenticated users retain full access for management
*/

-- Add policy to allow anonymous users to submit audit requests
CREATE POLICY "Anyone can submit audit requests"
  ON audit_requests
  FOR INSERT
  TO anon
  WITH CHECK (true);