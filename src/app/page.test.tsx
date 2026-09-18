import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import Home from "./page";

describe("Home", () => {
  it("identifies the project and makes the preview-only status explicit", () => {
    const html = renderToStaticMarkup(<Home />);

    expect(html).toContain("Find your next table.");
    expect(html).toContain("Preview only");
    expect(html).toContain("What are you looking for?");
    expect(html).toContain("No restaurant searches or AI requests are made yet.");
  });
});
