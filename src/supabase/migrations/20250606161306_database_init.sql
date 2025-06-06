CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ========================
-- ENUM TYPES
-- ========================

CREATE TYPE job_status AS ENUM ('open', 'interviewing', 'closed');
CREATE TYPE remote_type_enum AS ENUM ('remote', 'hybrid', 'onsite');
CREATE TYPE application_status AS ENUM ('callback', 'interviewing', 'rejected');
CREATE TYPE job_type_enum AS ENUM ('full-time', 'part-time', 'contract', 'internship');
CREATE TYPE seniority_level_enum AS ENUM ('junior', 'mid-level', 'senior');

-- ========================
-- JOBS TABLE
-- ========================

CREATE TABLE jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name TEXT NOT NULL,
  company_logo TEXT,
  title TEXT NOT NULL,
  status job_status DEFAULT 'open',
  location TEXT,
  remote_type remote_type_enum DEFAULT 'onsite',
  job_type job_type_enum DEFAULT 'full-time',
  country TEXT,
  timezone TEXT,
  salary TEXT,
  description TEXT,
  requirements TEXT[],
  benefits TEXT[],
  company_size TEXT,
  seniority_level seniority_level_enum DEFAULT 'mid-level',
  skills TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ========================
-- APPLICANTS TABLE
-- ========================

CREATE TABLE applicants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  timezone TEXT,
  location TEXT,
  trust_level INTEGER DEFAULT 0,
  job_preferences JSONB, -- optional structured data like categories/roles
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ========================
-- APPLICATIONS TABLE
-- ========================

CREATE TABLE applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID REFERENCES jobs(id) ON DELETE CASCADE,
  applicant_id UUID REFERENCES applicants(id) ON DELETE CASCADE,
  date_applied TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  skill_match INTEGER CHECK (skill_match BETWEEN 0 AND 100),
  seniority_level TEXT,
  has_cover_letter BOOLEAN DEFAULT false,
  has_cv BOOLEAN DEFAULT false,
  status application_status DEFAULT 'callback',
  cv_sentiment TEXT,
  cover_letter_sentiment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ================================
-- 1. Add last_modified columns
-- ================================
ALTER TABLE jobs ADD COLUMN last_modified TIMESTAMPTZ DEFAULT NOW();
ALTER TABLE applicants ADD COLUMN last_modified TIMESTAMPTZ DEFAULT NOW();
ALTER TABLE applications ADD COLUMN last_modified TIMESTAMPTZ DEFAULT NOW();

-- ================================
-- 2. Create trigger function
-- ================================
CREATE OR REPLACE FUNCTION update_last_modified_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.last_modified = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ================================
-- 3. Add triggers to each table
-- ================================

-- Jobs table trigger
CREATE TRIGGER set_last_modified_jobs
BEFORE UPDATE ON jobs
FOR EACH ROW
EXECUTE FUNCTION update_last_modified_column();

-- Applicants table trigger
CREATE TRIGGER set_last_modified_applicants
BEFORE UPDATE ON applicants
FOR EACH ROW
EXECUTE FUNCTION update_last_modified_column();

-- Applications table trigger
CREATE TRIGGER set_last_modified_applications
BEFORE UPDATE ON applications
FOR EACH ROW
EXECUTE FUNCTION update_last_modified_column();

-- ================================
-- 3. Transform job columns
-- ================================

-- Step 1: Add temporary columns to hold the joined text
ALTER TABLE jobs
ADD COLUMN requirements_text text,
ADD COLUMN benefits_text text,
ADD COLUMN skills_text text;

-- Step 2: Populate the temporary columns by joining array values
UPDATE jobs
SET
  requirements_text = array_to_string(requirements, ', '),
  benefits_text = array_to_string(benefits, ', '),
  skills_text = array_to_string(skills, ', ');

-- Step 3: Drop the original array columns
ALTER TABLE jobs
DROP COLUMN requirements,
DROP COLUMN benefits,
DROP COLUMN skills;

-- Step 4: Rename temporary columns to original names
ALTER TABLE jobs RENAME COLUMN requirements_text TO requirements;
ALTER TABLE jobs RENAME COLUMN benefits_text TO benefits;
ALTER TABLE jobs RENAME COLUMN skills_text TO skills;

-- ================================
-- 3. Rename skill_match column
-- ================================

ALTER TABLE applications RENAME COLUMN skill_match TO match;

-- ================================
-- 3. Add cv and cover letter urls
-- ================================

ALTER TABLE applicants
ADD COLUMN cv_url TEXT,
ADD COLUMN cover_letter_url TEXT;

-- ================================
-- Add hired status to application status
-- ================================

ALTER TYPE application_status ADD VALUE IF NOT EXISTS 'hired';

-- ================================
-- Add email column and trigger for jobs
-- ================================

-- 1. Add the email column to the jobs table
ALTER TABLE jobs ADD COLUMN email TEXT UNIQUE;

-- 2. Create function to generate short, unique job email
CREATE OR REPLACE FUNCTION set_job_email()
RETURNS TRIGGER AS $$
DECLARE
  random_prefix TEXT;
BEGIN
  LOOP
    -- Generate a random 6-character string (alphanumeric)
    random_prefix := LOWER(encode(gen_random_bytes(4), 'hex'))::text;
    random_prefix := LEFT(random_prefix, 6);

    -- Check uniqueness
    EXIT WHEN NOT EXISTS (
      SELECT 1 FROM jobs WHERE email = random_prefix || '@jobs.arndom.dev'
    );
  END LOOP;

  NEW.email := random_prefix || '@jobs.arndom.dev';
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 3. Attach the trigger to jobs table
CREATE TRIGGER generate_job_email
BEFORE INSERT ON jobs
FOR EACH ROW
WHEN (NEW.email IS NULL)
EXECUTE FUNCTION set_job_email();

-- ================================
-- Add email tracking table
-- ================================

CREATE TABLE emails (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id UUID REFERENCES applications(id) ON DELETE CASCADE,
  sender_type TEXT CHECK (sender_type IN ('admin', 'applicant')) NOT NULL,
  subject TEXT,
  body TEXT,
  sent_at TIMESTAMPTZ DEFAULT NOW(),
  direction TEXT CHECK (direction IN ('inbound', 'outbound')) NOT NULL,
  message_id TEXT,
  in_reply_to TEXT
);

