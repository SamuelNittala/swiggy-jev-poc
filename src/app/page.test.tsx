import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import Home from "./page";

describe("Home", () => {
  it("identifies the project and makes the scaffold status explicit", () => {
    const html = renderToStaticMarkup(<Home />);

    expect(html).toContain("Find your next table.");
    expect(html).toContain("Scaffold ready");
    expect(html).toContain("No restaurant searches or AI requests are made yet.");
  });
});
