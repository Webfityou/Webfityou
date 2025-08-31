/*
  # Fix RLS policy for audit requests

  1. Security Updates
    - Add policy to allow anonymous users to insert audit requests
    - Ensure public users can submit audit forms without authentication

  2. Changes
    - Create INSERT policy for anon role on audit_requests table
*/

-- Allow anonymous users to insert audit requests
CREATE POLICY "Anonymous users can submit audit requests"
  ON audit_requests
  FOR INSERT
  TO anon
  WITH CHECK (true);