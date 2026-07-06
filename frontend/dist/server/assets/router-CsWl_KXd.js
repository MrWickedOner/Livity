import { jsx, jsxs } from "react/jsx-runtime";
import { createRootRoute, Outlet, HeadContent, Scripts, createFileRoute, lazyRouteComponent, createRouter } from "@tanstack/react-router";
import { useState, useEffect, createContext, useContext } from "react";
import { T as TSS_SERVER_FUNCTION, g as getServerFnById, c as createServerFn } from "../server.js";
const appCss = "/assets/app-DSrp1FBU.css";
class ApiRequestError extends Error {
  code;
  status;
  constructor(code, message, status) {
    super(message);
    this.code = code;
    this.status = status;
    this.name = "ApiRequestError";
  }
}
const API_BASE = "";
function getToken() {
  return localStorage.getItem("livity_token");
}
function authHeaders() {
  const token = getToken();
  const headers = {};
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
}
async function request(method, path, body) {
  const url = `${API_BASE}${path}`;
  const isFormData = body instanceof FormData;
  const headers = {
    ...authHeaders()
  };
  if (!isFormData && body !== void 0) {
    headers["Content-Type"] = "application/json";
  }
  const res = await fetch(url, {
    method,
    headers,
    body: isFormData ? body : body ? JSON.stringify(body) : void 0
  });
  if (!res.ok) {
    let code = "INTERNAL_ERROR";
    let message = "Something went wrong";
    try {
      const err = await res.json();
      code = err.error?.code ?? code;
      message = err.error?.message ?? message;
    } catch {
    }
    throw new ApiRequestError(code, message, res.status);
  }
  if (res.status === 204) return void 0;
  return await res.json();
}
const auth = {
  signup(name, email, password) {
    return request("POST", "/api/auth/signup", {
      name,
      email,
      password
    });
  },
  login(email, password) {
    return request("POST", "/api/auth/login", {
      email,
      password
    });
  },
  me() {
    return request("GET", "/api/auth/me");
  },
  saveToken(token) {
    localStorage.setItem("livity_token", token);
  },
  clearToken() {
    localStorage.removeItem("livity_token");
  },
  isAuthenticated() {
    return !!getToken();
  }
};
const vault = {
  list() {
    return request("GET", "/api/vault");
  },
  upload(files, type) {
    const form = new FormData();
    for (const f of files) {
      form.append("files[]", f);
    }
    form.append("type", type);
    return request("POST", "/api/vault/upload", form);
  },
  delete(itemId) {
    return request(
      "DELETE",
      `/api/vault/items/${itemId}`
    );
  }
};
const twins = {
  list() {
    return request("GET", "/api/twins");
  },
  create(data) {
    return request("POST", "/api/twins", data);
  },
  get(twinId) {
    return request("GET", `/api/twins/${twinId}`);
  },
  remove(twinId) {
    return request("DELETE", `/api/twins/${twinId}`);
  }
};
const chat = {
  send(twinId, req) {
    return request(
      "POST",
      `/api/twins/${twinId}/chat`,
      req
    );
  },
  history(twinId, limit = 50, before) {
    const params = new URLSearchParams({ limit: String(limit) });
    if (before) params.set("before", before);
    return request(
      "GET",
      `/api/twins/${twinId}/conversations?${params}`
    );
  }
};
const family = {
  list() {
    return request("GET", "/api/family");
  },
  invite(req) {
    return request("POST", "/api/family/invite", req);
  },
  updateRole(memberId, role) {
    return request(
      "PATCH",
      `/api/family/members/${memberId}/role`,
      { role }
    );
  },
  remove(memberId) {
    return request(
      "DELETE",
      `/api/family/members/${memberId}`
    );
  }
};
const profile = {
  get() {
    return request("GET", "/api/profile");
  },
  update(data) {
    return request(
      "PATCH",
      "/api/profile",
      data
    );
  }
};
const AuthContext = createContext(null);
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (auth.isAuthenticated()) {
      auth.me().then((res) => setUser(res.user)).catch(() => auth.clearToken()).finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);
  const login = async (email, password) => {
    const res = await auth.login(email, password);
    auth.saveToken(res.token);
    setUser(res.user);
  };
  const signup = async (name, email, password) => {
    const res = await auth.signup(name, email, password);
    auth.saveToken(res.token);
    setUser(res.user);
  };
  const logout = () => {
    auth.clearToken();
    setUser(null);
  };
  return /* @__PURE__ */ jsx(
    AuthContext.Provider,
    {
      value: {
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        signup,
        logout
      },
      children
    }
  );
}
function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
const Route$8 = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Livity — Preserve your memories, forever" },
      {
        name: "description",
        content: "Turn your memories into an AI twin your family can talk to, forever. Upload photos, stories, and voice recordings to create a living digital legacy."
      },
      { name: "theme-color", content: "#D97706" },
      { property: "og:title", content: "Livity — Digital Legacy Platform" },
      {
        property: "og:description",
        content: "Turn your memories into an AI twin your family can talk to, forever."
      },
      { property: "og:type", content: "website" }
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com"
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous"
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
      }
    ]
  }),
  notFoundComponent: () => /* @__PURE__ */ jsxs("div", { className: "flex min-h-dvh flex-col items-center justify-center gap-4 px-6 text-center", children: [
    /* @__PURE__ */ jsx("span", { className: "text-6xl", children: "🔮" }),
    /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-warm-900", children: "Page not found" }),
    /* @__PURE__ */ jsx("p", { className: "text-warm-500", children: "The memory you're looking for doesn't exist yet." }),
    /* @__PURE__ */ jsx("a", { className: "btn-primary", href: "/", children: "Go home" })
  ] }),
  component: RootComponent
});
function RootComponent() {
  return /* @__PURE__ */ jsx(RootDocument, { children: /* @__PURE__ */ jsx(AuthProvider, { children: /* @__PURE__ */ jsx(Outlet, {}) }) });
}
function RootDocument({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
const $$splitComponentImporter$7 = () => import("./signup-PQchDPEw.js");
const Route$7 = createFileRoute("/signup")({
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./login-CzcGJGIA.js");
const Route$6 = createFileRoute("/login")({
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./demo-DWr-Ya1w.js");
const Route$5 = createFileRoute("/demo")({
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var createSsrRpc = (functionId) => {
  const url = "/_serverFn/" + functionId;
  const serverFnMeta = { id: functionId };
  const fn = async (...args) => {
    return (await getServerFnById(functionId))(...args);
  };
  return Object.assign(fn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const $$splitComponentImporter$4 = () => import("./index-CCWCTDxw.js");
const getBusinessName = createServerFn({
  method: "GET"
}).handler(createSsrRpc("ed9e0b62e19345253bb81dfb20bac27bb23001205689ad75c3f2879c99c299c4"));
const Route$4 = createFileRoute("/")({
  loader: () => getBusinessName(),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./index-CMP1Ikvr.js");
const Route$3 = createFileRoute("/dashboard/")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./twins-DHLtfbrw.js");
const Route$2 = createFileRoute("/dashboard/twins")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./settings-R3IG301X.js");
const Route$1 = createFileRoute("/dashboard/settings")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./family-Dm0VEn4u.js");
const Route = createFileRoute("/dashboard/family")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const SignupRoute = Route$7.update({
  id: "/signup",
  path: "/signup",
  getParentRoute: () => Route$8
});
const LoginRoute = Route$6.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => Route$8
});
const DemoRoute = Route$5.update({
  id: "/demo",
  path: "/demo",
  getParentRoute: () => Route$8
});
const IndexRoute = Route$4.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$8
});
const DashboardIndexRoute = Route$3.update({
  id: "/dashboard/",
  path: "/dashboard/",
  getParentRoute: () => Route$8
});
const DashboardTwinsRoute = Route$2.update({
  id: "/dashboard/twins",
  path: "/dashboard/twins",
  getParentRoute: () => Route$8
});
const DashboardSettingsRoute = Route$1.update({
  id: "/dashboard/settings",
  path: "/dashboard/settings",
  getParentRoute: () => Route$8
});
const DashboardFamilyRoute = Route.update({
  id: "/dashboard/family",
  path: "/dashboard/family",
  getParentRoute: () => Route$8
});
const rootRouteChildren = {
  IndexRoute,
  DemoRoute,
  LoginRoute,
  SignupRoute,
  DashboardFamilyRoute,
  DashboardSettingsRoute,
  DashboardTwinsRoute,
  DashboardIndexRoute
};
const routeTree = Route$8._addFileChildren(rootRouteChildren)._addFileTypes();
function getRouter() {
  return createRouter({
    routeTree,
    defaultPreload: "intent",
    scrollRestoration: true,
    defaultNotFoundComponent: () => /* @__PURE__ */ jsx("p", { children: "Not found" })
  });
}
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Route$4 as R,
  chat as c,
  family as f,
  profile as p,
  router as r,
  twins as t,
  useAuth as u,
  vault as v
};
