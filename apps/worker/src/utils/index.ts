// Escape a CSV field (quote if contains comma, newline, or double quote).
// forceText: prefix with single quote so Excel treats as text (avoids scientific notation); Excel hides the quote in the cell.
export const csvField = (val: unknown, forceText = false): string => {
  const raw = String(val ?? "");
  const s = forceText ? "'" + raw : raw;
  if (s.includes(",") || s.includes('"') || s.includes("\n")) {
    return '"' + s.replace(/"/g, '""') + '"';
  }
  return s;
};
