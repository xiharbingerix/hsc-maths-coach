"use client";

import * as React from "react";
import type { StemAndLeafDiagram } from "../../../lib/lessons/types";

function formatLeaves(leaves: number[]): string {
  return leaves.join(" ");
}

export function StemAndLeafView({
  diagram,
  className,
}: {
  diagram: StemAndLeafDiagram;
  className?: string;
}): React.ReactElement {
  const isBackToBack =
    Boolean(diagram.leftLabel) || diagram.rows.some((row) => row.leftLeaves?.length);

  return (
    <div className={`my-3 overflow-x-auto ${className ?? ""}`}>
      <table className="border-collapse text-sm" aria-label={diagram.description}>
        <caption className="sr-only">{diagram.description}</caption>
        <thead>
          <tr className="text-slate-600">
            {isBackToBack && (
              <th className="px-3 py-1 text-right font-semibold">{diagram.leftLabel ?? ""}</th>
            )}
            <th className="border-x border-slate-300 px-3 py-1 text-center font-semibold">Stem</th>
            <th className="px-3 py-1 text-left font-semibold">{diagram.rightLabel ?? "Leaf"}</th>
          </tr>
        </thead>
        <tbody className="font-mono">
          {diagram.rows.map((row, index) => (
            <tr key={`row-${index}`} className="border-t border-slate-200">
              {isBackToBack && (
                <td className="px-3 py-1 text-right tracking-widest text-slate-800">
                  {formatLeaves([...(row.leftLeaves ?? [])].reverse())}
                </td>
              )}
              <td className="border-x border-slate-300 bg-slate-50 px-3 py-1 text-center font-semibold text-slate-900">
                {row.stem}
              </td>
              <td className="px-3 py-1 text-left tracking-widest text-slate-800">
                {formatLeaves(row.leaves)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-1 text-xs italic text-slate-500">Key: {diagram.keyText}</p>
    </div>
  );
}
