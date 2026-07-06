import { createFileRoute, Link } from "@tanstack/react-router";
import { ConversationalChat } from "~/components/ConversationalChat";

export const Route = createFileRoute("/demo")({
  component: Demo,
});

function Demo() {
  return (
    <div className="min-h-dvh bg-warm-50">
      <nav className="border-b border-warm-200 bg-white/80 backdrop-blur-lg">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link className="flex items-center gap-2 text-xl font-bold text-warm-900" to="/">
            <span>✨</span>
            Livity
          </Link>
          <div className="flex items-center gap-4">
            <Link className="btn-ghost text-sm" to="/login">
              Sign in
            </Link>
            <Link className="btn-primary text-sm" to="/signup">
              Get started
            </Link>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-warm-900 sm:text-4xl">
            See Livity in action
          </h1>
          <p className="mt-3 text-lg text-warm-500">
            Watch how a Digital Twin comes to life from your memories.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {/* Video placeholder */}
          <div className="card flex aspect-video items-center justify-center bg-gradient-to-br from-hearth-100 to-legacy-100">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white/80 text-4xl shadow-lg">
                ▶️
              </div>
              <p className="font-medium text-warm-700">Demo video coming soon</p>
              <p className="mt-1 text-sm text-warm-500">
                See how a Digital Twin looks and sounds
              </p>
            </div>
          </div>

          {/* Chat preview */}
          <div>
            <ConversationalChat twinName="Grandma Rose" />
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link className="btn-primary text-base !px-8 !py-4" to="/signup">
            Start creating your own legacy
          </Link>
        </div>
      </div>
    </div>
  );
}