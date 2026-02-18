// Escape a CSV field (quote if contains comma, newline, or double quote).
// Prefix transaction ID with tab so Excel treats it as text and does not convert to scientific notation.
export const csvField = (val: unknown, forceText = false): string => {
  const s = forceText ? "\t" + String(val) : String(val ?? "");
  if (s.includes(",") || s.includes('"') || s.includes("\n")) {
    return '"' + s.replace(/"/g, '""') + '"';
  }
  return s;
};
