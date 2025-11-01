-- This function is triggered when a user's profile is updated.
-- It updates the `is_admin` custom claim in the user's JWT if their admin status changes.
CREATE OR REPLACE FUNCTION public.update_admin_claim_on_profile_change()
RETURNS TRIGGER AS $$
BEGIN
  -- Check if the is_admin status has changed
  IF OLD.is_admin IS DISTINCT FROM NEW.is_admin THEN
    -- Update the user's app_metadata in the auth.users table
    UPDATE auth.users
    SET raw_app_meta_data = raw_app_meta_data || jsonb_build_object('is_admin', NEW.is_admin)
    WHERE id = NEW.id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- This trigger calls the function after a user's profile is updated.
CREATE TRIGGER on_profile_updated_update_admin_claim
  AFTER UPDATE ON public.profiles
  FOR EACH ROW EXECUTE PROCEDURE public.update_admin_claim_on_profile_change();
