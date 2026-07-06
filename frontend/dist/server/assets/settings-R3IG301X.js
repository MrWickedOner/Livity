import { jsx, jsxs } from "react/jsx-runtime";
import { u as useAsync, D as DashboardShell } from "./use-async-B0Z9Hm8e.js";
import { u as useAuth, p as profile } from "./router-CsWl_KXd.js";
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
function formatBytes(bytes) {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
}
function Settings() {
  const {
    user
  } = useAuth();
  const {
    data: profileData,
    isLoading,
    error
  } = useAsync(() => profile.get(), []);
  const storagePct = profileData ? Math.min(profileData.storageUsed / profileData.storageTotal * 100, 100) : 0;
  return /* @__PURE__ */ jsx(DashboardShell, { children: /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-warm-900", children: "Settings" }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-warm-500", children: "Manage your account and subscription." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "card space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "font-semibold text-warm-900", children: "Profile" }),
        /* @__PURE__ */ jsxs("div", { className: "mt-3 grid gap-4 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-warm-700", htmlFor: "s-name", children: "Name" }),
            /* @__PURE__ */ jsx("input", { className: "input-field mt-1", defaultValue: user?.name ?? "", id: "s-name", type: "text" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-warm-700", htmlFor: "s-email", children: "Email" }),
            /* @__PURE__ */ jsx("input", { className: "input-field mt-1", defaultValue: user?.email ?? "", id: "s-email", type: "email" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("hr", { className: "border-warm-200" }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "font-semibold text-warm-900", children: "Subscription" }),
        isLoading ? /* @__PURE__ */ jsx("div", { className: "mt-3 flex items-center justify-center py-8", children: /* @__PURE__ */ jsx("div", { className: "h-6 w-6 animate-spin rounded-full border-2 border-hearth-400 border-t-transparent" }) }) : error ? /* @__PURE__ */ jsx("div", { className: "mt-3 rounded-xl bg-red-50 p-4 text-sm text-red-700", children: "Could not load subscription info." }) : profileData ? /* @__PURE__ */ jsxs("div", { className: "mt-3 rounded-xl bg-hearth-50 p-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("p", { className: "font-medium text-warm-900 capitalize", children: [
                profileData.plan,
                " Plan"
              ] }),
              /* @__PURE__ */ jsxs("p", { className: "text-sm text-warm-500", children: [
                profileData.plan === "vault" ? "$7" : profileData.plan === "twin" ? "$19" : "$49",
                "/month",
                profileData.subscriptionStatus === "active" ? "" : ` · ${profileData.subscriptionStatus}`
              ] })
            ] }),
            /* @__PURE__ */ jsx("span", { className: `badge ${profileData.subscriptionStatus === "active" ? "bg-green-100 text-green-800" : "bg-warm-200 text-warm-700"}`, children: profileData.subscriptionStatus === "active" ? "Active" : profileData.subscriptionStatus })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-3 h-2 overflow-hidden rounded-full bg-hearth-200", children: /* @__PURE__ */ jsx("div", { className: "h-full rounded-full bg-hearth-500", style: {
            width: `${storagePct}%`
          } }) }),
          /* @__PURE__ */ jsxs("p", { className: "mt-1 text-xs text-warm-500", children: [
            formatBytes(profileData.storageUsed),
            " of ",
            formatBytes(profileData.storageTotal),
            " used"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4 flex gap-3", children: [
            /* @__PURE__ */ jsx("button", { className: "btn-secondary text-sm", type: "button", children: "Change plan" }),
            /* @__PURE__ */ jsx("button", { className: "btn-ghost text-sm text-red-600 hover:bg-red-50", type: "button", children: "Cancel" })
          ] })
        ] }) : null
      ] }),
      /* @__PURE__ */ jsx("hr", { className: "border-warm-200" }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "font-semibold text-warm-900", children: "Security" }),
        /* @__PURE__ */ jsxs("div", { className: "mt-3 space-y-3 text-sm text-warm-600", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between rounded-xl bg-warm-50 p-3", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "font-medium text-warm-800", children: "Zero-knowledge encryption" }),
              /* @__PURE__ */ jsx("p", { className: "text-warm-500", children: "Your data is encrypted with AES-256. Not even Livity can read it." })
            ] }),
            /* @__PURE__ */ jsx("span", { className: "text-green-600", children: "✓ Active" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between rounded-xl bg-warm-50 p-3", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "font-medium text-warm-800", children: "Two-factor authentication" }),
              /* @__PURE__ */ jsx("p", { className: "text-warm-500", children: "Add an extra layer of security to your account." })
            ] }),
            /* @__PURE__ */ jsx("button", { className: "btn-ghost text-sm", type: "button", children: "Enable" })
          ] })
        ] })
      ] })
    ] })
  ] }) });
}
export {
  Settings as component
};
