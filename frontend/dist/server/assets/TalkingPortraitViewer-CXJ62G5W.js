import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useRef } from "react";
function TalkingPortraitViewer({
  name,
  avatarUrl,
  videoUrl,
  relationship,
  isActive = false
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
    setIsPlaying(!isPlaying);
  };
  return /* @__PURE__ */ jsxs("div", { className: "card group relative overflow-hidden text-center", children: [
    /* @__PURE__ */ jsxs("div", { className: "relative mx-auto mb-4 h-48 w-48 overflow-hidden rounded-full ring-4 ring-hearth-200/50 ring-offset-2 ring-offset-warm-50", children: [
      avatarUrl ? /* @__PURE__ */ jsx(
        "img",
        {
          src: avatarUrl,
          alt: name,
          className: "h-full w-full object-cover"
        }
      ) : /* @__PURE__ */ jsx("div", { className: "flex h-full w-full items-center justify-center bg-gradient-to-br from-hearth-200 to-legacy-200", children: /* @__PURE__ */ jsx("span", { className: "text-6xl text-white/80", children: name.charAt(0).toUpperCase() }) }),
      isActive && /* @__PURE__ */ jsxs("div", { className: "absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-green-500 px-2.5 py-1 text-xs font-medium text-white shadow-sm", children: [
        /* @__PURE__ */ jsx("span", { className: "h-2 w-2 animate-pulse rounded-full bg-white" }),
        "Active"
      ] })
    ] }),
    /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-warm-900", children: name }),
    relationship && /* @__PURE__ */ jsx("p", { className: "mt-0.5 text-sm text-warm-500", children: relationship }),
    /* @__PURE__ */ jsx("div", { className: "mt-4 flex items-center justify-center gap-3", children: /* @__PURE__ */ jsx("button", { className: "btn-primary", onClick: togglePlay, type: "button", children: isPlaying ? "⏸ Pause" : "▶ Hear their voice" }) }),
    (isPlaying || videoUrl) && /* @__PURE__ */ jsx("div", { className: "mt-4 overflow-hidden rounded-xl bg-warm-900/5", children: videoUrl ? /* @__PURE__ */ jsx(
      "video",
      {
        className: "w-full rounded-xl",
        controls: true,
        onEnded: () => setIsPlaying(false),
        onPlay: () => setIsPlaying(true),
        onPause: () => setIsPlaying(false),
        ref: videoRef,
        src: videoUrl
      }
    ) : /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-3 px-4 py-8 text-warm-500", children: [
      /* @__PURE__ */ jsx("div", { className: "flex h-12 w-12 items-center justify-center rounded-full bg-hearth-100 text-2xl text-hearth-600", children: "🎬" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-warm-600", children: "Portrait video being generated with SadTalker..." }),
      /* @__PURE__ */ jsx("div", { className: "flex gap-1", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsx(
        "span",
        {
          className: "h-2 w-2 animate-bounce rounded-full bg-hearth-400",
          style: { animationDelay: `${i * 0.15}s` }
        },
        i
      )) })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-t from-white/0 via-white/0 to-white/10 opacity-0 transition-opacity group-hover:opacity-100" })
  ] });
}
function PortraitGrid() {
  const portraits = [
    { name: "Grandma Rose", relationship: "Grandmother", isActive: true },
    { name: "Grandpa Joe", relationship: "Grandfather" }
  ];
  if (portraits.length === 0) {
    return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-warm-200 bg-warm-50/50 px-6 py-16 text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-hearth-100 text-3xl text-hearth-600", children: "🎭" }),
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-warm-800", children: "No Digital Twins yet" }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-warm-500", children: "Upload photos and stories to bring a loved one to life." })
    ] });
  }
  return /* @__PURE__ */ jsx("div", { className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3", children: portraits.map((portrait) => /* @__PURE__ */ jsx(TalkingPortraitViewer, { ...portrait }, portrait.name)) });
}
export {
  PortraitGrid as P
};
