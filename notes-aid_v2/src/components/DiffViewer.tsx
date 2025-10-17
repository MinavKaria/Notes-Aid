"use client";
import { useMemo } from "react";

interface DiffViewerProps {
  originalData: unknown;
  changedData: unknown;
}

type DiffType = "added" | "removed" | "modified" | "unchanged";

interface DiffLine {
  type: DiffType;
  path: string;
  oldValue?: unknown;
  newValue?: unknown;
  lineNumber: number;
}

export default function DiffViewer({ originalData, changedData }: DiffViewerProps) {
  const { leftLines, rightLines, stats } = useMemo(() => {
    return generateSideBySideDiff(originalData || {}, changedData || {});
  }, [originalData, changedData]);

  if (!originalData && !changedData) {
    return (
      <div className="text-center py-8 text-gray-400">
        No data to compare
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Stats Bar */}
      <div className="flex items-center gap-4 p-3 bg-zinc-800 rounded-lg border border-zinc-700">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-sm text-gray-300">
            <span className="font-semibold text-green-400">{stats.added}</span> additions
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <span className="text-sm text-gray-300">
            <span className="font-semibold text-red-400">{stats.removed}</span> deletions
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-amber-500"></div>
          <span className="text-sm text-gray-300">
            <span className="font-semibold text-amber-400">{stats.modified}</span> modifications
          </span>
        </div>
      </div>

      {/* Side-by-Side Diff Display */}
      <div className="border border-zinc-700 rounded-lg overflow-hidden">
        <div className="grid grid-cols-2 bg-zinc-800 border-b border-zinc-700">
          <div className="px-4 py-2 border-r border-zinc-700">
            <span className="text-sm font-mono text-gray-300">Original</span>
          </div>
          <div className="px-4 py-2">
            <span className="text-sm font-mono text-gray-300">Modified</span>
          </div>
        </div>
        <div className="bg-black">
          {leftLines.length === 0 && rightLines.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No changes detected
            </div>
          ) : (
            <div className="grid grid-cols-2">
              {/* Left Side (Original) */}
              <div className="border-r border-zinc-800">
                {leftLines.map((line, index) => (
                  <DiffSideLine key={`left-${index}`} line={line} side="left" />
                ))}
              </div>
              {/* Right Side (Changed) */}
              <div>
                {rightLines.map((line, index) => (
                  <DiffSideLine key={`right-${index}`} line={line} side="right" />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function DiffSideLine({ line, side }: { line: DiffLine | null; side: "left" | "right" }) {
  if (!line) {
    return <div className="px-4 py-2 min-h-[2.5rem] bg-zinc-900 border-b border-zinc-900"></div>;
  }

  const getBgColor = (type: DiffType, side: "left" | "right") => {
    if (type === "unchanged") return "";
    if (type === "added") return side === "right" ? "bg-green-950 bg-opacity-40 border-l-2 border-green-500" : "";
    if (type === "removed") return side === "left" ? "bg-red-950 bg-opacity-40 border-l-2 border-red-500" : "";
    if (type === "modified") {
      return side === "left"
        ? "bg-red-950 bg-opacity-30 border-l-2 border-red-500"
        : "bg-green-950 bg-opacity-30 border-l-2 border-green-500";
    }
    return "";
  };

  const getTextColor = (type: DiffType, side: "left" | "right") => {
    if (type === "unchanged") return "text-gray-400";
    if (type === "added") return side === "right" ? "text-green-300" : "text-gray-500";
    if (type === "removed") return side === "left" ? "text-red-300" : "text-gray-500";
    if (type === "modified") {
      return side === "left" ? "text-red-300" : "text-green-300";
    }
    return "text-gray-300";
  };

  const getLineNumberColor = (type: DiffType, side: "left" | "right") => {
    if (type === "unchanged") return "text-gray-600";
    if (type === "added" && side === "right") return "text-green-400 font-semibold";
    if (type === "removed" && side === "left") return "text-red-400 font-semibold";
    if (type === "modified") return "text-amber-400 font-semibold";
    return "text-gray-600";
  };

  const getPrefix = (type: DiffType, side: "left" | "right") => {
    if (type === "added" && side === "right") return <span className="text-green-400 font-bold mr-2">+</span>;
    if (type === "removed" && side === "left") return <span className="text-red-400 font-bold mr-2">-</span>;
    if (type === "modified") {
      return side === "left"
        ? <span className="text-red-400 font-bold mr-2">-</span>
        : <span className="text-green-400 font-bold mr-2">+</span>;
    }
    return <span className="text-gray-700 mr-2"> </span>;
  };

  const formatValue = (value: unknown): string => {
    if (value === null || value === undefined) return "null";
    if (typeof value === "string") return `"${value}"`;
    if (typeof value === "object") {
      try {
        return JSON.stringify(value, null, 2);
      } catch {
        return String(value);
      }
    }
    return String(value);
  };

  const value = side === "left" ? line.oldValue : line.newValue;
  const showContent = line.type === "unchanged" ||
                      (line.type === "added" && side === "right") ||
                      (line.type === "removed" && side === "left") ||
                      line.type === "modified";

  return (
    <div className={`flex items-start gap-2 px-3 py-2 min-h-[2.5rem] border-b border-zinc-900 ${getBgColor(line.type, side)}`}>
      <span className={`text-xs font-mono mt-0.5 w-8 flex-shrink-0 text-right ${getLineNumberColor(line.type, side)}`}>
        {line.lineNumber > 0 ? line.lineNumber : ""}
      </span>
      {getPrefix(line.type, side)}
      <div className="flex-1 min-w-0">
        <div className="text-xs font-mono text-gray-500 mb-0.5 font-semibold">{line.path}</div>
        {showContent && (
          <div className={`text-sm font-mono break-all whitespace-pre-wrap ${getTextColor(line.type, side)}`}>
            {formatValue(value)}
          </div>
        )}
      </div>
    </div>
  );
}

function generateSideBySideDiff(original: unknown, changed: unknown) {
  const leftLines: (DiffLine | null)[] = [];
  const rightLines: (DiffLine | null)[] = [];
  let lineNumber = 1;

  const allPaths = getAllPaths(original, changed);

  const stats = {
    added: 0,
    removed: 0,
    modified: 0,
  };

  allPaths.forEach((pathInfo) => {
    const { path, type, oldValue, newValue } = pathInfo;

    if (type === "added") {
      stats.added++;
      leftLines.push({ type: "unchanged", path, oldValue: undefined, newValue: undefined, lineNumber });
      rightLines.push({ type: "added", path, newValue, lineNumber });
    } else if (type === "removed") {
      stats.removed++;
      leftLines.push({ type: "removed", path, oldValue, lineNumber });
      rightLines.push({ type: "unchanged", path, oldValue: undefined, newValue: undefined, lineNumber });
    } else if (type === "modified") {
      stats.modified++;
      leftLines.push({ type: "modified", path, oldValue, lineNumber });
      rightLines.push({ type: "modified", path, newValue, lineNumber });
    } else {
      // unchanged
      leftLines.push({ type: "unchanged", path, oldValue, lineNumber });
      rightLines.push({ type: "unchanged", path, newValue, lineNumber });
    }

    lineNumber++;
  });

  return { leftLines, rightLines, stats };
}

function getAllPaths(original: unknown, changed: unknown, path: string = ""): Array<{path: string, type: DiffType, oldValue?: unknown, newValue?: unknown}> {
  const paths: Array<{path: string, type: DiffType, oldValue?: unknown, newValue?: unknown}> = [];

  // Handle null/undefined cases
  if ((original === null || original === undefined) && (changed === null || changed === undefined)) {
    return paths;
  }

  if (original === null || original === undefined) {
    if (typeof changed === "object" && !Array.isArray(changed)) {
      Object.keys(changed as Record<string, unknown>).forEach((key) => {
        const newPath = path ? `${path}.${key}` : key;
        paths.push(...getAllPaths(undefined, (changed as Record<string, unknown>)[key], newPath));
      });
    } else {
      paths.push({ path: path || "root", type: "added", newValue: changed });
    }
    return paths;
  }

  if (changed === null || changed === undefined) {
    if (typeof original === "object" && !Array.isArray(original)) {
      Object.keys(original as Record<string, unknown>).forEach((key) => {
        const newPath = path ? `${path}.${key}` : key;
        paths.push(...getAllPaths((original as Record<string, unknown>)[key], undefined, newPath));
      });
    } else {
      paths.push({ path: path || "root", type: "removed", oldValue: original });
    }
    return paths;
  }

  // Both are arrays
  if (Array.isArray(original) && Array.isArray(changed)) {
    const maxLength = Math.max(original.length, changed.length);
    for (let i = 0; i < maxLength; i++) {
      const newPath = `${path}[${i}]`;
      if (i >= original.length) {
        paths.push({ path: newPath, type: "added", newValue: changed[i] });
      } else if (i >= changed.length) {
        paths.push({ path: newPath, type: "removed", oldValue: original[i] });
      } else {
        const origStr = JSON.stringify(original[i]);
        const changedStr = JSON.stringify(changed[i]);

        if (origStr === changedStr) {
          paths.push({ path: newPath, type: "unchanged", oldValue: original[i], newValue: changed[i] });
        } else if (
          typeof original[i] === "object" &&
          typeof changed[i] === "object" &&
          !Array.isArray(original[i]) &&
          !Array.isArray(changed[i])
        ) {
          paths.push(...getAllPaths(original[i], changed[i], newPath));
        } else {
          paths.push({ path: newPath, type: "modified", oldValue: original[i], newValue: changed[i] });
        }
      }
    }
    return paths;
  }

  // Both are objects
  if (
    typeof original === "object" &&
    typeof changed === "object" &&
    !Array.isArray(original) &&
    !Array.isArray(changed)
  ) {
    const allKeys = new Set([
      ...Object.keys(original as Record<string, unknown>),
      ...Object.keys(changed as Record<string, unknown>)
    ]);
    const sortedKeys = Array.from(allKeys).sort();

    sortedKeys.forEach((key) => {
      // Skip MongoDB internal fields
      if (key === "_id" || key === "__v") return;

      const newPath = path ? `${path}.${key}` : key;
      const originalValue = (original as Record<string, unknown>)[key];
      const changedValue = (changed as Record<string, unknown>)[key];

      if (!(key in (original as Record<string, unknown>))) {
        paths.push({ path: newPath, type: "added", newValue: changedValue });
      } else if (!(key in (changed as Record<string, unknown>))) {
        paths.push({ path: newPath, type: "removed", oldValue: originalValue });
      } else {
        const origStr = JSON.stringify(originalValue);
        const changedStr = JSON.stringify(changedValue);

        if (origStr === changedStr) {
          paths.push({ path: newPath, type: "unchanged", oldValue: originalValue, newValue: changedValue });
        } else if (
          typeof originalValue === "object" &&
          typeof changedValue === "object" &&
          originalValue !== null &&
          changedValue !== null
        ) {
          paths.push(...getAllPaths(originalValue, changedValue, newPath));
        } else {
          paths.push({ path: newPath, type: "modified", oldValue: originalValue, newValue: changedValue });
        }
      }
    });

    return paths;
  }

  // Primitive values
  if (original !== changed) {
    paths.push({ path: path || "root", type: "modified", oldValue: original, newValue: changed });
  } else {
    paths.push({ path: path || "root", type: "unchanged", oldValue: original, newValue: changed });
  }

  return paths;
}
