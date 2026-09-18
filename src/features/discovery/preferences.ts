// Demo coordinates from Swiggy's search_restaurants_dineout reference.
// This is not a geocoder or a complete list of supported Swiggy locations.
export const DEMO_LOCATIONS = [
  { id: "indiranagar", label: "Indiranagar, Bengaluru", latitude: 12.9784, longitude: 77.6408 },
  { id: "koramangala", label: "Koramangala, Bengaluru", latitude: 12.9352, longitude: 77.6245 },
] as const;

export const SEARCH_TERM_LIMIT = 100;
export const PREFERENCES_LIMIT = 1000;

export type PreferenceInput = Readonly<{
  locationId: string;
  budget: string;
  searchTerm: string;
  preferences: string;
}>;

export type SearchPreferences = Readonly<{
  location: (typeof DEMO_LOCATIONS)[number];
  budgetForTwoInr: number;
  searchTerm: string;
  preferences: string;
}>;

export type FieldErrors = Readonly<Partial<Record<keyof PreferenceInput, string>>>;

type ParseResult =
  | Readonly<{ ok: true; value: SearchPreferences }>
  | Readonly<{ ok: false; errors: FieldErrors }>;

export function parsePreferences(input: PreferenceInput): ParseResult {
  const location = DEMO_LOCATIONS.find((entry) => entry.id === input.locationId);
  const budgetText = input.budget.trim();
  const budget = Number(budgetText);
  const searchTerm = input.searchTerm.trim();
  const preferences = input.preferences.trim();
  const errors: Partial<Record<keyof PreferenceInput, string>> = {};

  if (!location) errors.locationId = "Choose a demo location.";
  if (!/^\d+$/.test(budgetText) || !Number.isSafeInteger(budget) || budget <= 0) {
    errors.budget = "Enter a positive whole-rupee budget for two.";
  }
  if (!searchTerm) {
    errors.searchTerm = "Enter a cuisine, restaurant name, or kind of place.";
  } else if (searchTerm.length > SEARCH_TERM_LIMIT) {
    errors.searchTerm = `Use ${SEARCH_TERM_LIMIT} characters or fewer.`;
  }
  if (preferences.length > PREFERENCES_LIMIT) {
    errors.preferences = `Use ${PREFERENCES_LIMIT} characters or fewer.`;
  }
  if (!location || Object.keys(errors).length > 0) return { ok: false, errors };

  return {
    ok: true,
    value: { location, budgetForTwoInr: budget, searchTerm, preferences },
  };
}
