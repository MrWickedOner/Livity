import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { u as useAsync, D as DashboardShell } from "./use-async-B0Z9Hm8e.js";
import "react";
import { P as PortraitGrid } from "./TalkingPortraitViewer-CXJ62G5W.js";
import { v as vault } from "./router-CsWl_KXd.js";
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
function PhotoGrid({ items }) {
  if (items.length === 0) {
    return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-warm-200 bg-warm-50/50 px-6 py-16 text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-hearth-100 text-3xl text-hearth-600", children: "🖼️" }),
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-warm-800", children: "No photos yet" }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-warm-500", children: "Upload photos to start building a visual legacy." })
    ] });
  }
  return /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4", children: items.map((item) => /* @__PURE__ */ jsxs(
    "div",
    {
      className: "group relative aspect-square overflow-hidden rounded-xl bg-warm-100",
      children: [
        item.thumbnail ? /* @__PURE__ */ jsx(
          "img",
          {
            src: item.thumbnail,
            alt: item.name,
            className: "h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          }
        ) : /* @__PURE__ */ jsx("div", { className: "flex h-full w-full items-center justify-center text-4xl text-warm-300", children: "📷" }),
        /* @__PURE__ */ jsxs("div", { className: "absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100", children: [
          /* @__PURE__ */ jsx("p", { className: "truncate text-sm font-medium text-white", children: item.name }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-white/70", children: item.date })
        ] })
      ]
    },
    item.id
  )) });
}
function DocumentList({ items }) {
  if (items.length === 0) {
    return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-warm-200 bg-warm-50/50 px-6 py-16 text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-legacy-100 text-3xl text-legacy-600", children: "📄" }),
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-warm-800", children: "No documents yet" }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-warm-500", children: "Letters, stories, and handwritten notes belong here." })
    ] });
  }
  return /* @__PURE__ */ jsx("div", { className: "space-y-2", children: items.map((item) => /* @__PURE__ */ jsxs(
    "div",
    {
      className: "flex items-center gap-4 rounded-xl border border-warm-200 bg-white p-4 transition-all hover:border-warm-300 hover:shadow-sm",
      children: [
        /* @__PURE__ */ jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-lg bg-legacy-100 text-lg text-legacy-600", children: "📄" }),
        /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsx("p", { className: "truncate font-medium text-warm-800", children: item.name }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-warm-400", children: item.date })
        ] }),
        /* @__PURE__ */ jsx("button", { className: "btn-ghost shrink-0 text-sm", type: "button", children: "View" })
      ]
    },
    item.id
  )) });
}
function AudioPlayer({ items }) {
  if (items.length === 0) {
    return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-warm-200 bg-warm-50/50 px-6 py-16 text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-hearth-100 text-3xl text-hearth-600", children: "🎙️" }),
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-warm-800", children: "No recordings yet" }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-warm-500", children: "Voice recordings preserve the sound of a loved one's voice." })
    ] });
  }
  return /* @__PURE__ */ jsx("div", { className: "space-y-3", children: items.map((item) => /* @__PURE__ */ jsxs(
    "div",
    {
      className: "rounded-xl border border-warm-200 bg-white p-4",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-3 flex items-center gap-3", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              className: "flex h-10 w-10 items-center justify-center rounded-full bg-hearth-600 text-white transition-all hover:bg-hearth-700 active:scale-95",
              type: "button",
              children: "▶️"
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsx("p", { className: "truncate font-medium text-warm-800", children: item.name }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-warm-400", children: item.date })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "h-2 overflow-hidden rounded-full bg-warm-100", children: /* @__PURE__ */ jsx(
          "div",
          {
            className: "h-full w-0 rounded-full bg-hearth-400 transition-all",
            style: { width: "0%" }
          }
        ) })
      ]
    },
    item.id
  )) });
}
function SectionHeader({
  title,
  description,
  action
}) {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-end justify-between", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-warm-900", children: title }),
      description && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-warm-500", children: description })
    ] }),
    action && /* @__PURE__ */ jsx("div", { children: action })
  ] });
}
function Dashboard() {
  const {
    data,
    isLoading,
    error,
    refetch
  } = useAsync(() => vault.list(), []);
  const photos = data?.photos ?? [];
  const docs = data?.documents ?? [];
  const recordings = data?.recordings ?? [];
  const storage = data?.storage;
  return /* @__PURE__ */ jsx(DashboardShell, { children: /* @__PURE__ */ jsxs("div", { className: "space-y-10", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-warm-900", children: "Your Vault" }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-warm-500", children: "Your memories, organized and ready to share." }),
      storage && /* @__PURE__ */ jsxs("p", { className: "mt-1 text-xs text-warm-400", children: [
        formatBytes(storage.usedBytes),
        " of ",
        formatBytes(storage.totalBytes),
        " used"
      ] })
    ] }),
    isLoading && /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center py-20", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-3 text-warm-500", children: [
      /* @__PURE__ */ jsx("div", { className: "h-8 w-8 animate-spin rounded-full border-2 border-hearth-400 border-t-transparent" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm", children: "Loading your vault..." })
    ] }) }),
    error && /* @__PURE__ */ jsxs("div", { className: "card border-red-200 bg-red-50 text-center text-red-700", children: [
      /* @__PURE__ */ jsx("p", { children: "Could not load vault. The backend may not be running yet." }),
      /* @__PURE__ */ jsx("button", { className: "btn-ghost mt-2 text-sm text-red-600", onClick: refetch, type: "button", children: "Try again" })
    ] }),
    !isLoading && !error && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs("section", { children: [
        /* @__PURE__ */ jsx(SectionHeader, { action: /* @__PURE__ */ jsx("button", { className: "btn-ghost text-sm", type: "button", children: "View all" }), description: "Your family members can talk to these Digital Twins.", title: "Digital Twins" }),
        /* @__PURE__ */ jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsx(PortraitGrid, {}) })
      ] }),
      /* @__PURE__ */ jsxs("section", { children: [
        /* @__PURE__ */ jsx(SectionHeader, { action: /* @__PURE__ */ jsx("button", { className: "btn-ghost text-sm", type: "button", children: "View all" }), title: "Photos" }),
        /* @__PURE__ */ jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsx(PhotoGrid, { items: photos }) })
      ] }),
      /* @__PURE__ */ jsxs("section", { children: [
        /* @__PURE__ */ jsx(SectionHeader, { action: /* @__PURE__ */ jsx("button", { className: "btn-ghost text-sm", type: "button", children: "View all" }), title: "Letters & Stories" }),
        /* @__PURE__ */ jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsx(DocumentList, { items: docs }) })
      ] }),
      /* @__PURE__ */ jsxs("section", { children: [
        /* @__PURE__ */ jsx(SectionHeader, { action: /* @__PURE__ */ jsx("button", { className: "btn-ghost text-sm", type: "button", children: "View all" }), title: "Voice Recordings" }),
        /* @__PURE__ */ jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsx(AudioPlayer, { items: recordings }) })
      ] })
    ] })
  ] }) });
}
function formatBytes(bytes) {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
}
export {
  Dashboard as component
};
