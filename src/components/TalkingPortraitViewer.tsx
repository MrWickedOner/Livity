import { useState } from "react";

interface TalkingPortraitProps {
  name: string;
  avatarUrl?: string;
  relationship?: string;
  isActive?: boolean;
}

export function TalkingPortraitViewer({
  name,
  avatarUrl,
  relationship,
  isActive = false,
}: TalkingPortraitProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="card group relative overflow-hidden text-center">
      {/* Portrait frame */}
      <div className="relative mx-auto mb-4 h-48 w-48 overflow-hidden rounded-full ring-4 ring-hearth-200/50 ring-offset-2 ring-offset-warm-50">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-hearth-200 to-legacy-200">
            <span className="text-6xl text-white/80">
              {name.charAt(0).toUpperCase()}
            </span>
          </div>
        )}

        {/* Status indicator */}
        {isActive && (
          <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-green-500 px-2.5 py-1 text-xs font-medium text-white shadow-sm">
            <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
            Active
          </div>
        )}
      </div>

      {/* Info */}
      <h3 className="text-xl font-bold text-warm-900">{name}</h3>
      {relationship && (
        <p className="mt-0.5 text-sm text-warm-500">{relationship}</p>
      )}

      {/* Actions */}
      <div className="mt-4 flex items-center justify-center gap-3">
        <button
          className="btn-primary"
          onClick={() => setIsPlaying(!isPlaying)}
          type="button"
        >
          {isPlaying ? "⏸ Pause" : "▶ Talk to me"}
        </button>
      </div>

      {/* Placeholder video frame */}
      {isPlaying && (
        <div className="mt-4 overflow-hidden rounded-xl bg-gradient-to-br from-warm-100 to-hearth-50 p-4">
          <div className="animate-pulse space-y-2">
            <div className="flex items-center gap-2 text-hearth-700">
              <span className="text-lg">✨</span>
              <span className="text-sm font-medium">
                {name} is speaking...
              </span>
            </div>
            <div className="h-3 w-3/4 rounded-full bg-hearth-200" />
            <div className="h-3 w-1/2 rounded-full bg-hearth-200" />
          </div>
        </div>
      )}

      {/* Holographic shine effect */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-t from-white/0 via-white/0 to-white/10 opacity-0 transition-opacity group-hover:opacity-100" />
    </div>
  );
}

export function PortraitGrid() {
  // Placeholder: will be populated from the backend
  const portraits: TalkingPortraitProps[] = [
    { name: "Grandma Rose", relationship: "Grandmother", isActive: true },
    { name: "Grandpa Joe", relationship: "Grandfather" },
  ];

  if (portraits.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-warm-200 bg-warm-50/50 px-6 py-16 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-hearth-100 text-3xl text-hearth-600">
          🎭
        </div>
        <h3 className="text-lg font-semibold text-warm-800">
          No Digital Twins yet
        </h3>
        <p className="mt-1 text-sm text-warm-500">
          Upload photos and stories to bring a loved one to life.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {portraits.map((portrait) => (
        <TalkingPortraitViewer key={portrait.name} {...portrait} />
      ))}
    </div>
  );
}