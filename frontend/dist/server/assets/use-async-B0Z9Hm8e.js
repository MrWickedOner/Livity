import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useState, useRef, useCallback, useEffect } from "react";
import { useLocation, useNavigate, Link } from "@tanstack/react-router";
import { v as vault, f as family, u as useAuth } from "./router-CsWl_KXd.js";
const uploadTypes = [
  { type: "photo", label: "Photos", icon: "🖼️", accept: "image/*", desc: "JPG, PNG, HEIC" },
  { type: "document", label: "Letters & Stories", icon: "📝", accept: ".pdf,.docx,.txt,.md", desc: "PDF, DOCX, TXT" },
  { type: "audio", label: "Voice Recordings", icon: "🎙️", accept: "audio/*", desc: "MP3, WAV, M4A" },
  { type: "story", label: "Life Stories", icon: "📖", accept: ".txt,.md", desc: "Written memories" }
];
function UploadModal({ isOpen, onClose, onUploadComplete }) {
  const [selectedType, setSelectedType] = useState("photo");
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef(null);
  if (!isOpen) return null;
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = () => setIsDragging(false);
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      setFiles((prev) => [...prev, ...Array.from(e.dataTransfer.files)]);
    }
  };
  const handleFileSelect = (e) => {
    if (e.target.files) {
      setFiles((prev) => [...prev, ...Array.from(e.target.files)]);
    }
  };
  const removeFile = (index) => setFiles((prev) => prev.filter((_, i) => i !== index));
  const handleUpload = async () => {
    if (files.length === 0) return;
    setUploadError(null);
    setIsUploading(true);
    try {
      await vault.upload(files, selectedType);
      setSuccess(true);
      setTimeout(() => {
        setFiles([]);
        setSuccess(false);
        onClose();
        onUploadComplete?.();
      }, 1500);
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setIsUploading(false);
    }
  };
  const currentType = uploadTypes.find((t) => t.type === selectedType);
  const handleClose = () => {
    setFiles([]);
    setUploadError(null);
    setSuccess(false);
    onClose();
  };
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm", children: /* @__PURE__ */ jsxs("div", { className: "mx-4 w-full max-w-2xl rounded-2xl bg-white shadow-2xl", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between border-b border-warm-200 px-6 py-4", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-bold text-warm-900", children: "Add to Vault" }),
      /* @__PURE__ */ jsx("button", { className: "flex h-8 w-8 items-center justify-center rounded-full text-warm-400 hover:bg-warm-100 hover:text-warm-600", onClick: handleClose, type: "button", children: "✕" })
    ] }),
    success ? /* @__PURE__ */ jsxs("div", { className: "px-6 py-12 text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "mb-4 text-5xl", children: "✅" }),
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-warm-900", children: "Upload complete!" }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-warm-500", children: "Your memories are securely stored." })
    ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("div", { className: "flex gap-1 border-b border-warm-100 px-6 pt-4", children: uploadTypes.map(({ type, label, icon }) => /* @__PURE__ */ jsxs(
        "button",
        {
          className: `flex items-center gap-1.5 rounded-t-xl px-4 py-2 text-sm font-medium transition-all ${selectedType === type ? "bg-hearth-50 text-hearth-700" : "text-warm-500 hover:bg-warm-50 hover:text-warm-700"}`,
          onClick: () => setSelectedType(type),
          type: "button",
          children: [
            /* @__PURE__ */ jsx("span", { children: icon }),
            label
          ]
        },
        type
      )) }),
      /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: `relative rounded-xl border-2 border-dashed p-8 text-center transition-all ${isDragging ? "border-hearth-400 bg-hearth-50" : "border-warm-200 bg-warm-50/50"}`,
            onDragLeave: handleDragLeave,
            onDragOver: handleDragOver,
            onDrop: handleDrop,
            children: [
              /* @__PURE__ */ jsx("input", { accept: currentType.accept, className: "hidden", multiple: true, onChange: handleFileSelect, ref: fileInputRef, type: "file" }),
              files.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
                /* @__PURE__ */ jsx("div", { className: "text-5xl", children: currentType.icon }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsxs("p", { className: "font-medium text-warm-800", children: [
                    "Drop your ",
                    currentType.label.toLowerCase(),
                    " here"
                  ] }),
                  /* @__PURE__ */ jsxs("p", { className: "mt-1 text-sm text-warm-400", children: [
                    "or ",
                    /* @__PURE__ */ jsx("button", { className: "font-medium text-hearth-600 underline hover:text-hearth-700", onClick: () => fileInputRef.current?.click(), type: "button", children: "browse files" })
                  ] })
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-warm-400", children: currentType.desc })
              ] }) : /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
                /* @__PURE__ */ jsx("div", { className: "text-3xl", children: "📎" }),
                /* @__PURE__ */ jsxs("p", { className: "font-medium text-warm-800", children: [
                  files.length,
                  " file",
                  files.length > 1 ? "s" : "",
                  " selected"
                ] }),
                /* @__PURE__ */ jsx("div", { className: "mx-auto max-h-32 space-y-1 overflow-y-auto", children: files.map((file, i) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between rounded-lg bg-white px-3 py-2 text-sm shadow-sm", children: [
                  /* @__PURE__ */ jsx("span", { className: "truncate text-warm-700", children: file.name }),
                  /* @__PURE__ */ jsx("button", { className: "ml-2 shrink-0 text-warm-400 hover:text-red-500", onClick: () => removeFile(i), type: "button", children: "✕" })
                ] }, i)) }),
                /* @__PURE__ */ jsx("button", { className: "text-sm font-medium text-hearth-600 underline hover:text-hearth-700", onClick: () => fileInputRef.current?.click(), type: "button", children: "Add more files" })
              ] })
            ]
          }
        ),
        uploadError && /* @__PURE__ */ jsx("div", { className: "mt-3 rounded-xl bg-red-50 p-3 text-sm text-red-700", children: uploadError })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 border-t border-warm-100 px-6 py-3", children: [
        /* @__PURE__ */ jsx("span", { className: "text-sm text-warm-400", children: "🔒" }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-warm-400", children: "Your memories are encrypted end-to-end. Not even Livity can read them." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-3 border-t border-warm-200 px-6 py-4", children: [
        /* @__PURE__ */ jsx("button", { className: "btn-secondary", onClick: handleClose, type: "button", children: "Cancel" }),
        /* @__PURE__ */ jsx("button", { className: "btn-primary", disabled: files.length === 0 || isUploading, onClick: handleUpload, type: "button", children: isUploading ? "Uploading..." : `Upload ${files.length > 0 ? `(${files.length})` : ""}` })
      ] })
    ] })
  ] }) });
}
function InviteFamilyMember({ isOpen, onClose, vaultOwnerName }) {
  const [invitees, setInvitees] = useState([{ email: "", role: "viewer" }]);
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);
  if (!isOpen) return null;
  const addInvitee = () => setInvitees((prev) => [...prev, { email: "", role: "viewer" }]);
  const updateInvitee = (index, field, value) => {
    setInvitees(
      (prev) => prev.map(
        (invitee, i) => i === index ? { ...invitee, [field]: field === "role" ? value : value } : invitee
      )
    );
  };
  const removeInvitee = (index) => setInvitees((prev) => prev.filter((_, i) => i !== index));
  const handleSend = async () => {
    const valid = invitees.filter((i) => i.email.trim() && i.email.includes("@"));
    if (valid.length === 0) return;
    setIsSending(true);
    setError(null);
    try {
      await family.invite({ invitees: valid });
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send invites");
    } finally {
      setIsSending(false);
    }
  };
  const handleClose = () => {
    setSent(false);
    setError(null);
    setInvitees([{ email: "", role: "viewer" }]);
    onClose();
  };
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm", children: /* @__PURE__ */ jsxs("div", { className: "mx-4 w-full max-w-lg rounded-2xl bg-white shadow-2xl", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between border-b border-warm-200 px-6 py-4", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-bold text-warm-900", children: "Invite Family" }),
      /* @__PURE__ */ jsx("button", { className: "flex h-8 w-8 items-center justify-center rounded-full text-warm-400 hover:bg-warm-100 hover:text-warm-600", onClick: handleClose, type: "button", children: "✕" })
    ] }),
    sent ? /* @__PURE__ */ jsxs("div", { className: "px-6 py-12 text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "mb-4 text-5xl", children: "🎉" }),
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-warm-900", children: "Invitations sent!" }),
      /* @__PURE__ */ jsxs("p", { className: "mt-2 text-sm text-warm-500", children: [
        "Your family members will receive an email with instructions to access ",
        vaultOwnerName,
        "'s vault."
      ] }),
      /* @__PURE__ */ jsx("button", { className: "btn-primary mt-6", onClick: handleClose, type: "button", children: "Done" })
    ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("div", { className: "px-6 py-4", children: /* @__PURE__ */ jsxs("p", { className: "text-sm text-warm-600", children: [
        "Invite family members to view ",
        /* @__PURE__ */ jsxs("span", { className: "font-semibold text-warm-900", children: [
          vaultOwnerName,
          "'s"
        ] }),
        " Digital Twin. Contributors can also upload memories."
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-3 px-6 pb-4", children: [
        invitees.map((invitee, i) => /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsx("input", { className: "input-field", onChange: (e) => updateInvitee(i, "email", e.target.value), placeholder: "family@example.com", type: "email", value: invitee.email }) }),
          /* @__PURE__ */ jsxs("select", { className: "input-field w-32 shrink-0", onChange: (e) => updateInvitee(i, "role", e.target.value), value: invitee.role, children: [
            /* @__PURE__ */ jsx("option", { value: "viewer", children: "Viewer" }),
            /* @__PURE__ */ jsx("option", { value: "contributor", children: "Contributor" })
          ] }),
          invitees.length > 1 && /* @__PURE__ */ jsx("button", { className: "mt-2 shrink-0 text-warm-400 hover:text-red-500", onClick: () => removeInvitee(i), type: "button", children: "✕" })
        ] }, i)),
        /* @__PURE__ */ jsx("button", { className: "text-sm font-medium text-hearth-600 hover:text-hearth-700", onClick: addInvitee, type: "button", children: "+ Add another" })
      ] }),
      error && /* @__PURE__ */ jsx("div", { className: "mx-6 mb-4 rounded-xl bg-red-50 p-3 text-sm text-red-700", children: error }),
      /* @__PURE__ */ jsxs("div", { className: "mx-6 mb-4 space-y-2 rounded-xl bg-warm-50 p-4 text-sm", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2", children: [
          /* @__PURE__ */ jsx("span", { className: "mt-0.5 text-warm-400", children: "👁️" }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("span", { className: "font-medium text-warm-700", children: "Viewer" }),
            /* @__PURE__ */ jsx("span", { className: "text-warm-500", children: " — can see all memories and chat with the Digital Twin" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2", children: [
          /* @__PURE__ */ jsx("span", { className: "mt-0.5 text-warm-400", children: "✏️" }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("span", { className: "font-medium text-warm-700", children: "Contributor" }),
            /* @__PURE__ */ jsx("span", { className: "text-warm-500", children: " — can also upload new photos, stories, and recordings" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-3 border-t border-warm-200 px-6 py-4", children: [
        /* @__PURE__ */ jsx("button", { className: "btn-secondary", onClick: handleClose, type: "button", children: "Cancel" }),
        /* @__PURE__ */ jsx("button", { className: "btn-primary", disabled: isSending || invitees.filter((i) => i.email.trim() && i.email.includes("@")).length === 0, onClick: handleSend, type: "button", children: isSending ? "Sending..." : "Send Invites" })
      ] })
    ] })
  ] }) });
}
const navItems = [
  { path: "/dashboard", label: "Vault", icon: "🏛️" },
  { path: "/dashboard/twins", label: "Digital Twins", icon: "🎭" },
  { path: "/dashboard/family", label: "Family", icon: "👨‍👩‍👧‍👦" },
  { path: "/dashboard/settings", label: "Settings", icon: "⚙️" }
];
function DashboardShell({ children }) {
  const [showUpload, setShowUpload] = useState(false);
  const [showInvite, setShowInvite] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const isActive = (path) => location.pathname === path;
  const handleUploadComplete = () => {
    setRefreshKey((k) => k + 1);
  };
  const handleLogout = () => {
    logout();
    navigate({ to: "/" });
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex min-h-dvh flex-col", children: [
    /* @__PURE__ */ jsx("header", { className: "sticky top-0 z-40 border-b border-warm-200 bg-white/80 backdrop-blur-lg", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6", children: [
      /* @__PURE__ */ jsxs(Link, { className: "flex items-center gap-2", to: "/dashboard", children: [
        /* @__PURE__ */ jsx("span", { className: "text-xl", children: "✨" }),
        /* @__PURE__ */ jsx("span", { className: "text-lg font-bold text-warm-900", children: "Livity" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx("button", { className: "btn-secondary !px-4 !py-2 text-sm", onClick: () => setShowInvite(true), type: "button", children: "👥 Invite" }),
        /* @__PURE__ */ jsx("button", { className: "btn-primary !px-4 !py-2 text-sm", onClick: () => setShowUpload(true), type: "button", children: "+ Upload" }),
        /* @__PURE__ */ jsxs("div", { className: "relative group", children: [
          /* @__PURE__ */ jsx("button", { className: "flex h-8 w-8 items-center justify-center rounded-full bg-hearth-100 text-sm font-bold text-hearth-700", children: user?.name?.charAt(0)?.toUpperCase() ?? "?" }),
          /* @__PURE__ */ jsxs("div", { className: "absolute right-0 top-full z-50 mt-1 hidden min-w-[140px] rounded-xl border border-warm-200 bg-white py-1 shadow-lg group-hover:block", children: [
            /* @__PURE__ */ jsx(Link, { className: "block px-4 py-2 text-sm text-warm-700 hover:bg-warm-50", to: "/dashboard/settings", children: "Settings" }),
            /* @__PURE__ */ jsx("button", { className: "w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50", onClick: handleLogout, type: "button", children: "Sign out" })
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "mx-auto flex w-full max-w-7xl flex-1 gap-0 px-4 sm:px-6", children: [
      /* @__PURE__ */ jsxs("aside", { className: "hidden w-56 shrink-0 border-r border-warm-100 py-6 md:block", children: [
        /* @__PURE__ */ jsx("nav", { className: "space-y-1", children: navItems.map((item) => /* @__PURE__ */ jsxs(
          Link,
          {
            className: `flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${isActive(item.path) ? "bg-hearth-50 text-hearth-700" : "text-warm-600 hover:bg-warm-50 hover:text-warm-800"}`,
            to: item.path,
            children: [
              /* @__PURE__ */ jsx("span", { children: item.icon }),
              item.label
            ]
          },
          item.path
        )) }),
        /* @__PURE__ */ jsx("hr", { className: "my-6 border-warm-200" }),
        /* @__PURE__ */ jsxs("div", { className: "px-4 text-xs text-warm-400", children: [
          /* @__PURE__ */ jsx("p", { className: "font-medium text-warm-600", children: user?.name ?? "User" }),
          /* @__PURE__ */ jsx("p", { className: "truncate", children: user?.email ?? "" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("nav", { className: "fixed inset-x-0 bottom-0 z-40 border-t border-warm-200 bg-white/90 backdrop-blur-lg md:hidden", children: /* @__PURE__ */ jsx("div", { className: "flex items-center justify-around py-2", children: navItems.map((item) => /* @__PURE__ */ jsxs(
        Link,
        {
          className: `flex flex-col items-center gap-0.5 px-3 py-1 text-xs font-medium ${isActive(item.path) ? "text-hearth-600" : "text-warm-400"}`,
          to: item.path,
          children: [
            /* @__PURE__ */ jsx("span", { className: "text-lg", children: item.icon }),
            item.label
          ]
        },
        item.path
      )) }) }),
      /* @__PURE__ */ jsx("main", { className: "min-h-[calc(100dvh-4rem)] flex-1 overflow-y-auto py-6 pb-20 md:pb-6", children }, refreshKey)
    ] }),
    /* @__PURE__ */ jsx(UploadModal, { isOpen: showUpload, onClose: () => setShowUpload(false), onUploadComplete: handleUploadComplete }),
    /* @__PURE__ */ jsx(InviteFamilyMember, { isOpen: showInvite, onClose: () => setShowInvite(false), vaultOwnerName: user?.name ?? "Your" })
  ] });
}
function useAsync(fn, deps = []) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const execute = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await fn();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  }, deps);
  useEffect(() => {
    execute();
  }, [execute]);
  return { data, isLoading, error, refetch: execute };
}
export {
  DashboardShell as D,
  useAsync as u
};
