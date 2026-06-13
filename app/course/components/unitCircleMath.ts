export function parseSymbolicNumber(value: string | undefined): number | null {
  if (!value) return null;
  const normalised = value
    .trim()
    .replace(/\\pi/g, "pi")
    .replace(/π/g, "pi")
    .replace(/−/g, "-")
    .replace(/\s+/g, "")
    .replace(/^\((.*)\)$/, "$1");

  if (!normalised) return null;

  const numeric = Number(normalised);
  if (Number.isFinite(numeric)) return numeric;

  const piMatch = normalised.match(/^(-?)(?:(\d+(?:\.\d+)?)\*?)?pi(?:\/(-?\d+(?:\.\d+)?))?$/);
  if (piMatch) {
    const sign = piMatch[1] === "-" ? -1 : 1;
    const coefficient = piMatch[2] ? Number(piMatch[2]) : 1;
    const denominator = piMatch[3] ? Number(piMatch[3]) : 1;
    if (Number.isFinite(coefficient) && Number.isFinite(denominator) && denominator !== 0) {
      return (sign * coefficient * Math.PI) / denominator;
    }
  }

  const fractionMatch = normalised.match(/^(-?\d+(?:\.\d+)?)\/(-?\d+(?:\.\d+)?)$/);
  if (fractionMatch) {
    const numerator = Number(fractionMatch[1]);
    const denominator = Number(fractionMatch[2]);
    if (Number.isFinite(numerator) && Number.isFinite(denominator) && denominator !== 0) {
      return numerator / denominator;
    }
  }

  const sqrtMatch = normalised.match(/^(-?)\\?sqrt\{?(\d+(?:\.\d+)?)\}?(?:\/(-?\d+(?:\.\d+)?))?$/);
  if (sqrtMatch) {
    const sign = sqrtMatch[1] === "-" ? -1 : 1;
    const radicand = Number(sqrtMatch[2]);
    const denominator = sqrtMatch[3] ? Number(sqrtMatch[3]) : 1;
    if (radicand >= 0 && Number.isFinite(denominator) && denominator !== 0) {
      return (sign * Math.sqrt(radicand)) / denominator;
    }
  }

  return null;
}

export function formatSymbolicPi(value: number) {
  const candidates: Array<[number, string]> = [
    [-2 * Math.PI, "-2π"],
    [(-3 * Math.PI) / 2, "-3π/2"],
    [-Math.PI, "-π"],
    [-Math.PI / 2, "-π/2"],
    [0, "0"],
    [Math.PI / 2, "π/2"],
    [Math.PI, "π"],
    [(3 * Math.PI) / 2, "3π/2"],
    [2 * Math.PI, "2π"],
  ];
  const match = candidates.find(([candidate]) => Math.abs(candidate - value) < 1e-8);
  return match ? match[1] : Number(value.toFixed(2)).toString();
}
