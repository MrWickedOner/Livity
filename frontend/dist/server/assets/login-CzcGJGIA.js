import { jsx, jsxs } from "react/jsx-runtime";
import { useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { u as useAuth } from "./router-CsWl_KXd.js";
import "../server.js";
import "node:async_hooks";
import "h3-v2";
import "@tanstack/router-core";
import "seroval";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/router-core/ssr/server";
import "@tanstack/react-router/ssr/server";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const {
    login
  } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;
    setIsSubmitting(true);
    setError(null);
    try {
      await login(email, password);
      navigate({
        to: "/dashboard"
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setIsSubmitting(false);
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-dvh flex-col items-center justify-center px-6 py-12", children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-md", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-8 text-center", children: [
      /* @__PURE__ */ jsxs(Link, { className: "inline-flex items-center gap-2 text-xl font-bold text-warm-900", to: "/", children: [
        /* @__PURE__ */ jsx("span", { children: "✨" }),
        "Livity"
      ] }),
      /* @__PURE__ */ jsx("h1", { className: "mt-6 text-2xl font-bold text-warm-900", children: "Welcome back" }),
      /* @__PURE__ */ jsx("p", { className: "mt-2 text-warm-500", children: "Sign in to access your vault." })
    ] }),
    /* @__PURE__ */ jsxs("form", { className: "card space-y-5", onSubmit: handleSubmit, children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-warm-700", htmlFor: "email", children: "Email" }),
        /* @__PURE__ */ jsx("input", { className: "input-field mt-1.5", id: "email", onChange: (e) => setEmail(e.target.value), placeholder: "you@example.com", required: true, type: "email", value: email })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-warm-700", htmlFor: "password", children: "Password" }),
        /* @__PURE__ */ jsx("input", { className: "input-field mt-1.5", id: "password", onChange: (e) => setPassword(e.target.value), placeholder: "Enter your password", required: true, type: "password", value: password })
      ] }),
      error && /* @__PURE__ */ jsx("div", { className: "rounded-xl bg-red-50 p-3 text-sm text-red-700", children: error }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-sm", children: [
        /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2 text-warm-600", children: [
          /* @__PURE__ */ jsx("input", { className: "rounded border-warm-300", type: "checkbox" }),
          " Remember me"
        ] }),
        /* @__PURE__ */ jsx("a", { className: "font-medium text-hearth-600 hover:text-hearth-700", href: "#", children: "Forgot password?" })
      ] }),
      /* @__PURE__ */ jsx("button", { className: "btn-primary w-full", disabled: isSubmitting || !email || !password, type: "submit", children: isSubmitting ? "Signing in..." : "Sign in" }),
      /* @__PURE__ */ jsxs("p", { className: "text-center text-sm text-warm-500", children: [
        "Don't have an account? ",
        /* @__PURE__ */ jsx(Link, { className: "font-medium text-hearth-600 hover:text-hearth-700", to: "/signup", children: "Create one" })
      ] })
    ] })
  ] }) });
}
export {
  Login as component
};
