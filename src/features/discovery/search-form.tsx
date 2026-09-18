"use client";

import { useRef, useState, type FormEvent } from "react";
import {
  DEMO_LOCATIONS,
  PREFERENCES_LIMIT,
  SEARCH_TERM_LIMIT,
  parsePreferences,
  type FieldErrors,
  type PreferenceInput,
  type SearchPreferences,
} from "./preferences";

const EMPTY_INPUT: PreferenceInput = {
  locationId: "", budget: "", searchTerm: "", preferences: "",
};

const FIELD_ORDER = ["locationId", "budget", "searchTerm", "preferences"] as const;
const EXAMPLES = ["Chinese", "Italian", "Cafe", "Rooftop"] as const;
const rupees = new Intl.NumberFormat("en-IN", {
  style: "currency", currency: "INR", maximumFractionDigits: 0,
});

export default function SearchForm() {
  const [input, setInput] = useState(EMPTY_INPUT);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [preview, setPreview] = useState<SearchPreferences | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  function update(field: keyof PreferenceInput, value: string) {
    setInput((previous) => ({ ...previous, [field]: value }));
    setErrors((previous) => ({ ...previous, [field]: undefined }));
    setPreview(null);
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = parsePreferences(input);
    if (!result.ok) {
      setErrors(result.errors);
      setPreview(null);
      const firstInvalid = FIELD_ORDER.find((field) => result.errors[field]);
      const control = formRef.current?.elements.namedItem(firstInvalid ?? "");
      if (control instanceof HTMLElement) control.focus();
      return;
    }
    setErrors({});
    setPreview(result.value);
  }

  function reset() {
    setInput(EMPTY_INPUT);
    setErrors({});
    setPreview(null);
  }

  return (
    <section className="status-card" aria-labelledby="form-title">
      <span className="badge">Preview only</span>
      <h2 id="form-title">What sounds good today?</h2>
      <p>Set the essentials, then add the preferences that make a place right for you.</p>

      <form ref={formRef} onSubmit={submit} onReset={reset} noValidate>
        <div className="form-grid">
          <div className="field">
            <label htmlFor="locationId">Location</label>
            <select
              id="locationId" name="locationId" value={input.locationId}
              onChange={(event) => update("locationId", event.target.value)}
              required aria-invalid={Boolean(errors.locationId)}
              aria-describedby={`location-hint${errors.locationId ? " location-error" : ""}`}
            >
              <option value="">Select a demo location</option>
              {DEMO_LOCATIONS.map((location) => (
                <option key={location.id} value={location.id}>{location.label}</option>
              ))}
            </select>
            <p id="location-hint" className="field-hint">
              Demo locations only. Live location lookup is not connected yet.
            </p>
            {errors.locationId && <p id="location-error" className="field-error">{errors.locationId}</p>}
          </div>

          <div className="field">
            <label htmlFor="budget">Budget for two (₹)</label>
            <input
              id="budget" name="budget" type="text" inputMode="numeric"
              placeholder="1000" value={input.budget}
              onChange={(event) => update("budget", event.target.value)}
              required aria-invalid={Boolean(errors.budget)}
              aria-describedby={`budget-hint${errors.budget ? " budget-error" : ""}`}
            />
            <p id="budget-hint" className="field-hint">
              Target total for two people, in whole rupees. Not a guaranteed bill.
            </p>
            {errors.budget && <p id="budget-error" className="field-error">{errors.budget}</p>}
          </div>
        </div>

        <div className="field">
          <label htmlFor="searchTerm">What are you looking for?</label>
          <input
            id="searchTerm" name="searchTerm" type="text"
            placeholder="Chinese, a cafe, rooftop, or a restaurant name"
            value={input.searchTerm} maxLength={SEARCH_TERM_LIMIT}
            onChange={(event) => update("searchTerm", event.target.value)}
            required aria-invalid={Boolean(errors.searchTerm)}
            aria-describedby={`search-hint${errors.searchTerm ? " search-error" : ""}`}
          />
          <p id="search-hint" className="field-hint">
            Enter one search concept, not a full request. Put other preferences below.
          </p>
          {errors.searchTerm && <p id="search-error" className="field-error">{errors.searchTerm}</p>}
          <div className="examples" role="group" aria-label="Example search terms">
            {EXAMPLES.map((example) => (
              <button
                type="button" className="example-chip" key={example}
                aria-pressed={input.searchTerm === example}
                onClick={() => update("searchTerm", example)}
              >
                {example}
              </button>
            ))}
          </div>
        </div>

        <div className="field">
          <label htmlFor="preferences">Anything else? (optional)</label>
          <textarea
            id="preferences" name="preferences" rows={3}
            placeholder="Somewhere quiet for a conversation, preferably outdoors"
            value={input.preferences} maxLength={PREFERENCES_LIMIT}
            onChange={(event) => update("preferences", event.target.value)}
            aria-invalid={Boolean(errors.preferences)}
            aria-describedby={`preferences-hint${errors.preferences ? " preferences-error" : ""}`}
          />
          <p id="preferences-hint" className="field-hint">
            Jev will use available restaurant evidence to assess these preferences
            once connected. {input.preferences.length}/{PREFERENCES_LIMIT} characters.
          </p>
          {errors.preferences && <p id="preferences-error" className="field-error">{errors.preferences}</p>}
        </div>

        <div className="form-actions">
          <button type="submit" className="primary-button">Preview preferences</button>
          <button type="reset" className="secondary-button">Clear form</button>
        </div>
      </form>

      <div aria-live="polite" aria-atomic="true">
        {preview && (
          <section className="preview" aria-labelledby="preview-title">
            <h3 id="preview-title">Your search preview</h3>
            <dl>
              <div><dt>Location</dt><dd>{preview.location.label}</dd></div>
              <div><dt>Target budget for two</dt><dd>{rupees.format(preview.budgetForTwoInr)}</dd></div>
              <div><dt>Search term</dt><dd>{preview.searchTerm}</dd></div>
              <div><dt>Additional preferences</dt><dd>{preview.preferences || "None specified"}</dd></div>
            </dl>
            <p>No restaurants have been searched. This preview stays in your browser.</p>
          </section>
        )}
      </div>
      <p className="status-note">No restaurant searches or AI requests are made yet.</p>
    </section>
  );
}
