-- This script manually updates the `raw_app_meta_data` for all users in `auth.users`
-- to include the `is_admin` claim from their corresponding `profiles` entry.
-- This is a one-time fix to synchronize existing users.

DO $$
DECLARE
    user_record RECORD;
BEGIN
    FOR user_record IN SELECT id, is_admin FROM public.profiles
    LOOP
        UPDATE auth.users
        SET raw_app_meta_data = raw_app_meta_data || jsonb_build_object('is_admin', user_record.is_admin)
        WHERE id = user_record.id;
    END LOOP;
END $$;
