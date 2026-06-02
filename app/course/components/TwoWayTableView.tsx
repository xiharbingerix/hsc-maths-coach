"use client";

import type { TwoWayTableDiagram } from "../../../lib/lessons/types";

const highlightedCellClass = "bg-amber-200 font-semibold text-amber-950";
const standardCellClass = "bg-white text-slate-800";
const headingClass = "bg-slate-100 font-semibold text-slate-800";

function validValue(value: unknown): value is number | string {
  return (
    (typeof value === "number" && Number.isFinite(value)) ||
    (typeof value === "string" && value.trim().length > 0)
  );
}

export function TwoWayTableView({
  diagram,
  className,
}: {
  diagram: TwoWayTableDiagram;
  className?: string;
}): React.ReactElement | null {
  const hasRows =
    Array.isArray(diagram.rowLabels) &&
    diagram.rowLabels.length > 0 &&
    diagram.rowLabels.every((label) => typeof label === "string" && label.trim());
  const hasColumns =
    Array.isArray(diagram.columnLabels) &&
    diagram.columnLabels.length > 0 &&
    diagram.columnLabels.every((label) => typeof label === "string" && label.trim());
  const hasValidValues =
    hasRows &&
    hasColumns &&
    Array.isArray(diagram.values) &&
    diagram.values.length === diagram.rowLabels.length &&
    diagram.values.every(
      (row) =>
        Array.isArray(row) &&
        row.length === diagram.columnLabels.length &&
        row.every(validValue)
    );

  if (
    typeof diagram.description !== "string" ||
    !diagram.description.trim() ||
    !hasRows ||
    !hasColumns ||
    !hasValidValues ||
    (diagram.rowTotals !== undefined &&
      (diagram.rowTotals.length !== diagram.rowLabels.length ||
        !diagram.rowTotals.every(validValue))) ||
    (diagram.columnTotals !== undefined &&
      (diagram.columnTotals.length !== diagram.columnLabels.length ||
        !diagram.columnTotals.every(validValue))) ||
    (diagram.grandTotal !== undefined && !validValue(diagram.grandTotal))
  ) {
    return null;
  }

  const showTotalColumn = diagram.rowTotals !== undefined || diagram.grandTotal !== undefined;
  const showTotalRow = diagram.columnTotals !== undefined || diagram.grandTotal !== undefined;
  const highlight = diagram.highlight;
  const isHighlighted = (
    kind: "cell" | "row-label" | "column-label" | "row-total" | "column-total" | "grand-total",
    rowIndex?: number,
    columnIndex?: number
  ) => {
    if (!highlight) return false;
    if (highlight.kind === "row") return rowIndex === highlight.rowIndex && kind !== "column-label";
    if (highlight.kind === "column") return columnIndex === highlight.columnIndex && kind !== "row-label";
    return highlight.kind === kind && rowIndex === highlight.rowIndex && columnIndex === highlight.columnIndex;
  };
  const cellClass = (highlighted: boolean, heading = false) =>
    `border border-slate-300 px-4 py-3 text-center ${highlighted ? highlightedCellClass : heading ? headingClass : standardCellClass}`;

  return (
    <figure className={`my-3 overflow-x-auto ${className ?? ""}`}>
      <figcaption className="mb-2 text-sm text-slate-600">
        {diagram.description}
        {highlight?.label && (
          <span className="ml-2 font-semibold text-amber-800">
            Highlight: {highlight.label}
          </span>
        )}
      </figcaption>
      <table className="min-w-[420px] border-collapse text-sm sm:text-base">
        <thead>
          <tr>
            <th scope="col" className={cellClass(false, true)}>Category</th>
            {diagram.columnLabels.map((label, columnIndex) => (
              <th
                key={label}
                scope="col"
                className={cellClass(isHighlighted("column-label", undefined, columnIndex), true)}
              >
                {label}
              </th>
            ))}
            {showTotalColumn && (
              <th scope="col" className={cellClass(false, true)}>Total</th>
            )}
          </tr>
        </thead>
        <tbody>
          {diagram.values.map((row, rowIndex) => (
            <tr key={diagram.rowLabels[rowIndex]}>
              <th
                scope="row"
                className={cellClass(isHighlighted("row-label", rowIndex), true)}
              >
                {diagram.rowLabels[rowIndex]}
              </th>
              {row.map((value, columnIndex) => (
                <td
                  key={`${rowIndex}-${columnIndex}`}
                  className={cellClass(isHighlighted("cell", rowIndex, columnIndex))}
                >
                  {value}
                </td>
              ))}
              {showTotalColumn && (
                <td className={cellClass(isHighlighted("row-total", rowIndex))}>
                  {diagram.rowTotals?.[rowIndex] ?? ""}
                </td>
              )}
            </tr>
          ))}
        </tbody>
        {showTotalRow && (
          <tfoot>
            <tr>
              <th scope="row" className={cellClass(false, true)}>Total</th>
              {diagram.columnLabels.map((label, columnIndex) => (
                <td
                  key={`total-${label}`}
                  className={cellClass(isHighlighted("column-total", undefined, columnIndex))}
                >
                  {diagram.columnTotals?.[columnIndex] ?? ""}
                </td>
              ))}
              {showTotalColumn && (
                <td className={cellClass(isHighlighted("grand-total"))}>
                  {diagram.grandTotal ?? ""}
                </td>
              )}
            </tr>
          </tfoot>
        )}
      </table>
    </figure>
  );
}
