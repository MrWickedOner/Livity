import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "~/components/DashboardShell";

export const Route = createFileRoute("/dashboard/settings")({
  component: Settings,
});

function Settings() {
  return (
    <DashboardShell>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-warm-900">Settings</h1>
          <p className="mt-1 text-warm-500">
            Manage your account and subscription.
          </p>
        </div>

        <div className="card space-y-6">
          <div>
            <h2 className="font-semibold text-warm-900">Profile</h2>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-warm-700" htmlFor="s-name">
                  Name
                </label>
                <input className="input-field mt-1" defaultValue="You" id="s-name" type="text" />
              </div>
              <div>
                <label className="block text-sm font-medium text-warm-700" htmlFor="s-email">
                  Email
                </label>
                <input className="input-field mt-1" defaultValue="you@example.com" id="s-email" type="email" />
              </div>
            </div>
          </div>

          <hr className="border-warm-200" />

          <div>
            <h2 className="font-semibold text-warm-900">Subscription</h2>
            <div className="mt-3 rounded-xl bg-hearth-50 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-warm-900">Twin Plan</p>
                  <p className="text-sm text-warm-500">$19/month — 50 GB storage</p>
                </div>
                <span className="badge bg-hearth-200 text-hearth-800">Active</span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-hearth-200">
                <div className="h-full w-[0.3%] rounded-full bg-hearth-500" />
              </div>
              <p className="mt-1 text-xs text-warm-500">156 MB of 50 GB used</p>
              <div className="mt-4 flex gap-3">
                <button className="btn-secondary text-sm" type="button">Change plan</button>
                <button className="btn-ghost text-sm text-red-600 hover:bg-red-50" type="button">Cancel</button>
              </div>
            </div>
          </div>

          <hr className="border-warm-200" />

          <div>
            <h2 className="font-semibold text-warm-900">Security</h2>
            <div className="mt-3 space-y-3 text-sm text-warm-600">
              <div className="flex items-center justify-between rounded-xl bg-warm-50 p-3">
                <div>
                  <p className="font-medium text-warm-800">Zero-knowledge encryption</p>
                  <p className="text-warm-500">Your data is encrypted with AES-256. Not even Livity can read it.</p>
                </div>
                <span className="text-green-600">✓ Active</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-warm-50 p-3">
                <div>
                  <p className="font-medium text-warm-800">Two-factor authentication</p>
                  <p className="text-warm-500">Add an extra layer of security to your account.</p>
                </div>
                <button className="btn-ghost text-sm" type="button">Enable</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}