import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "~/components/DashboardShell";
import { PortraitGrid } from "~/components/TalkingPortraitViewer";
import { ConversationalChat } from "~/components/ConversationalChat";
import { twins } from "~/lib/api";
import { useAsync } from "~/lib/use-async";

export const Route = createFileRoute("/dashboard/twins")({ component: Twins });

function Twins() {
  const { data, isLoading, error } = useAsync(() => twins.list(), []);

  const activeTwins = data?.twins ?? [];
  const firstTwin = activeTwins[0];

  return (
    <DashboardShell>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-warm-900">Digital Twins</h1>
          <p className="mt-1 text-warm-500">Your family's interactive legacy — talk to them, hear their stories.</p>
        </div>

        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-hearth-400 border-t-transparent" />
          </div>
        )}

        {error && (
          <div className="card border-red-200 bg-red-50 text-center text-sm text-red-700">
            Could not load twins. The backend may be offline.
          </div>
        )}

        {!isLoading && !error && (
          <>
            <PortraitGrid />

            {firstTwin && (
              <div className="rounded-2xl border border-warm-200 bg-warm-50/50 p-6">
                <h2 className="text-lg font-bold text-warm-900">Chat with {firstTwin.name}</h2>
                <p className="mt-1 text-sm text-warm-500">
                  Powered by Mistral AI — responses are generated from their uploaded memories.
                </p>
                <div className="mt-4">
                  <ConversationalChat twinId={firstTwin.id} twinName={firstTwin.name} twinAvatarUrl={firstTwin.avatarUrl} />
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </DashboardShell>
  );
}