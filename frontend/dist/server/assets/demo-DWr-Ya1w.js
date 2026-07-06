import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { C as ConversationalChat } from "./ConversationalChat-Mgff5Q9z.js";
import "react";
import "./router-CsWl_KXd.js";
import "../server.js";
import "node:async_hooks";
import "h3-v2";
import "@tanstack/router-core";
import "seroval";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/router-core/ssr/server";
import "@tanstack/react-router/ssr/server";
function Demo() {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-dvh bg-warm-50", children: [
    /* @__PURE__ */ jsx("nav", { className: "border-b border-warm-200 bg-white/80 backdrop-blur-lg", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6", children: [
      /* @__PURE__ */ jsxs(Link, { className: "flex items-center gap-2 text-xl font-bold text-warm-900", to: "/", children: [
        /* @__PURE__ */ jsx("span", { children: "✨" }),
        "Livity"
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx(Link, { className: "btn-ghost text-sm", to: "/login", children: "Sign in" }),
        /* @__PURE__ */ jsx(Link, { className: "btn-primary text-sm", to: "/signup", children: "Get started" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-5xl px-4 py-12 sm:px-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold text-warm-900 sm:text-4xl", children: "See Livity in action" }),
        /* @__PURE__ */ jsx("p", { className: "mt-3 text-lg text-warm-500", children: "Your memories, brought to life with AI." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-12 grid gap-8 lg:grid-cols-2", children: [
        /* @__PURE__ */ jsx("div", { className: "card flex aspect-video items-center justify-center bg-gradient-to-br from-hearth-100 to-legacy-100", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsx("div", { className: "mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white/80 text-4xl shadow-lg", children: "▶️" }),
          /* @__PURE__ */ jsx("p", { className: "font-medium text-warm-700", children: "SadTalker portrait video" }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-warm-500", children: "Self-hosted AI talking-head generation from photos" })
        ] }) }),
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(ConversationalChat, { twinId: "demo-twin", twinName: "Grandma Rose" }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-12 text-center", children: /* @__PURE__ */ jsx(Link, { className: "btn-primary text-base !px-8 !py-4", to: "/signup", children: "Start creating your own legacy" }) })
    ] })
  ] });
}
export {
  Demo as component
};
