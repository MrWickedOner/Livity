import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { u as useAsync, D as DashboardShell } from "./use-async-B0Z9Hm8e.js";
import { P as PortraitGrid } from "./TalkingPortraitViewer-CXJ62G5W.js";
import { C as ConversationalChat } from "./ConversationalChat-Mgff5Q9z.js";
import { t as twins } from "./router-CsWl_KXd.js";
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
function Twins() {
  const {
    data,
    isLoading,
    error
  } = useAsync(() => twins.list(), []);
  const activeTwins = data?.twins ?? [];
  const firstTwin = activeTwins[0];
  return /* @__PURE__ */ jsx(DashboardShell, { children: /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-warm-900", children: "Digital Twins" }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-warm-500", children: "Your family's interactive legacy — talk to them, hear their stories." })
    ] }),
    isLoading && /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center py-12", children: /* @__PURE__ */ jsx("div", { className: "h-8 w-8 animate-spin rounded-full border-2 border-hearth-400 border-t-transparent" }) }),
    error && /* @__PURE__ */ jsx("div", { className: "card border-red-200 bg-red-50 text-center text-sm text-red-700", children: "Could not load twins. The backend may be offline." }),
    !isLoading && !error && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(PortraitGrid, {}),
      firstTwin && /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-warm-200 bg-warm-50/50 p-6", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-lg font-bold text-warm-900", children: [
          "Chat with ",
          firstTwin.name
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-warm-500", children: "Powered by Mistral AI — responses are generated from their uploaded memories." }),
        /* @__PURE__ */ jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsx(ConversationalChat, { twinId: firstTwin.id, twinName: firstTwin.name, twinAvatarUrl: firstTwin.avatarUrl }) })
      ] })
    ] })
  ] }) });
}
export {
  Twins as component
};
