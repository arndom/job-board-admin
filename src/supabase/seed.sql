
-- ==========================================
-- JOBS SEED
-- ==========================================
INSERT INTO jobs (
  company_name,
  company_logo,
  title,
  status,
  location,
  remote_type,
  country,
  timezone,
  salary,
  description,
  requirements,
  benefits,
  company_size,
  seniority_level,
  job_type,
  skills
) VALUES
-- 🇺🇸 USA
('NotGoogle', 'https://logo.clearbit.com/google.com', 'Software Engineer', 'open', 'Mountain View, CA', 'onsite', 'United States', 'PST', '$130k–$180k', 'Work on core infrastructure.',
  ARRAY['BSc in CS', '3+ years experience', 'Go or Python'], ARRAY['401k', 'Free meals', 'Healthcare'], '10,000+', 'mid-level', 'full-time', ARRAY['Go', 'Python', 'Kubernetes']),
-- 🇬🇧 UK
('NotGoogle', 'https://logo.clearbit.com/google.com', 'Backend Engineer', 'open', 'London', 'hybrid', 'United Kingdom', 'GMT', '£60k–£85k', 'Work on core banking APIs.',
  ARRAY['3+ years backend', 'PostgreSQL', 'Kubernetes'], ARRAY['Equity', 'Remote budget'], '500+', 'mid-level', 'full-time', ARRAY['Go', 'PostgreSQL', 'Docker']),
-- 🇩🇪 Germany
('NotGoogle', 'https://logo.clearbit.com/google.com', 'Embedded Systems Engineer', 'open', 'Berlin', 'onsite', 'Germany', 'CET', '€70k–€95k', 'Work on industrial IoT.',
  ARRAY['C/C++', 'RTOS', 'Electronics knowledge'], ARRAY['Relocation support', 'Bonus'], '10,000+', 'senior', 'full-time', ARRAY['C++', 'IoT']),
-- 🇳🇱 Netherlands
('NotGoogle', 'https://logo.clearbit.com/google.com', 'Site Reliability Engineer', 'open', 'Amsterdam', 'remote', 'Netherlands', 'CET', '€80k–€110k', 'Ensure uptime of critical systems.',
  ARRAY['Terraform', 'AWS', 'CI/CD'], ARRAY['Stock options', 'Lunch allowance'], '2000+', 'senior', 'full-time', ARRAY['AWS', 'Terraform', 'CI/CD']),
-- 🇫🇷 France
('NotGoogle', 'https://logo.clearbit.com/google.com', 'Data Engineer', 'open', 'Paris', 'hybrid', 'France', 'CET', '€65k–€85k', 'Build streaming data pipelines.',
  ARRAY['Spark', 'Kafka', 'SQL'], ARRAY['Flexible hours', 'Music perks'], '500+', 'mid-level', 'full-time', ARRAY['Spark', 'Kafka', 'SQL']),
-- 🇸🇬 Singapore
('NotGoogle', 'https://logo.clearbit.com/google.com', 'Mobile Developer', 'open', 'Singapore', 'onsite', 'Singapore', 'SGT', 'SGD 90k–SGD 130k', 'Develop superapp features.',
  ARRAY['Flutter or Kotlin', '3+ years mobile'], ARRAY['Transport credit', 'Healthcare'], '5000+', 'mid-level', 'full-time', ARRAY['Flutter', 'Kotlin', 'Android']),
-- 🇮🇳 India
('NotGoogle', 'https://logo.clearbit.com/google.com', 'Frontend Engineer', 'open', 'Bangalore', 'remote', 'India', 'IST', '₹18L–₹28L', 'Build trading interfaces.',
  ARRAY['React', 'TypeScript', 'UX experience'], ARRAY['Remote-first', 'Stock options'], '200+', 'senior', 'full-time', ARRAY['React', 'TypeScript']),
-- 🇦🇺 Australia
('NotGoogle', 'https://logo.clearbit.com/google.com', 'Product Designer', 'open', 'Sydney', 'hybrid', 'Australia', 'AEST', 'AUD 110k–AUD 150k', 'Design collaborative tools.',
  ARRAY['Figma', 'Design systems', 'Prototyping'], ARRAY['Stock options', 'Flexible work'], '2000+', 'mid-level', 'full-time', ARRAY['UX', 'Figma', 'Prototyping']);