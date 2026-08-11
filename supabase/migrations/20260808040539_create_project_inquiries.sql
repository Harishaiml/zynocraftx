/*
# Create project_inquiries table

1. Purpose
   Stores contact form submissions from the Zynocraftx website contact section.
   This is a single-tenant public form (no sign-in required), so anon + authenticated
   roles are granted INSERT access only. No SELECT/UPDATE/DELETE is exposed to the
   frontend — inquiries are managed server-side.

2. New Tables
   - `project_inquiries`
     - `id` (uuid, primary key)
     - `full_name` (text, not null)
     - `email` (text, not null)
     - `phone` (text, nullable)
     - `company` (text, nullable)
     - `project_type` (text, nullable)
     - `project_details` (text, not null)
     - `created_at` (timestamptz, default now)

3. Security
   - RLS enabled on `project_inquiries`.
   - INSERT policy for anon + authenticated (public contact form).
   - No SELECT/UPDATE/DELETE policies — submissions are not readable from the client.
*/

CREATE TABLE IF NOT EXISTS project_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text,
  company text,
  project_type text,
  project_details text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE project_inquiries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_inquiries" ON project_inquiries;
CREATE POLICY "anon_insert_inquiries"
ON project_inquiries FOR INSERT
TO anon, authenticated WITH CHECK (true);
