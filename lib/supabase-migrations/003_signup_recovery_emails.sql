CREATE TABLE IF NOT EXISTS signup_recovery_emails (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  reason text NOT NULL DEFAULT 'signup_no_payment',
  sent_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, reason)
);

ALTER TABLE signup_recovery_emails ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS signup_recovery_emails_reason_sent_idx
  ON signup_recovery_emails (reason, sent_at DESC);
