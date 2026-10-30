// Production dependencies and runtime (30 Oct 2026). The site carried 6 critical and 35 high
// advisories under a green gate: the gate had no audit:prod, Next.js was 15.5.9, seven declared
// packages were never imported (Firebase, Swiper, mongoose, mongodb, motion and two Algolia
// autocomplete packages, which brought in most of the criticals), and the build ran on Node 20,
// which receives no security fixes.
import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const pkg = JSON.parse(fs.readFileSync(path.join(process.cwd(), "package.json"), "utf8"));
const netlify = fs.readFileSync(path.join(process.cwd(), "netlify.toml"), "utf8");

const version = (range: string) => range.replace(/^[^\d]*/, "").split(".").map(Number);
const atLeast = (have: number[], want: number[]) => {
  for (let i = 0; i < want.length; i += 1) {
    if ((have[i] ?? 0) !== want[i]) return (have[i] ?? 0) > want[i];
  }
  return true;
};

describe("production dependencies", () => {
  it("are audited by the gate at high and above", () => {
    expect(pkg.scripts["audit:prod"]).toMatch(/audit --prod --audit-level=high/);
  });

  it("run a Next.js release with the image-optimisation and server-action fixes", () => {
    expect(atLeast(version(pkg.dependencies.next), [15, 5, 28])).toBe(true);
    expect(pkg.devDependencies["eslint-config-next"]).toBe(pkg.dependencies.next);
  });

  it.each(["firebase", "swiper", "mongoose", "mongodb", "motion", "@algolia/autocomplete-js", "@algolia/autocomplete-theme-classic"])(
    "do not declare %s, which nothing imports",
    (name) => {
      expect(pkg.dependencies[name]).toBeUndefined();
    },
  );
});

describe("build runtime", () => {
  it("builds on a patched Node LTS, not Node 20", () => {
    const pinned = /NODE_VERSION\s*=\s*"(\d+)\.(\d+)\.(\d+)"/.exec(netlify);
    expect(pinned).not.toBeNull();
    expect(Number(pinned![1])).toBeGreaterThanOrEqual(22);
  });
});
