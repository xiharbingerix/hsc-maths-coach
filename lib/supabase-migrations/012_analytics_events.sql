-- Internal analytics event log. Captures funnel and learning-product events
-- for both anonymous and authenticated students.
--
-- user_id is nullable so anonymous events can be stored before login.
-- anonymous_id persists across sessions via localStorage on the client.
-- metadata is free-form JSONB; keep values JSON-safe at the call site.

CREATE TABLE IF NOT EXISTS analytics_events (
  id           uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      uuid        REFERENCES auth.users(id) ON DELETE SET NULL,
  anonymous_id text,
  event_name   text        NOT NULL,
  page         text,
  metadata     jsonb       NOT NULL DEFAULT '{}',
  created_at   timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS analytics_events_event_name_created_at_idx
  ON analytics_events (event_name, created_at);

CREATE INDEX IF NOT EXISTS analytics_events_user_id_created_at_idx
  ON analytics_events (user_id, created_at)
  WHERE user_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS analytics_events_anonymous_id_created_at_idx
  ON analytics_events (anonymous_id, created_at)
  WHERE anonymous_id IS NOT NULL;

ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

-- Service role (used by API routes and server helpers) can insert and read.
-- No policy needed for service role — it bypasses RLS.

-- Authenticated users can read only their own events.
DROP POLICY IF EXISTS "Users can read own analytics events" ON analytics_events;
CREATE POLICY "Users can read own analytics events"
  ON analytics_events
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- No public broad read; anonymous events are write-only from the browser.
