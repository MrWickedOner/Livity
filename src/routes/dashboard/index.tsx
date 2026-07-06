import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "~/components/DashboardShell";
import { PhotoGrid, DocumentList, AudioPlayer, SectionHeader } from "~/components/VaultViews";
import { PortraitGrid } from "~/components/TalkingPortraitViewer";
import type { VaultItem } from "~/components/VaultViews";

// Placeholder data — will be fetched from the backend
const samplePhotos: VaultItem[] = [
  { id: "1", type: "photo", name: "Family reunion 2025", date: "Dec 2025" },
  { id: "2", type: "photo", name: "Grandma's 80th birthday", date: "Mar 2025" },
  { id: "3", type: "photo", name: "Summer vacation", date: "Aug 2024" },
];

const sampleDocs: VaultItem[] = [
  { id: "d1", type: "document", name: "Letter to grandchildren", date: "Jun 2026" },
  { id: "d2", type: "document", name: "Life story — Chapter 1", date: "May 2026" },
];

const sampleAudio: VaultItem[] = [];

export const Route = createFileRoute("/dashboard/")({
  component: Dashboard,
});

function Dashboard() {
  return (
    <DashboardShell>
      <div className="space-y-10">
        {/* Welcome */}
        <div>
          <h1 className="text-2xl font-bold text-warm-900">Your Vault</h1>
          <p className="mt-1 text-warm-500">
            Your memories, organized and ready to share.
          </p>
        </div>

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
            <PhotoGrid items={samplePhotos} />
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
            <DocumentList items={sampleDocs} />
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
            <AudioPlayer items={sampleAudio} />
          </div>
        </section>
      </div>
    </DashboardShell>
  );
}