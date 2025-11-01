-- This function is triggered when a new user signs up.
-- It adds a custom claim, `is_admin`, to the user's JWT.
CREATE OR REPLACE FUNCTION public.add_admin_claim_to_jwt()
RETURNS TRIGGER AS $$
BEGIN
  -- Check if the user is an admin by querying the profiles table
  IF (SELECT is_admin FROM public.profiles WHERE id = NEW.id) THEN
    -- If they are an admin, set the `is_admin` claim to `true`
    NEW.raw_app_meta_data = NEW.raw_app_meta_data || jsonb_build_object('is_admin', true);
  ELSE
    -- Otherwise, set the `is_admin` claim to `false`
    NEW.raw_app_meta_data = NEW.raw_app_meta_data || jsonb_build_object('is_admin', false);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- This trigger calls the function before a new user is inserted into the auth.users table.
CREATE TRIGGER on_user_created_add_admin_claim
  BEFORE INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.add_admin_claim_to_jwt();
