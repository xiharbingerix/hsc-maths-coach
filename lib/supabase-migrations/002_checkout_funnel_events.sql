CREATE TABLE IF NOT EXISTS checkout_funnel_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  offer_selected text NOT NULL,
  stripe_checkout_session_id text NOT NULL UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE checkout_funnel_events ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS checkout_funnel_events_user_offer_idx
  ON checkout_funnel_events (user_id, offer_selected, created_at DESC);
