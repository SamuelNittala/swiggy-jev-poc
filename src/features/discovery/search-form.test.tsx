// @vitest-environment jsdom
import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import SearchForm from "./search-form";

afterEach(cleanup);

describe("SearchForm", () => {
  it("shows validation and focuses the first invalid field", async () => {
    const user = userEvent.setup();
    render(<SearchForm />);
    await user.click(screen.getByRole("button", { name: "Preview preferences" }));

    expect(screen.getByText("Choose a demo location.")).toBeDefined();
    expect(screen.getByLabelText("Location").getAttribute("aria-invalid")).toBe("true");
    expect(document.activeElement).toBe(screen.getByLabelText("Location"));
    expect(screen.queryByRole("heading", { name: "Your search preview" })).toBeNull();
  });

  it("previews structured inputs and invalidates the preview when edited", async () => {
    const user = userEvent.setup();
    render(<SearchForm />);
    await user.selectOptions(screen.getByLabelText("Location"), "indiranagar");
    await user.type(screen.getByLabelText("Budget for two (₹)"), "1000");
    await user.click(screen.getByRole("button", { name: "Chinese" }));
    await user.type(screen.getByLabelText("Anything else? (optional)"), "Quiet and outdoors");
    await user.click(screen.getByRole("button", { name: "Preview preferences" }));

    expect(screen.getByRole("heading", { name: "Your search preview" })).toBeDefined();
    const preview = screen.getByRole("region", { name: "Your search preview" });
    expect(within(preview).getByText("Quiet and outdoors")).toBeDefined();
    expect(screen.getByText("₹1,000")).toBeDefined();
    expect(screen.getByText(/No restaurants have been searched/)).toBeDefined();

    await user.type(screen.getByLabelText("Budget for two (₹)"), "0");
    expect(screen.queryByRole("heading", { name: "Your search preview" })).toBeNull();
  });

  it("clears entered values and the preview on reset", async () => {
    const user = userEvent.setup();
    render(<SearchForm />);
    await user.selectOptions(screen.getByLabelText("Location"), "koramangala");
    await user.type(screen.getByLabelText("Budget for two (₹)"), "1500");
    await user.click(screen.getByRole("button", { name: "Cafe" }));
    await user.click(screen.getByRole("button", { name: "Preview preferences" }));
    expect(screen.getByText("None specified")).toBeDefined();
    await user.click(screen.getByRole("button", { name: "Clear form" }));

    expect((screen.getByLabelText("Location") as HTMLSelectElement).value).toBe("");
    expect((screen.getByLabelText("What are you looking for?") as HTMLInputElement).value).toBe("");
    expect(screen.queryByRole("heading", { name: "Your search preview" })).toBeNull();
  });
});
