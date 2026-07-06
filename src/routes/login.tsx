import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/login")({
  component: Login,
});

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setIsSubmitting(true);
    // Simulate login — will connect to backend
    await new Promise((r) => setTimeout(r, 1000));
    setIsSubmitting(false);
    window.location.href = "/dashboard";
  };

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link className="inline-flex items-center gap-2 text-xl font-bold text-warm-900" to="/">
            <span>✨</span>
            Livity
          </Link>
          <h1 className="mt-6 text-2xl font-bold text-warm-900">
            Welcome back
          </h1>
          <p className="mt-2 text-warm-500">
            Sign in to access your vault.
          </p>
        </div>

        <form className="card space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-warm-700" htmlFor="email">
              Email
            </label>
            <input
              className="input-field mt-1.5"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              type="email"
              value={email}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-warm-700" htmlFor="password">
              Password
            </label>
            <input
              className="input-field mt-1.5"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              type="password"
              value={password}
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-warm-600">
              <input className="rounded border-warm-300" type="checkbox" />
              Remember me
            </label>
            <a className="font-medium text-hearth-600 hover:text-hearth-700" href="#">
              Forgot password?
            </a>
          </div>

          <button
            className="btn-primary w-full"
            disabled={isSubmitting || !email || !password}
            type="submit"
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>

          <p className="text-center text-sm text-warm-500">
            Don't have an account?{" "}
            <Link className="font-medium text-hearth-600 hover:text-hearth-700" to="/signup">
              Create one
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}