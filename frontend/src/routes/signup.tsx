import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "~/lib/auth-context";

export const Route = createFileRoute("/signup")({ component: SignUp });

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) return;
    setIsSubmitting(true);
    setError(null);
    try {
      await signup(name, email, password);
      navigate({ to: "/dashboard" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Signup failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link className="inline-flex items-center gap-2 text-xl font-bold text-warm-900" to="/">
            <span>✨</span>Livity
          </Link>
          <h1 className="mt-6 text-2xl font-bold text-warm-900">Start your legacy</h1>
          <p className="mt-2 text-warm-500">Create your free account. No credit card needed.</p>
        </div>

        <form className="card space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-warm-700" htmlFor="name">Your name</label>
            <input className="input-field mt-1.5" id="name" onChange={(e) => setName(e.target.value)} placeholder="e.g. Alex Rivera" required type="text" value={name} />
          </div>
          <div>
            <label className="block text-sm font-medium text-warm-700" htmlFor="email">Email</label>
            <input className="input-field mt-1.5" id="email" onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required type="email" value={email} />
          </div>
          <div>
            <label className="block text-sm font-medium text-warm-700" htmlFor="password">Password</label>
            <input className="input-field mt-1.5" id="password" onChange={(e) => setPassword(e.target.value)} placeholder="At least 8 characters" required type="password" value={password} />
          </div>

          {error && <div className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</div>}

          <div className="rounded-xl bg-warm-50 p-3 text-xs text-warm-500">🔒 Your memories are encrypted end-to-end. We never share your data.</div>

          <button className="btn-primary w-full" disabled={isSubmitting || !name || !email || !password} type="submit">
            {isSubmitting ? "Creating your vault..." : "Create free account"}
          </button>

          <p className="text-center text-sm text-warm-500">
            Already have an account? <Link className="font-medium text-hearth-600 hover:text-hearth-700" to="/login">Sign in</Link>
          </p>
        </form>

        <p className="mt-6 text-center text-xs text-warm-400">
          By signing up, you agree to our <a className="underline hover:text-warm-600" href="#">Terms of Service</a> and <a className="underline hover:text-warm-600" href="#">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
}