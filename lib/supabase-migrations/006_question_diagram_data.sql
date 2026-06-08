ALTER TABLE questions
  ADD COLUMN IF NOT EXISTS diagram_data jsonb;

COMMENT ON COLUMN questions.diagram_data IS
  'Serialised diagram object from PracticeQuestion. Shape: { type: string, ...fields }. Possible types: cartesianGraph | triangleDiagram | trapezoidalRuleDiagram | boxPlotDiagram | normalDistributionDiagram | probabilityTreeDiagram | twoWayTableDiagram | vennDiagram | networkDiagram';
