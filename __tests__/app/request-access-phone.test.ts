// The shared request-access form (30 Oct 2026). On a phone it opened scrolled past its own heading,
// because the first field took focus on load, and the browser tab read "Booking Systems & POS"
// even when the visitor came from AI Search.
import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { metadata } from "@/app/request-access/layout";

const page = fs.readFileSync(path.join(process.cwd(), "app/request-access/page.tsx"), "utf8");

describe("request access", () => {
  it("has its own title under the site's template", () => {
    expect(metadata.title).toBe("Request access");
    expect(String(metadata.description)).toMatch(/reviewed by our team/);
  });

  it("does not move focus to the first field when the page loads", () => {
    const nameField = page.split("\n").find((line) => line.includes('placeholder="e.g. Sara Hassan"'));
    expect(nameField).toBeDefined();
    expect(nameField).not.toContain("autoFocus");
  });

  it("still focuses the next step's first field after the visitor presses Continue", () => {
    const companyField = page.split("\n").find((line) => line.includes('placeholder="e.g. Nile Tours"'));
    expect(companyField).toContain("autoFocus");
  });
});
