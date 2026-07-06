import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "~/components/DashboardShell";
import { PortraitGrid } from "~/components/TalkingPortraitViewer";
import { ConversationalChat } from "~/components/ConversationalChat";

export const Route = createFileRoute("/dashboard/twins")({
  component: Twins,
});

function Twins() {
  return (
    <DashboardShell>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-warm-900">Digital Twins</h1>
          <p className="mt-1 text-warm-500">
            Your family's interactive legacy — talk to them, hear their stories.
          </p>
        </div>

        <PortraitGrid />

        <div className="rounded-2xl border border-warm-200 bg-warm-50/50 p-6">
          <h2 className="text-lg font-bold text-warm-900">Try a conversation</h2>
          <p className="mt-1 text-sm text-warm-500">
            This is a preview of how family members will interact with a Digital
            Twin. The full AI integration is being built by our AI engineer.
          </p>
          <div className="mt-4">
            <ConversationalChat twinName="Grandma Rose" />
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}