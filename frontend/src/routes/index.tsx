import { createFileRoute, Link } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { readFile } from "node:fs/promises";

const getBusinessName = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const cfg = JSON.parse(await readFile("site.json", "utf8")) as {
      businessName?: string;
    };
    return cfg.businessName?.trim() ?? "";
  } catch {
    return "";
  }
});

export const Route = createFileRoute("/")({
  loader: () => getBusinessName(),
  component: Home,
});

function Home() {
  const businessName = Route.useLoaderData();

  return (
    <div className="min-h-dvh overflow-hidden bg-warm-50">
      {/* Navigation */}
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-warm-200/50 bg-white/80 backdrop-blur-lg">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl">✨</span>
            <span className="text-xl font-bold text-warm-900">
              {businessName || "Livity"}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link className="btn-ghost text-sm" to="/login">
              Sign in
            </Link>
            <Link className="btn-primary text-sm" to="/signup">
              Get started free
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28">
        {/* Background glow */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-gradient-radial from-hearth-200/40 via-legacy-200/20 to-transparent blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-warm-200 bg-white/50 px-4 py-1.5 text-sm text-warm-600 backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-hearth-500" />
            Preserving legacies since 2026
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-warm-900 sm:text-6xl lg:text-7xl">
            Your memories,{" "}
            <span className="bg-gradient-to-r from-hearth-600 to-legacy-600 bg-clip-text text-transparent">
              forever alive
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-warm-600 sm:text-xl">
            Turn your photos, stories, and voice recordings into an AI twin your
            family can talk to for generations. Upload once, connect forever.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link className="btn-primary text-base !px-8 !py-4" to="/signup">
              Start your legacy free
            </Link>
            <Link className="btn-secondary text-base !px-8 !py-4" to="/demo">
              See how it works
            </Link>
          </div>

          <p className="mt-4 text-sm text-warm-400">
            No credit card required &middot; 14-day free trial
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-warm-900 sm:text-4xl">
              Two ways to preserve a life story
            </h2>
            <p className="mt-4 text-lg text-warm-500">
              From a simple portrait to a fully interactive twin — choose your
              loved one's experience.
            </p>
          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-2">
            {/* Talking Portrait */}
            <div className="card group relative overflow-hidden transition-shadow hover:shadow-lg">
              <div className="absolute right-0 top-0 rounded-bl-2xl bg-hearth-100 px-4 py-1.5 text-xs font-semibold text-hearth-700">
                COMING SOON
              </div>
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-hearth-100 text-3xl">
                🎭
              </div>
              <h3 className="text-xl font-bold text-warm-900">
                Talking Portrait
              </h3>
              <p className="mt-3 text-warm-600">
                Upload a few photos and we generate an animated video portrait
                that speaks. Hear their voice, see their face — a window into
                their soul.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-warm-500">
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-hearth-500">✦</span>
                  Works with 3–5 photos
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-hearth-500">✦</span>
                  Natural eye contact &amp; expressions
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-hearth-500">✦</span>
                  Share the portrait with family
                </li>
              </ul>
            </div>

            {/* Conversational Twin */}
            <div className="card group relative overflow-hidden border-hearth-300/50 shadow-md transition-shadow hover:shadow-lg">
              <div className="absolute right-0 top-0 rounded-bl-2xl bg-hearth-600 px-4 py-1.5 text-xs font-semibold text-white">
                FEATURED
              </div>
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-legacy-100 text-3xl">
                💬
              </div>
              <h3 className="text-xl font-bold text-warm-900">
                Conversational Twin
              </h3>
              <p className="mt-3 text-warm-600">
                Upload stories, letters, and voice recordings. Your family can
                talk to the twin, ask questions, and hear responses in their
                voice and style.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-warm-500">
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-legacy-500">✦</span>
                  Powered by your uploaded memories
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-legacy-500">✦</span>
                  Zero-hallucination AI responses
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-legacy-500">✦</span>
                  Gets richer as family adds more
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-warm-100/50 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-warm-900 sm:text-4xl">
              How it works
            </h2>
            <p className="mt-4 text-lg text-warm-500">
              Three steps to create a legacy that lasts.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              {
                step: "01",
                icon: "📤",
                title: "Upload memories",
                desc: "Photos, letters, voice recordings — every piece of media helps us understand your loved one's voice and personality.",
              },
              {
                step: "02",
                icon: "✨",
                title: "AI creates their twin",
                desc: "Our engine processes everything into a Digital Twin that thinks, speaks, and remembers like them — with zero hallucination.",
              },
              {
                step: "03",
                icon: "👨‍👩‍👧‍👦",
                title: "Share with family",
                desc: "Invite loved ones to talk to the twin, add their own memories, and keep the conversation going for generations.",
              },
            ].map((item) => (
              <div key={item.step} className="card text-center">
                <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-hearth-100 to-legacy-100 text-2xl">
                  {item.icon}
                </div>
                <div className="mb-2 text-xs font-bold uppercase tracking-widest text-hearth-600">
                  Step {item.step}
                </div>
                <h3 className="text-lg font-bold text-warm-900">{item.title}</h3>
                <p className="mt-2 text-sm text-warm-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto max-w-4xl rounded-3xl bg-gradient-to-br from-warm-900 to-warm-800 p-8 text-center text-white sm:p-16">
            <div className="mb-6 text-5xl">🔒</div>
            <h2 className="text-2xl font-bold sm:text-3xl">
              Your memories are sacred. They're also encrypted.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-warm-300">
              Every photo, letter, and recording is encrypted with AES-256. Not
              even Livity can read your vault. Your family sees what you choose
              to share.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-warm-400">
              <span className="flex items-center gap-1">✦ Zero-knowledge encryption</span>
              <span className="flex items-center gap-1">✦ End-to-end protected</span>
              <span className="flex items-center gap-1">✦ Strict IAM controls</span>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-warm-100/50 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-warm-900 sm:text-4xl">
              Simple pricing for a lasting legacy
            </h2>
            <p className="mt-4 text-lg text-warm-500">
              Your subscription pays for the vault. Family members access it
              free, forever.
            </p>
          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {[
              {
                name: "Vault",
                price: "$7",
                desc: "Storage-only. Keep memories safe.",
                features: ["10 GB storage", "Photo & document vault", "Family sharing", "Encrypted storage"],
                cta: "Start free trial",
                featured: false,
              },
              {
                name: "Twin",
                price: "$19",
                desc: "Create a Digital Twin your family can talk to.",
                features: ["50 GB storage", "Digital Twin creation", "Talking Portrait", "Conversational AI", "Priority processing"],
                cta: "Start free trial",
                featured: true,
              },
              {
                name: "Legacy",
                price: "$49",
                desc: "For large family vaults with multiple twins.",
                features: ["200+ GB storage", "Up to 5 Digital Twins", "All Twin features", "Dedicated support", "Bulk upload tools"],
                cta: "Start free trial",
                featured: false,
              },
            ].map((plan) => (
              <div
                key={plan.name}
                className={`card relative ${
                  plan.featured
                    ? "border-hearth-400 ring-2 ring-hearth-400/20"
                    : ""
                }`}
              >
                {plan.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-hearth-600 px-4 py-1 text-xs font-semibold text-white">
                    Most popular
                  </div>
                )}
                <h3 className="text-lg font-bold text-warm-900">{plan.name}</h3>
                <p className="mt-1 text-sm text-warm-500">{plan.desc}</p>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-warm-900">
                    {plan.price}
                  </span>
                  <span className="text-warm-400">/mo</span>
                </div>
                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm text-warm-600"
                    >
                      <span className="text-hearth-500">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  className={`mt-8 block w-full text-center ${
                    plan.featured ? "btn-primary" : "btn-secondary"
                  }`}
                  to="/signup"
                >
                  {plan.cta}
                </Link>
                <p className="mt-2 text-center text-xs text-warm-400">
                  14-day free trial &middot; Cancel anytime
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-bold text-warm-900 sm:text-4xl">
            Start building your family's legacy today
          </h2>
          <p className="mt-4 text-lg text-warm-500">
            In 10 minutes, you can upload your first memories. In a lifetime,
            your family can still talk to you.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link className="btn-primary text-base !px-8 !py-4" to="/signup">
              Create your Digital Twin
            </Link>
            <Link className="btn-secondary text-base !px-8 !py-4" to="/login">
              Sign in
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-warm-200 bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="flex items-center gap-2">
              <span className="text-xl">✨</span>
              <span className="font-bold text-warm-900">Livity</span>
            </div>
            <div className="flex gap-6 text-sm text-warm-500">
              <a href="#" className="hover:text-warm-800">
                Privacy
              </a>
              <a href="#" className="hover:text-warm-800">
                Terms
              </a>
              <a href="#" className="hover:text-warm-800">
                Security
              </a>
              <a href="#" className="hover:text-warm-800">
                Contact
              </a>
            </div>
            <p className="text-sm text-warm-400">
              &copy; 2026 Livity. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}