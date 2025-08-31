/*
  # Fix RLS policy for audit_requests table

  1. Security Changes
    - Add policy to allow anonymous users to insert audit requests
    - This enables the audit form to work for website visitors who are not authenticated

  2. Important Notes
    - Only INSERT operations are allowed for anonymous users
    - All other operations (SELECT, UPDATE, DELETE) remain restricted to authenticated users
    - This maintains security while allowing form submissions
*/

-- Add policy to allow anonymous users to submit audit requests
CREATE POLICY "Allow anonymous audit submissions"
  ON audit_requests
  FOR INSERT
  TO anon
  WITH CHECK (true);