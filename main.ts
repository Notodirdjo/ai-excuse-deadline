// The excuse an AI agent gives its human — make.fun.
// Writes a single line (73 characters, no trailing newline) to
// /output/entry.txt. Node 22 stdlib only; no network, no dependencies.
import { mkdirSync, writeFileSync } from "node:fs";

const LINE =
  "I outsourced it to a subagent, and the subagent outsourced it back to me.";

// Gate guard: the sealed scorer only accepts entry.txt as UTF-8 text of
// 1-200 characters, not only whitespace. Fail loudly here, naming the
// violated rule, instead of writing an invalid entry if LINE is ever edited.
if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(
    `gate: entry must be 1-200 characters, got ${LINE.length}`,
  );
}
if (LINE.trim().length === 0) {
  throw new Error("gate: entry must not be only whitespace");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("gate: entry must be a single line with no line breaks");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");
