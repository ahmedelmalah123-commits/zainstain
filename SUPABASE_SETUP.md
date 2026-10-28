# Registration database setup

The registration form writes to the course_registrations table and then sends
an EmailJS notification. The browser can insert new rows; it cannot read, edit,
or delete registration records.

## Create the Supabase project

1. Open the [Supabase Dashboard](https://supabase.com/dashboard) and create a project.
2. In the project, open SQL Editor and run
   supabase/migrations/20261028000000_course_registrations.sql.
3. In Connect or Settings → API Keys, copy the Project URL and publishable key.
4. Set these variables in a local .env file and in Vercel's project
   Environment Variables:

       VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
       VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_your_key

5. Redeploy the Vercel project after saving its environment variables.

## View new registrations

In the Supabase project, open Table Editor → course_registrations. New
registrations appear there with status new; update the status to contacted or
enrolled as you follow up.

The publishable key is intended for browser use, with the migration's Row Level
Security policy limiting visitors to new inserts. Never put a Supabase secret
or service-role key in the website or Vercel's VITE_ variables.

## Email notification template

The form sends from_name, from_email, phone, age, governorate, and study_info
to the configured EmailJS template. Add those variables to the template content
so the notification email includes all registration details.
