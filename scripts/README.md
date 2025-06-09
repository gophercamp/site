# Database Setup for Gophercamp 2026 Website

This directory contains the SQL script for setting up the database for the Gophercamp 2026 website.

## File

- `setup-database.sql` - SQL script containing the database schema definition

## Prerequisites

Before setting up the database, ensure that you have:

1. Created a Supabase project at [supabase.com](https://supabase.com)
2. Access to the Supabase project dashboard

## Usage

To set up the database manually:

1. Go to your Supabase dashboard
2. Navigate to the SQL Editor
3. Copy the contents of `setup-database.sql`
4. Paste it into the SQL Editor and run it

The SQL script is designed to be idempotent, meaning it can be run multiple times without causing duplicate entities or errors.

#### What it creates

- **Speakers table**: For storing information about conference speakers
- **Sessions table**: For storing information about conference sessions/talks
- **Newsletter subscribers table**: For storing newsletter subscription information
- **Row Level Security (RLS) policies**: To ensure proper data access control
- **Indexes**: For optimizing query performance
- **Triggers**: For automatically updating timestamps

#### Verification

After running the script, you can verify the setup by:

1. Checking your Supabase dashboard's "Table Editor" section to confirm tables were created
2. Testing the application functionality that interacts with the database
3. Checking the console output for any errors or warnings

## Database Schema

For more detailed information about the database schema, please refer to the [SUPABASE_COMPLETE_SETUP.md](/docs/SUPABASE_COMPLETE_SETUP.md) document in the docs directory.

## Troubleshooting

If you encounter any issues:

- Ensure your Supabase URL and service role key are correct
- Check that you have the necessary permissions in your Supabase project
- Verify that your Supabase project is active and operational
- Check the console output for specific error messages
