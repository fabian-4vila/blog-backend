DO $$ 
BEGIN
    IF NOT EXISTS (SELECT FROM pg_database WHERE datname = 'DB_Blog') THEN
        CREATE DATABASE DB_Blog;
    END IF;
END $$;
