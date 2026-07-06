import { type ReactNode } from "react";

export interface VaultItem {
  id: string;
  type: "photo" | "document" | "audio" | "portrait";
  name: string;
  thumbnail?: string;
  date: string;
}

export function PhotoGrid({ items }: { items: VaultItem[] }) {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-warm-200 bg-warm-50/50 px-6 py-16 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-hearth-100 text-3xl text-hearth-600">
          🖼️
        </div>
        <h3 className="text-lg font-semibold text-warm-800">No photos yet</h3>
        <p className="mt-1 text-sm text-warm-500">
          Upload photos to start building a visual legacy.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {items.map((item) => (
        <div
          key={item.id}
          className="group relative aspect-square overflow-hidden rounded-xl bg-warm-100"
        >
          {item.thumbnail ? (
            <img
              src={item.thumbnail}
              alt={item.name}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-4xl text-warm-300">
              📷
            </div>
          )}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100">
            <p className="truncate text-sm font-medium text-white">
              {item.name}
            </p>
            <p className="text-xs text-white/70">{item.date}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function DocumentList({ items }: { items: VaultItem[] }) {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-warm-200 bg-warm-50/50 px-6 py-16 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-legacy-100 text-3xl text-legacy-600">
          📄
        </div>
        <h3 className="text-lg font-semibold text-warm-800">No documents yet</h3>
        <p className="mt-1 text-sm text-warm-500">
          Letters, stories, and handwritten notes belong here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex items-center gap-4 rounded-xl border border-warm-200 bg-white p-4 transition-all hover:border-warm-300 hover:shadow-sm"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-legacy-100 text-lg text-legacy-600">
            📄
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate font-medium text-warm-800">{item.name}</p>
            <p className="text-xs text-warm-400">{item.date}</p>
          </div>
          <button className="btn-ghost shrink-0 text-sm" type="button">
            View
          </button>
        </div>
      ))}
    </div>
  );
}

export function AudioPlayer({ items }: { items: VaultItem[] }) {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-warm-200 bg-warm-50/50 px-6 py-16 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-hearth-100 text-3xl text-hearth-600">
          🎙️
        </div>
        <h3 className="text-lg font-semibold text-warm-800">No recordings yet</h3>
        <p className="mt-1 text-sm text-warm-500">
          Voice recordings preserve the sound of a loved one's voice.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div
          key={item.id}
          className="rounded-xl border border-warm-200 bg-white p-4"
        >
          <div className="mb-3 flex items-center gap-3">
            <button
              className="flex h-10 w-10 items-center justify-center rounded-full bg-hearth-600 text-white transition-all hover:bg-hearth-700 active:scale-95"
              type="button"
            >
              ▶️
            </button>
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium text-warm-800">{item.name}</p>
              <p className="text-xs text-warm-400">{item.date}</p>
            </div>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-warm-100">
            <div
              className="h-full w-0 rounded-full bg-hearth-400 transition-all"
              style={{ width: "0%" }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export function SectionHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex items-end justify-between">
      <div>
        <h2 className="text-xl font-bold text-warm-900">{title}</h2>
        {description && (
          <p className="mt-1 text-sm text-warm-500">{description}</p>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}