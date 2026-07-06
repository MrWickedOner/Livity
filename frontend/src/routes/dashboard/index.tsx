import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "~/components/DashboardShell";
import { PhotoGrid, DocumentList, AudioPlayer, SectionHeader } from "~/components/VaultViews";
import { PortraitGrid } from "~/components/TalkingPortraitViewer";
import { vault } from "~/lib/api";
import { useAsync } from "~/lib/use-async";
import type { VaultPhoto, VaultDocument, VaultRecording } from "~/lib/types";

export const Route = createFileRoute("/dashboard/")({
  component: Dashboard,
});

function Dashboard() {
  const { data, isLoading, error, refetch } = useAsync(() => vault.list(), []);

  const photos: VaultPhoto[] = data?.photos ?? [];
  const docs: VaultDocument[] = data?.documents ?? [];
  const recordings: VaultRecording[] = data?.recordings ?? [];
  const storage = data?.storage;

  return (
    <DashboardShell>
      <div className="space-y-10">
        {/* Welcome */}
        <div>
          <h1 className="text-2xl font-bold text-warm-900">Your Vault</h1>
          <p className="mt-1 text-warm-500">
            Your memories, organized and ready to share.
          </p>
          {storage && (
            <p className="mt-1 text-xs text-warm-400">
              {formatBytes(storage.usedBytes)} of {formatBytes(storage.totalBytes)} used
            </p>
          )}
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center gap-3 text-warm-500">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-hearth-400 border-t-transparent" />
              <p className="text-sm">Loading your vault...</p>
            </div>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="card border-red-200 bg-red-50 text-center text-red-700">
            <p>Could not load vault. The backend may not be running yet.</p>
            <button className="btn-ghost mt-2 text-sm text-red-600" onClick={refetch} type="button">
              Try again
            </button>
          </div>
        )}

        {/* Data loaded */}
        {!isLoading && !error && (
          <>
            {/* Digital Twins section */}
            <section>
              <SectionHeader
                action={
                  <button className="btn-ghost text-sm" type="button">
                    View all
                  </button>
                }
                description="Your family members can talk to these Digital Twins."
                title="Digital Twins"
              />
              <div className="mt-4">
                <PortraitGrid />
              </div>
            </section>

            {/* Photos */}
            <section>
              <SectionHeader
                action={
                  <button className="btn-ghost text-sm" type="button">
                    View all
                  </button>
                }
                title="Photos"
              />
              <div className="mt-4">
                <PhotoGrid items={photos} />
              </div>
            </section>

            {/* Documents */}
            <section>
              <SectionHeader
                action={
                  <button className="btn-ghost text-sm" type="button">
                    View all
                  </button>
                }
                title="Letters & Stories"
              />
              <div className="mt-4">
                <DocumentList items={docs} />
              </div>
            </section>

            {/* Audio */}
            <section>
              <SectionHeader
                action={
                  <button className="btn-ghost text-sm" type="button">
                    View all
                  </button>
                }
                title="Voice Recordings"
              />
              <div className="mt-4">
                <AudioPlayer items={recordings} />
              </div>
            </section>
          </>
        )}
      </div>
    </DashboardShell>
  );
}

function formatBytes(bytes: number): string {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
}