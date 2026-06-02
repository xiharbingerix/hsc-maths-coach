"use client";

import * as React from "react";
import type {
  ProbabilityTreeBranch,
  ProbabilityTreeDiagram,
} from "../../../lib/lessons/types";

type LayoutNode = {
  branch: ProbabilityTreeBranch;
  depth: number;
  path: string[];
  y: number;
  children: LayoutNode[];
};

const width = 720;
const padding = { top: 54, right: 42, bottom: 34, left: 64 };
const leafGap = 54;

function isValidBranch(branch: ProbabilityTreeBranch): boolean {
  return (
    typeof branch.id === "string" &&
    branch.id.trim().length > 0 &&
    typeof branch.label === "string" &&
    branch.label.trim().length > 0 &&
    (branch.probability === undefined ||
      (typeof branch.probability === "string" && branch.probability.trim().length > 0)) &&
    (branch.children === undefined ||
      (Array.isArray(branch.children) &&
        branch.children.length > 0 &&
        branch.children.every(isValidBranch)))
  );
}

function treeDepth(branches: ProbabilityTreeBranch[], depth = 1): number {
  return Math.max(
    depth,
    ...branches.map((branch) =>
      branch.children ? treeDepth(branch.children, depth + 1) : depth
    )
  );
}

function leafCount(branches: ProbabilityTreeBranch[]): number {
  return branches.reduce(
    (total, branch) => total + (branch.children ? leafCount(branch.children) : 1),
    0
  );
}

function layoutTree(
  branches: ProbabilityTreeBranch[],
  nextLeaf: { value: number },
  depth = 1,
  parentPath: string[] = []
): LayoutNode[] {
  return branches.map((branch) => {
    const path = [...parentPath, branch.id];
    const children = branch.children
      ? layoutTree(branch.children, nextLeaf, depth + 1, path)
      : [];
    const y =
      children.length > 0
        ? children.reduce((sum, child) => sum + child.y, 0) / children.length
        : padding.top + nextLeaf.value++ * leafGap;
    return { branch, depth, path, y, children };
  });
}

function pathStartsWith(path: string[], prefix: string[]) {
  return prefix.every((id, index) => path[index] === id);
}

export function ProbabilityTreeView({
  diagram,
  className,
}: {
  diagram: ProbabilityTreeDiagram;
  className?: string;
}): React.ReactElement | null {
  const reactId = React.useId();
  const titleId = `${reactId}-title`;
  const descriptionId = `${reactId}-description`;

  if (
    typeof diagram.description !== "string" ||
    !diagram.description.trim() ||
    !Array.isArray(diagram.branches) ||
    diagram.branches.length === 0 ||
    !diagram.branches.every(isValidBranch)
  ) {
    return null;
  }

  const depth = treeDepth(diagram.branches);
  const leaves = leafCount(diagram.branches);
  if (depth > 4 || leaves > 16) return null;

  const height = Math.max(260, padding.top + (leaves - 1) * leafGap + padding.bottom);
  const stageGap = (width - padding.left - padding.right) / depth;
  const root = { x: padding.left, y: height / 2 };
  const nodes = layoutTree(diagram.branches, { value: 0 });
  const highlightedPaths = diagram.highlightedPaths ?? [];
  const xForDepth = (nodeDepth: number) => padding.left + nodeDepth * stageGap;
  const isHighlighted = (path: string[]) =>
    highlightedPaths.some((highlightedPath) => pathStartsWith(highlightedPath, path));

  const renderNodes = (
    layoutNodes: LayoutNode[],
    parent: { x: number; y: number }
  ): React.ReactNode =>
    layoutNodes.map((node) => {
      const x = xForDepth(node.depth);
      const highlighted = isHighlighted(node.path);
      const edgeColor = highlighted ? "#d97706" : "#64748b";
      const edgeWidth = highlighted ? 4 : 2.5;
      const midpointX = (parent.x + x) / 2;
      const midpointY = (parent.y + node.y) / 2;
      return (
        <React.Fragment key={node.path.join("/")}>
          <line
            x1={parent.x}
            y1={parent.y}
            x2={x}
            y2={node.y}
            stroke={edgeColor}
            strokeWidth={edgeWidth}
            strokeLinecap="round"
          />
          <text
            x={midpointX}
            y={midpointY - 8}
            textAnchor="middle"
            className={`text-xs font-semibold ${highlighted ? "fill-amber-700" : "fill-slate-700"}`}
            stroke="#ffffff"
            strokeWidth={4}
            paintOrder="stroke"
          >
            {node.branch.probability ?? ""}
          </text>
          <circle cx={x} cy={node.y} r={5} fill={highlighted ? "#d97706" : "#475569"} />
          <text
            x={x + 9}
            y={node.y - 9}
            className={`text-xs font-semibold ${highlighted ? "fill-amber-800" : "fill-slate-800"}`}
            stroke="#ffffff"
            strokeWidth={4}
            paintOrder="stroke"
          >
            {node.branch.label}
          </text>
          {renderNodes(node.children, { x, y: node.y })}
        </React.Fragment>
      );
    });

  return (
    <div className={`my-3 overflow-x-auto ${className ?? ""}`}>
      <svg
        role="img"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        preserveAspectRatio="xMidYMid meet"
        className="max-h-[560px] min-w-[560px]"
      >
        <title id={titleId}>Probability tree diagram</title>
        <desc id={descriptionId}>{diagram.description}</desc>
        <circle cx={root.x} cy={root.y} r={6} fill="#1e293b" />
        <text x={root.x} y={root.y - 14} textAnchor="middle" className="fill-slate-800 text-xs font-semibold">
          {diagram.rootLabel ?? "start"}
        </text>
        {diagram.stages?.map((stage, index) => (
          <text
            key={`${stage}-${index}`}
            x={xForDepth(index + 1)}
            y={24}
            textAnchor="middle"
            className="fill-slate-500 text-xs font-semibold"
          >
            {stage}
          </text>
        ))}
        {renderNodes(nodes, root)}
      </svg>
    </div>
  );
}
