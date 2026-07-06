import { type ReactNode, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { UploadModal } from "./UploadModal";
import { InviteFamilyMember } from "./InviteFamilyMember";

interface DashboardLayoutProps {
  children: ReactNode;
}

const navItems = [
  { path: "/dashboard", label: "Vault", icon: "🏛️" },
  { path: "/dashboard/twins", label: "Digital Twins", icon: "🎭" },
  { path: "/dashboard/family", label: "Family", icon: "👨‍👩‍👧‍👦" },
  { path: "/dashboard/settings", label: "Settings", icon: "⚙️" },
];

export function DashboardShell({ children }: DashboardLayoutProps) {
  const [showUpload, setShowUpload] = useState(false);
  const [showInvite, setShowInvite] = useState(false);
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex min-h-dvh flex-col">
      {/* Top nav */}
      <header className="sticky top-0 z-40 border-b border-warm-200 bg-white/80 backdrop-blur-lg">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link className="flex items-center gap-2" to="/dashboard">
            <span className="text-xl">✨</span>
            <span className="text-lg font-bold text-warm-900">Livity</span>
          </Link>

          <div className="flex items-center gap-3">
            <button
              className="btn-secondary !px-4 !py-2 text-sm"
              onClick={() => setShowInvite(true)}
              type="button"
            >
              👥 Invite
            </button>
            <button
              className="btn-primary !px-4 !py-2 text-sm"
              onClick={() => setShowUpload(true)}
              type="button"
            >
              + Upload
            </button>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-hearth-100 text-sm font-bold text-hearth-700">
              Y
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-7xl flex-1 gap-0 px-4 sm:px-6">
        {/* Sidebar */}
        <aside className="hidden w-56 shrink-0 border-r border-warm-100 py-6 md:block">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
                  isActive(item.path)
                    ? "bg-hearth-50 text-hearth-700"
                    : "text-warm-600 hover:bg-warm-50 hover:text-warm-800"
                }`}
                to={item.path}
              >
                <span>{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Storage stats */}
          <div className="mt-8 rounded-xl bg-warm-50 p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-warm-600">Storage</span>
              <span className="font-medium text-warm-800">156 MB / 50 GB</span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-warm-200">
              <div
                className="h-full rounded-full bg-hearth-400"
                style={{ width: "0.3%" }}
              />
            </div>
            <p className="mt-1 text-xs text-warm-400">Twin plan</p>
          </div>
        </aside>

        {/* Mobile nav */}
        <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-warm-200 bg-white/90 backdrop-blur-lg md:hidden">
          <div className="flex items-center justify-around py-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                className={`flex flex-col items-center gap-0.5 px-3 py-1 text-xs font-medium ${
                  isActive(item.path)
                    ? "text-hearth-600"
                    : "text-warm-400"
                }`}
                to={item.path}
              >
                <span className="text-lg">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>
        </nav>

        {/* Content */}
        <main className="min-h-[calc(100dvh-4rem)] flex-1 overflow-y-auto py-6 pb-20 md:pb-6">
          {children}
        </main>
      </div>

      {/* Modals */}
      <UploadModal isOpen={showUpload} onClose={() => setShowUpload(false)} />
      <InviteFamilyMember
        isOpen={showInvite}
        onClose={() => setShowInvite(false)}
        vaultOwnerName="Your"
      />
    </div>
  );
}