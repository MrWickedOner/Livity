import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { R as Route } from "./router-CsWl_KXd.js";
import "react";
import "../server.js";
import "node:async_hooks";
import "h3-v2";
import "@tanstack/router-core";
import "seroval";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/router-core/ssr/server";
import "@tanstack/react-router/ssr/server";
function Home() {
  const businessName = Route.useLoaderData();
  return /* @__PURE__ */ jsxs("div", { className: "min-h-dvh overflow-hidden bg-warm-50", children: [
    /* @__PURE__ */ jsx("nav", { className: "fixed inset-x-0 top-0 z-50 border-b border-warm-200/50 bg-white/80 backdrop-blur-lg", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx("span", { className: "text-2xl", children: "✨" }),
        /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-warm-900", children: businessName || "Livity" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx(Link, { className: "btn-ghost text-sm", to: "/login", children: "Sign in" }),
        /* @__PURE__ */ jsx(Link, { className: "btn-primary text-sm", to: "/signup", children: "Get started free" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("section", { className: "relative pt-32 pb-20 sm:pt-40 sm:pb-28", children: [
      /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-0 overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-gradient-radial from-hearth-200/40 via-legacy-200/20 to-transparent blur-3xl" }) }),
      /* @__PURE__ */ jsxs("div", { className: "relative mx-auto max-w-5xl px-4 text-center sm:px-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-6 inline-flex items-center gap-2 rounded-full border border-warm-200 bg-white/50 px-4 py-1.5 text-sm text-warm-600 backdrop-blur-sm", children: [
          /* @__PURE__ */ jsx("span", { className: "flex h-2 w-2 rounded-full bg-hearth-500" }),
          "Preserving legacies since 2026"
        ] }),
        /* @__PURE__ */ jsxs("h1", { className: "text-4xl font-extrabold tracking-tight text-warm-900 sm:text-6xl lg:text-7xl", children: [
          "Your memories,",
          " ",
          /* @__PURE__ */ jsx("span", { className: "bg-gradient-to-r from-hearth-600 to-legacy-600 bg-clip-text text-transparent", children: "forever alive" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mx-auto mt-6 max-w-2xl text-lg text-warm-600 sm:text-xl", children: "Turn your photos, stories, and voice recordings into an AI twin your family can talk to for generations. Upload once, connect forever." }),
        /* @__PURE__ */ jsxs("div", { className: "mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row", children: [
          /* @__PURE__ */ jsx(Link, { className: "btn-primary text-base !px-8 !py-4", to: "/signup", children: "Start your legacy free" }),
          /* @__PURE__ */ jsx(Link, { className: "btn-secondary text-base !px-8 !py-4", to: "/demo", children: "See how it works" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 text-sm text-warm-400", children: "No credit card required · 14-day free trial" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "py-20 sm:py-28", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-2xl text-center", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-warm-900 sm:text-4xl", children: "Two ways to preserve a life story" }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 text-lg text-warm-500", children: "From a simple portrait to a fully interactive twin — choose your loved one's experience." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-16 grid gap-8 lg:grid-cols-2", children: [
        /* @__PURE__ */ jsxs("div", { className: "card group relative overflow-hidden transition-shadow hover:shadow-lg", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute right-0 top-0 rounded-bl-2xl bg-hearth-100 px-4 py-1.5 text-xs font-semibold text-hearth-700", children: "COMING SOON" }),
          /* @__PURE__ */ jsx("div", { className: "mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-hearth-100 text-3xl", children: "🎭" }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-warm-900", children: "Talking Portrait" }),
          /* @__PURE__ */ jsx("p", { className: "mt-3 text-warm-600", children: "Upload a few photos and we generate an animated video portrait that speaks. Hear their voice, see their face — a window into their soul." }),
          /* @__PURE__ */ jsxs("ul", { className: "mt-6 space-y-3 text-sm text-warm-500", children: [
            /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "mt-0.5 text-hearth-500", children: "✦" }),
              "Works with 3–5 photos"
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "mt-0.5 text-hearth-500", children: "✦" }),
              "Natural eye contact & expressions"
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "mt-0.5 text-hearth-500", children: "✦" }),
              "Share the portrait with family"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "card group relative overflow-hidden border-hearth-300/50 shadow-md transition-shadow hover:shadow-lg", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute right-0 top-0 rounded-bl-2xl bg-hearth-600 px-4 py-1.5 text-xs font-semibold text-white", children: "FEATURED" }),
          /* @__PURE__ */ jsx("div", { className: "mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-legacy-100 text-3xl", children: "💬" }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-warm-900", children: "Conversational Twin" }),
          /* @__PURE__ */ jsx("p", { className: "mt-3 text-warm-600", children: "Upload stories, letters, and voice recordings. Your family can talk to the twin, ask questions, and hear responses in their voice and style." }),
          /* @__PURE__ */ jsxs("ul", { className: "mt-6 space-y-3 text-sm text-warm-500", children: [
            /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "mt-0.5 text-legacy-500", children: "✦" }),
              "Powered by your uploaded memories"
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "mt-0.5 text-legacy-500", children: "✦" }),
              "Zero-hallucination AI responses"
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "mt-0.5 text-legacy-500", children: "✦" }),
              "Gets richer as family adds more"
            ] })
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "bg-warm-100/50 py-20 sm:py-28", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-2xl text-center", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-warm-900 sm:text-4xl", children: "How it works" }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 text-lg text-warm-500", children: "Three steps to create a legacy that lasts." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-16 grid gap-8 md:grid-cols-3", children: [{
        step: "01",
        icon: "📤",
        title: "Upload memories",
        desc: "Photos, letters, voice recordings — every piece of media helps us understand your loved one's voice and personality."
      }, {
        step: "02",
        icon: "✨",
        title: "AI creates their twin",
        desc: "Our engine processes everything into a Digital Twin that thinks, speaks, and remembers like them — with zero hallucination."
      }, {
        step: "03",
        icon: "👨‍👩‍👧‍👦",
        title: "Share with family",
        desc: "Invite loved ones to talk to the twin, add their own memories, and keep the conversation going for generations."
      }].map((item) => /* @__PURE__ */ jsxs("div", { className: "card text-center", children: [
        /* @__PURE__ */ jsx("div", { className: "mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-hearth-100 to-legacy-100 text-2xl", children: item.icon }),
        /* @__PURE__ */ jsxs("div", { className: "mb-2 text-xs font-bold uppercase tracking-widest text-hearth-600", children: [
          "Step ",
          item.step
        ] }),
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-warm-900", children: item.title }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-warm-500", children: item.desc })
      ] }, item.step)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20 sm:py-28", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-7xl px-4 sm:px-6", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-4xl rounded-3xl bg-gradient-to-br from-warm-900 to-warm-800 p-8 text-center text-white sm:p-16", children: [
      /* @__PURE__ */ jsx("div", { className: "mb-6 text-5xl", children: "🔒" }),
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold sm:text-3xl", children: "Your memories are sacred. They're also encrypted." }),
      /* @__PURE__ */ jsx("p", { className: "mx-auto mt-4 max-w-2xl text-warm-300", children: "Every photo, letter, and recording is encrypted with AES-256. Not even Livity can read your vault. Your family sees what you choose to share." }),
      /* @__PURE__ */ jsxs("div", { className: "mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-warm-400", children: [
        /* @__PURE__ */ jsx("span", { className: "flex items-center gap-1", children: "✦ Zero-knowledge encryption" }),
        /* @__PURE__ */ jsx("span", { className: "flex items-center gap-1", children: "✦ End-to-end protected" }),
        /* @__PURE__ */ jsx("span", { className: "flex items-center gap-1", children: "✦ Strict IAM controls" })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { className: "bg-warm-100/50 py-20 sm:py-28", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-2xl text-center", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-warm-900 sm:text-4xl", children: "Simple pricing for a lasting legacy" }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 text-lg text-warm-500", children: "Your subscription pays for the vault. Family members access it free, forever." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-16 grid gap-8 lg:grid-cols-3", children: [{
        name: "Vault",
        price: "$7",
        desc: "Storage-only. Keep memories safe.",
        features: ["10 GB storage", "Photo & document vault", "Family sharing", "Encrypted storage"],
        cta: "Start free trial",
        featured: false
      }, {
        name: "Twin",
        price: "$19",
        desc: "Create a Digital Twin your family can talk to.",
        features: ["50 GB storage", "Digital Twin creation", "Talking Portrait", "Conversational AI", "Priority processing"],
        cta: "Start free trial",
        featured: true
      }, {
        name: "Legacy",
        price: "$49",
        desc: "For large family vaults with multiple twins.",
        features: ["200+ GB storage", "Up to 5 Digital Twins", "All Twin features", "Dedicated support", "Bulk upload tools"],
        cta: "Start free trial",
        featured: false
      }].map((plan) => /* @__PURE__ */ jsxs("div", { className: `card relative ${plan.featured ? "border-hearth-400 ring-2 ring-hearth-400/20" : ""}`, children: [
        plan.featured && /* @__PURE__ */ jsx("div", { className: "absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-hearth-600 px-4 py-1 text-xs font-semibold text-white", children: "Most popular" }),
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-warm-900", children: plan.name }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-warm-500", children: plan.desc }),
        /* @__PURE__ */ jsxs("div", { className: "mt-4 flex items-baseline gap-1", children: [
          /* @__PURE__ */ jsx("span", { className: "text-4xl font-extrabold text-warm-900", children: plan.price }),
          /* @__PURE__ */ jsx("span", { className: "text-warm-400", children: "/mo" })
        ] }),
        /* @__PURE__ */ jsx("ul", { className: "mt-6 space-y-3", children: plan.features.map((feature) => /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2 text-sm text-warm-600", children: [
          /* @__PURE__ */ jsx("span", { className: "text-hearth-500", children: "✓" }),
          feature
        ] }, feature)) }),
        /* @__PURE__ */ jsx(Link, { className: `mt-8 block w-full text-center ${plan.featured ? "btn-primary" : "btn-secondary"}`, to: "/signup", children: plan.cta }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-center text-xs text-warm-400", children: "14-day free trial · Cancel anytime" })
      ] }, plan.name)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20 sm:py-28", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-3xl px-4 text-center sm:px-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-warm-900 sm:text-4xl", children: "Start building your family's legacy today" }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-lg text-warm-500", children: "In 10 minutes, you can upload your first memories. In a lifetime, your family can still talk to you." }),
      /* @__PURE__ */ jsxs("div", { className: "mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row", children: [
        /* @__PURE__ */ jsx(Link, { className: "btn-primary text-base !px-8 !py-4", to: "/signup", children: "Create your Digital Twin" }),
        /* @__PURE__ */ jsx(Link, { className: "btn-secondary text-base !px-8 !py-4", to: "/login", children: "Sign in" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("footer", { className: "border-t border-warm-200 bg-white py-12", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-7xl px-4 sm:px-6", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-between gap-6 sm:flex-row", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx("span", { className: "text-xl", children: "✨" }),
        /* @__PURE__ */ jsx("span", { className: "font-bold text-warm-900", children: "Livity" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-6 text-sm text-warm-500", children: [
        /* @__PURE__ */ jsx("a", { href: "#", className: "hover:text-warm-800", children: "Privacy" }),
        /* @__PURE__ */ jsx("a", { href: "#", className: "hover:text-warm-800", children: "Terms" }),
        /* @__PURE__ */ jsx("a", { href: "#", className: "hover:text-warm-800", children: "Security" }),
        /* @__PURE__ */ jsx("a", { href: "#", className: "hover:text-warm-800", children: "Contact" })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-warm-400", children: "© 2026 Livity. All rights reserved." })
    ] }) }) })
  ] });
}
export {
  Home as component
};
