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
function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const {
    signup
  } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) return;
    setIsSubmitting(true);
    setError(null);
    try {
      await signup(name, email, password);
      navigate({
        to: "/dashboard"
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Signup failed");
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
      /* @__PURE__ */ jsx("h1", { className: "mt-6 text-2xl font-bold text-warm-900", children: "Start your legacy" }),
      /* @__PURE__ */ jsx("p", { className: "mt-2 text-warm-500", children: "Create your free account. No credit card needed." })
    ] }),
    /* @__PURE__ */ jsxs("form", { className: "card space-y-5", onSubmit: handleSubmit, children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-warm-700", htmlFor: "name", children: "Your name" }),
        /* @__PURE__ */ jsx("input", { className: "input-field mt-1.5", id: "name", onChange: (e) => setName(e.target.value), placeholder: "e.g. Alex Rivera", required: true, type: "text", value: name })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-warm-700", htmlFor: "email", children: "Email" }),
        /* @__PURE__ */ jsx("input", { className: "input-field mt-1.5", id: "email", onChange: (e) => setEmail(e.target.value), placeholder: "you@example.com", required: true, type: "email", value: email })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-warm-700", htmlFor: "password", children: "Password" }),
        /* @__PURE__ */ jsx("input", { className: "input-field mt-1.5", id: "password", onChange: (e) => setPassword(e.target.value), placeholder: "At least 8 characters", required: true, type: "password", value: password })
      ] }),
      error && /* @__PURE__ */ jsx("div", { className: "rounded-xl bg-red-50 p-3 text-sm text-red-700", children: error }),
      /* @__PURE__ */ jsx("div", { className: "rounded-xl bg-warm-50 p-3 text-xs text-warm-500", children: "🔒 Your memories are encrypted end-to-end. We never share your data." }),
      /* @__PURE__ */ jsx("button", { className: "btn-primary w-full", disabled: isSubmitting || !name || !email || !password, type: "submit", children: isSubmitting ? "Creating your vault..." : "Create free account" }),
      /* @__PURE__ */ jsxs("p", { className: "text-center text-sm text-warm-500", children: [
        "Already have an account? ",
        /* @__PURE__ */ jsx(Link, { className: "font-medium text-hearth-600 hover:text-hearth-700", to: "/login", children: "Sign in" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("p", { className: "mt-6 text-center text-xs text-warm-400", children: [
      "By signing up, you agree to our ",
      /* @__PURE__ */ jsx("a", { className: "underline hover:text-warm-600", href: "#", children: "Terms of Service" }),
      " and ",
      /* @__PURE__ */ jsx("a", { className: "underline hover:text-warm-600", href: "#", children: "Privacy Policy" }),
      "."
    ] })
  ] }) });
}
export {
  SignUp as component
};
