import { describe, expect, it } from "vitest";
import { parsePreferences } from "./preferences";

const validInput = {
  locationId: "indiranagar",
  budget: "1000",
  searchTerm: " Chinese ",
  preferences: " Quiet, preferably outdoors ",
};

describe("parsePreferences", () => {
  it("resolves the selected demo location and trims free text", () => {
    expect(parsePreferences(validInput)).toEqual({
      ok: true,
      value: {
        location: {
          id: "indiranagar",
          label: "Indiranagar, Bengaluru",
          latitude: 12.9784,
          longitude: 77.6408,
        },
        budgetForTwoInr: 1000,
        searchTerm: "Chinese",
        preferences: "Quiet, preferably outdoors",
      },
    });
  });

  it("allows optional preferences to be empty", () => {
    const result = parsePreferences({ ...validInput, preferences: "  " });
    expect(result.ok && result.value.preferences).toBe("");
  });

  it("reports all missing required fields together", () => {
    expect(parsePreferences({
      locationId: "", budget: "", searchTerm: " ", preferences: "",
    })).toEqual({
      ok: false,
      errors: {
        locationId: "Choose a demo location.",
        budget: "Enter a positive whole-rupee budget for two.",
        searchTerm: "Enter a cuisine, restaurant name, or kind of place.",
      },
    });
  });

  it.each(["unknown", "__proto__", "constructor"])("rejects unknown location %s", (locationId) => {
    expect(parsePreferences({ ...validInput, locationId }).ok).toBe(false);
  });

  it.each(["0", "-10", "1.5", "1e3", "Infinity", "NaN", "9007199254740992"])(
    "rejects invalid budget %s", (budget) => {
      expect(parsePreferences({ ...validInput, budget }).ok).toBe(false);
    },
  );

  it("enforces text length limits", () => {
    const result = parsePreferences({
      ...validInput,
      searchTerm: "a".repeat(101),
      preferences: "a".repeat(1001),
    });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.searchTerm).toBeDefined();
      expect(result.errors.preferences).toBeDefined();
    }
  });
});
