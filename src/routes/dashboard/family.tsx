import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "~/components/DashboardShell";

export const Route = createFileRoute("/dashboard/family")({
  component: Family,
});

const familyMembers = [
  { name: "You", email: "you@example.com", role: "Owner", status: "active", initial: "Y" },
  { name: "Alex Rivera", email: "alex@example.com", role: "Contributor", status: "active", initial: "A" },
  { name: "Maria Rivera", email: "maria@example.com", role: "Viewer", status: "pending", initial: "M" },
];

function Family() {
  return (
    <DashboardShell>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-warm-900">Family</h1>
            <p className="mt-1 text-warm-500">
              Manage who has access to your vault.
            </p>
          </div>
          <button className="btn-primary text-sm" type="button">
            + Invite member
          </button>
        </div>

        <div className="card divide-y divide-warm-100">
          {familyMembers.map((member) => (
            <div key={member.email} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-hearth-200 to-legacy-200 text-sm font-bold text-white">
                {member.initial}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-warm-900">{member.name}</p>
                <p className="text-sm text-warm-400">{member.email}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`badge ${
                  member.role === "Owner"
                    ? "bg-hearth-100 text-hearth-700"
                    : member.role === "Contributor"
                      ? "bg-legacy-100 text-legacy-700"
                      : "bg-warm-100 text-warm-600"
                }`}>
                  {member.role}
                </span>
                <span className={`flex items-center gap-1 text-xs ${
                  member.status === "active" ? "text-green-600" : "text-warm-400"
                }`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${
                    member.status === "active" ? "bg-green-500" : "bg-warm-300"
                  }`} />
                  {member.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Permissions info */}
        <div className="rounded-2xl bg-warm-50 p-6">
          <h3 className="font-semibold text-warm-800">About permissions</h3>
          <div className="mt-3 space-y-2 text-sm text-warm-600">
            <p>
              <strong className="text-warm-800">Viewers</strong> can see all
              memories and chat with Digital Twins. They cannot upload new content.
            </p>
            <p>
              <strong className="text-warm-800">Contributors</strong> can upload
              photos, stories, and recordings to help enrich the Digital Twin.
            </p>
            <p>
              Descendants always get <strong className="text-warm-800">free read-only access</strong>{" "}
              — the subscriber pays for the vault.
            </p>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}