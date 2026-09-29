// Opt-in consent for analytics. GA4 and Clarity are injected only after "Accept".
type Choice = "granted" | "denied";
interface Stored {
  choice: Choice;
  ts: number;
  v: number;
}
interface Config {
  gaId: string | null;
  clarityId: string | null;
}

const KEY = "cv-consent";
const VERSION = 1;
// Ask again after ~6 months, as the Italian DPA (Garante) guidelines allow.
const MAX_AGE = 1000 * 60 * 60 * 24 * 180;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
    clarity: ((...args: unknown[]) => void) & { q?: unknown[] };
  }
}

const config: Config = JSON.parse(
  document.getElementById("analytics-config")?.textContent ?? "{}",
);
const banner = document.querySelector<HTMLElement>("[data-cookie-banner]");

const read = (): Choice | null => {
  try {
    const s = JSON.parse(localStorage.getItem(KEY) ?? "null") as Stored | null;
    if (!s || s.v !== VERSION || Date.now() - s.ts > MAX_AGE) return null;
    return s.choice;
  } catch {
    return null;
  }
};

const write = (choice: Choice) => {
  try {
    localStorage.setItem(
      KEY,
      JSON.stringify({ choice, ts: Date.now(), v: VERSION }),
    );
  } catch {
    // Storage blocked: the choice applies to this page view only.
  }
};

const addScript = (src: string) => {
  const s = document.createElement("script");
  s.async = true;
  s.src = src;
  document.head.appendChild(s);
};

let loaded = false;
const loadAnalytics = () => {
  if (loaded) return;
  loaded = true;

  if (config.gaId) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      // gtag expects the arguments object itself.
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments);
    };
    window.gtag("consent", "default", {
      analytics_storage: "granted",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
    window.gtag("js", new Date());
    window.gtag("config", config.gaId);
    addScript(`https://www.googletagmanager.com/gtag/js?id=${config.gaId}`);

    // Outbound link clicks.
    document.addEventListener("click", e => {
      const a = (e.target as Element).closest?.(
        "a[href]",
      ) as HTMLAnchorElement | null;
      if (!a || a.host === location.host || !/^(https?|mailto):/.test(a.href))
        return;
      window.gtag("event", "click", {
        event_category: "outbound",
        event_label: a.href,
        transport_type: "beacon",
      });
    });
  }

  if (config.clarityId) {
    window.clarity =
      window.clarity ||
      Object.assign(
        function (...args: unknown[]) {
          (window.clarity.q = window.clarity.q || []).push(args);
        },
        { q: [] as unknown[] },
      );
    window.clarity("consentv2", {
      ad_Storage: "denied",
      analytics_Storage: "granted",
    });
    addScript(`https://www.clarity.ms/tag/${config.clarityId}`);
  }
};

// Remove first-party analytics cookies after consent is withdrawn.
const clearCookies = () => {
  const names = document.cookie
    .split(";")
    .map(c => c.split("=")[0].trim())
    .filter(n => /^(_ga|_gid|_gat|_clck|_clsk|CLID|MUID)/.test(n));
  const host = location.hostname;
  const domains = ["", host, `.${host}`, `.${host.replace(/^www\./, "")}`];
  for (const name of names)
    for (const d of domains)
      document.cookie = `${name}=; Max-Age=0; path=/${d ? `; domain=${d}` : ""}`;
};

// Focus moves into the banner only when the visitor opened it themselves.
const show = (focus = false) => {
  if (!banner) return;
  banner.hidden = false;
  if (focus)
    banner
      .querySelector<HTMLButtonElement>('[data-consent="granted"]')
      ?.focus({ preventScroll: true });
};

const choose = (choice: Choice) => {
  const previous = read();
  write(choice);
  if (banner) banner.hidden = true;
  if (choice === "granted") loadAnalytics();
  else if (previous === "granted" || loaded) {
    // Scripts already running can't be unloaded: clear cookies and reload clean.
    clearCookies();
    location.reload();
  }
};

banner
  ?.querySelectorAll<HTMLButtonElement>("[data-consent]")
  .forEach(btn =>
    btn.addEventListener("click", () => choose(btn.dataset.consent as Choice)),
  );

// "Cookie settings" links anywhere on the page reopen the banner.
document.addEventListener("click", e => {
  if (!(e.target as Element).closest?.("[data-cookie-settings]")) return;
  e.preventDefault();
  show(true);
});

const current = read();
if (current === "granted") loadAnalytics();
else {
  // GA can rewrite cookies while the page unloads, so clear leftovers on every visit.
  clearCookies();
  if (current === null) show();
}

export {};
