// Analytics IDs, read at build time (static output). See src/scripts/consent.ts.
const rawGa = import.meta.env.GA_TRACKING_ID as string | undefined;

// Universal Analytics ("UA-…") stopped collecting data in 2023; only GA4 IDs work.
export const gaId = rawGa && /^G-[A-Z0-9]+$/i.test(rawGa) ? rawGa : null;
if (rawGa && !gaId) {
  console.warn(
    `[analytics] GA_TRACKING_ID "${rawGa}" is not a GA4 measurement ID (G-…); Google Analytics is disabled.`,
  );
}

export const clarityId =
  (import.meta.env.CLARITY_ID as string | undefined) || null;

export const analyticsEnabled = Boolean(gaId || clarityId);
