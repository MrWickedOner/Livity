import { type ReactNode, useState } from "react";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { UploadModal } from "./UploadModal";
import { InviteFamilyMember } from "./InviteFamilyMember";
import { useAuth } from "~/lib/auth-context";

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
  const [refreshKey, setRefreshKey] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const isActive = (path: string) => location.pathname === path;

  const handleUploadComplete = () => {
    setRefreshKey((k) => k + 1);
  };

  const handleLogout = () => {
    logout();
    navigate({ to: "/" });
  };

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
            <button className="btn-secondary !px-4 !py-2 text-sm" onClick={() => setShowInvite(true)} type="button">
              👥 Invite
            </button>
            <button className="btn-primary !px-4 !py-2 text-sm" onClick={() => setShowUpload(true)} type="button">
              + Upload
            </button>
            <div className="relative group">
              <button className="flex h-8 w-8 items-center justify-center rounded-full bg-hearth-100 text-sm font-bold text-hearth-700">
                {user?.name?.charAt(0)?.toUpperCase() ?? "?"}
              </button>
              <div className="absolute right-0 top-full z-50 mt-1 hidden min-w-[140px] rounded-xl border border-warm-200 bg-white py-1 shadow-lg group-hover:block">
                <Link className="block px-4 py-2 text-sm text-warm-700 hover:bg-warm-50" to="/dashboard/settings">
                  Settings
                </Link>
                <button className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50" onClick={handleLogout} type="button">
                  Sign out
                </button>
              </div>
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
                className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${isActive(item.path) ? "bg-hearth-50 text-hearth-700" : "text-warm-600 hover:bg-warm-50 hover:text-warm-800"}`}
                to={item.path}
              >
                <span>{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </nav>

          <hr className="my-6 border-warm-200" />

          <div className="px-4 text-xs text-warm-400">
            <p className="font-medium text-warm-600">{user?.name ?? "User"}</p>
            <p className="truncate">{user?.email ?? ""}</p>
          </div>
        </aside>

        {/* Mobile nav */}
        <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-warm-200 bg-white/90 backdrop-blur-lg md:hidden">
          <div className="flex items-center justify-around py-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                className={`flex flex-col items-center gap-0.5 px-3 py-1 text-xs font-medium ${isActive(item.path) ? "text-hearth-600" : "text-warm-400"}`}
                to={item.path}
              >
                <span className="text-lg">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>
        </nav>

        {/* Content */}
        <main key={refreshKey} className="min-h-[calc(100dvh-4rem)] flex-1 overflow-y-auto py-6 pb-20 md:pb-6">
          {children}
        </main>
      </div>

      {/* Modals */}
      <UploadModal isOpen={showUpload} onClose={() => setShowUpload(false)} onUploadComplete={handleUploadComplete} />
      <InviteFamilyMember isOpen={showInvite} onClose={() => setShowInvite(false)} vaultOwnerName={user?.name ?? "Your"} />
    </div>
  );
}