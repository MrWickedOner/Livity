import { jsx, jsxs } from "react/jsx-runtime";
import { u as useAsync, D as DashboardShell } from "./use-async-B0Z9Hm8e.js";
import { u as useAuth, f as family } from "./router-CsWl_KXd.js";
import "react";
import "@tanstack/react-router";
import "../server.js";
import "node:async_hooks";
import "h3-v2";
import "@tanstack/router-core";
import "seroval";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/router-core/ssr/server";
import "@tanstack/react-router/ssr/server";
function Family() {
  const {
    user
  } = useAuth();
  const {
    data,
    isLoading,
    error
  } = useAsync(() => family.list(), []);
  const members = data?.members ?? [];
  return /* @__PURE__ */ jsx(DashboardShell, { children: /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-warm-900", children: "Family" }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-warm-500", children: "Manage who has access to your vault." })
      ] }),
      /* @__PURE__ */ jsx("button", { className: "btn-primary text-sm", type: "button", children: "+ Invite member" })
    ] }),
    isLoading && /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center py-12", children: /* @__PURE__ */ jsx("div", { className: "h-8 w-8 animate-spin rounded-full border-2 border-hearth-400 border-t-transparent" }) }),
    error && /* @__PURE__ */ jsx("div", { className: "card border-red-200 bg-red-50 text-center text-sm text-red-700", children: "Could not load family members. The backend may be offline." }),
    !isLoading && !error && /* @__PURE__ */ jsx("div", { className: "card divide-y divide-warm-100", children: members.length === 0 ? /* @__PURE__ */ jsx("div", { className: "text-center py-8 text-warm-500", children: /* @__PURE__ */ jsx("p", { children: "No family members yet. Invite someone to share your vault." }) }) : members.map((member) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 py-4 first:pt-0 last:pb-0", children: [
      /* @__PURE__ */ jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-hearth-200 to-legacy-200 text-sm font-bold text-white", children: member.name.charAt(0).toUpperCase() }),
      /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
        /* @__PURE__ */ jsx("p", { className: "font-medium text-warm-900", children: member.name }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-warm-400", children: member.email })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx("span", { className: `badge ${member.role === "owner" ? "bg-hearth-100 text-hearth-700" : member.role === "contributor" ? "bg-legacy-100 text-legacy-700" : "bg-warm-100 text-warm-600"}`, children: member.role.charAt(0).toUpperCase() + member.role.slice(1) }),
        /* @__PURE__ */ jsxs("span", { className: `flex items-center gap-1 text-xs ${member.status === "active" ? "text-green-600" : "text-warm-400"}`, children: [
          /* @__PURE__ */ jsx("span", { className: `h-1.5 w-1.5 rounded-full ${member.status === "active" ? "bg-green-500" : "bg-warm-300"}` }),
          member.status
        ] })
      ] })
    ] }, member.id)) }),
    /* @__PURE__ */ jsxs("div", { className: "rounded-2xl bg-warm-50 p-6", children: [
      /* @__PURE__ */ jsx("h3", { className: "font-semibold text-warm-800", children: "About permissions" }),
      /* @__PURE__ */ jsxs("div", { className: "mt-3 space-y-2 text-sm text-warm-600", children: [
        /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx("strong", { className: "text-warm-800", children: "Viewers" }),
          " can see all memories and chat with Digital Twins. They cannot upload new content."
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx("strong", { className: "text-warm-800", children: "Contributors" }),
          " can upload photos, stories, and recordings to help enrich the Digital Twin."
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Descendants always get ",
          /* @__PURE__ */ jsx("strong", { className: "text-warm-800", children: "free read-only access" }),
          " — the subscriber pays for the vault."
        ] })
      ] })
    ] })
  ] }) });
}
export {
  Family as component
};
