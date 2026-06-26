export function normaliseMultiFilter(
  value: string | string[] | null | undefined
): string[] {
  const values = Array.isArray(value) ? value : value ? [value] : [];

  return [
    ...new Set(
      values
        .flatMap((item) => item.split(","))
        .map((item) => item.trim())
        .filter(Boolean)
    ),
  ];
}
