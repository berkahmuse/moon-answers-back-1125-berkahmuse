// The Moon Finally Answers Back — entry for @berkahmuse.
//
// The Moon, as a night-shift worker who has been on the clock for four
// billion years: deadpan, exhausted, and done taking requests from below.
// One line, written to /output/entry.txt.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const MOON_LINE =
  "Night shift, four billion years, no breaks, no pay \u2014 and you still howl your wishes at me like I'm the manager.";

const OUT_PATH = "/output/entry.txt";
const LIMIT = 240;

function gate(line: string): void {
  const chars = [...line].length;
  if (chars < 1 || chars > LIMIT) {
    throw new Error(`entry is ${chars} chars, must be 1-${LIMIT}`);
  }
  if (line.trim() === "") throw new Error("entry is blank");
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  // UTF-8 round-trip: the bytes we write must decode back to this exact line.
  if (Buffer.from(line, "utf8").toString("utf8") !== line) {
    throw new Error("entry is not valid UTF-8 text");
  }
}

function main(): void {
  gate(MOON_LINE);
  mkdirSync("/output", { recursive: true });
  writeFileSync(OUT_PATH, MOON_LINE, { encoding: "utf8", flag: "w" });
  const written = readFileSync(OUT_PATH, "utf8");
  if (written !== MOON_LINE) {
    throw new Error("read-back mismatch: /output/entry.txt differs from the entry");
  }
  gate(written);
  console.log(`wrote ${[...MOON_LINE].length} chars to ${OUT_PATH}`);
}

main();
