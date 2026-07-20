"use client";

import type { DataTableDiagram } from "../../../lib/lessons/types";

function validCell(value: unknown): value is number | string {
  return (
    (typeof value === "number" && Number.isFinite(value)) ||
    (typeof value === "string" && value.trim().length > 0)
  );
}

export function DataTableView({
  diagram,
  className,
}: {
  diagram: DataTableDiagram;
  className?: string;
}): React.ReactElement | null {
  const columns = Array.isArray(diagram.columnHeaders) ? diagram.columnHeaders : [];
  const values = Array.isArray(diagram.values) ? diagram.values : [];
  const rowsValid =
    values.length > 0 &&
    values.every((row) =>
      Array.isArray(row) && row.length === columns.length && row.every(validCell)
    );
  const rowHeadersValid =
    diagram.rowHeaders === undefined ||
    (diagram.rowHeaders.length === values.length &&
      diagram.rowHeaders.every((label) => typeof label === "string" && label.trim().length > 0));

  if (
    typeof diagram.description !== "string" ||
    !diagram.description.trim() ||
    columns.length === 0 ||
    !columns.every((label) => typeof label === "string" && label.trim().length > 0) ||
    !rowsValid ||
    !rowHeadersValid
  ) {
    return null;
  }

  const highlighted = (rowIndex: number, columnIndex?: number) =>
    diagram.highlight?.rowIndex === rowIndex &&
    (diagram.highlight.columnIndex === undefined || diagram.highlight.columnIndex === columnIndex);

  return (
    <figure className={`my-3 overflow-x-auto ${className ?? ""}`}>
      <figcaption className="mb-2 text-sm text-slate-600">
        {diagram.description}
        {diagram.highlight?.label && (
          <span className="ml-2 font-semibold text-amber-800">
            Highlight: {diagram.highlight.label}
          </span>
        )}
      </figcaption>
      <table className="min-w-[420px] border-collapse text-sm sm:text-base">
        <thead>
          <tr>
            {diagram.rowHeaders && (
              <th scope="col" className="border border-slate-300 bg-slate-100 px-4 py-3" />
            )}
            {columns.map((label) => (
              <th key={label} scope="col" className="border border-slate-300 bg-slate-100 px-4 py-3 font-semibold text-slate-800">
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {values.map((row, rowIndex) => (
            <tr key={diagram.rowHeaders?.[rowIndex] ?? rowIndex}>
              {diagram.rowHeaders && (
                <th
                  scope="row"
                  className={`border border-slate-300 px-4 py-3 font-semibold text-slate-800 ${
                    highlighted(rowIndex) ? "bg-amber-200" : "bg-slate-100"
                  }`}
                >
                  {diagram.rowHeaders[rowIndex]}
                </th>
              )}
              {row.map((value, columnIndex) => (
                <td
                  key={`${rowIndex}-${columnIndex}`}
                  className={`border border-slate-300 px-4 py-3 text-center text-slate-800 ${
                    highlighted(rowIndex, columnIndex) ? "bg-amber-200 font-semibold" : "bg-white"
                  }`}
                >
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}
