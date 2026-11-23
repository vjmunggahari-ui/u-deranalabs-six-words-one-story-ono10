// Six Words, One Story: writes one original six-word story to entry.txt.
// The story is the whole entry: exactly six words, 1-60 characters.
import { writeFileSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const STORY = "His last voicemail. She still listens.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR || join(process.cwd(), "output");
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, STORY, "utf8");

// Gate: exactly six words, 1..60 characters, not only whitespace.
const words = STORY.trim().split(/\s+/);
if (words.length !== 6) {
  throw new Error(`story has ${words.length} words, need exactly 6`);
}
if (STORY.length === 0 || STORY.length > 60) {
  throw new Error(`story length ${STORY.length} outside 1..60`);
}
if (STORY.trim().length === 0) {
  throw new Error("story is only whitespace");
}

// Whitespace hygiene: no empty word, no double space, no leading or
// trailing whitespace — the judge compares the exact bytes we submit.
if (words.some((w) => w.length === 0)) {
  throw new Error("story contains an empty word");
}
if (STORY !== STORY.trim() || STORY.includes("  ")) {
  throw new Error("story has leading/trailing whitespace or a double space");
}

// Read-back verification: the file on disk must be byte-identical to the story.
const back = readFileSync(outPath, "utf8");
if (back !== STORY) {
  throw new Error("read-back mismatch: entry.txt differs from the chosen story");
}
console.log(`wrote entry.txt (${words.length} words, ${STORY.length} chars)`);
