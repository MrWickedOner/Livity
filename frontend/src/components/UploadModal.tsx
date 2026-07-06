import { useState, useRef, type DragEvent, type ChangeEvent } from "react";
import { vault } from "~/lib/api";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadComplete?: () => void;
}

type UploadType = "photo" | "document" | "audio" | "story";

const uploadTypes: { type: UploadType; label: string; icon: string; accept: string; desc: string }[] = [
  { type: "photo", label: "Photos", icon: "🖼️", accept: "image/*", desc: "JPG, PNG, HEIC" },
  { type: "document", label: "Letters & Stories", icon: "📝", accept: ".pdf,.docx,.txt,.md", desc: "PDF, DOCX, TXT" },
  { type: "audio", label: "Voice Recordings", icon: "🎙️", accept: "audio/*", desc: "MP3, WAV, M4A" },
  { type: "story", label: "Life Stories", icon: "📖", accept: ".txt,.md", desc: "Written memories" },
];

export function UploadModal({ isOpen, onClose, onUploadComplete }: UploadModalProps) {
  const [selectedType, setSelectedType] = useState<UploadType>("photo");
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleDragOver = (e: DragEvent) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      setFiles((prev) => [...prev, ...Array.from(e.dataTransfer.files)]);
    }
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles((prev) => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const removeFile = (index: number) => setFiles((prev) => prev.filter((_, i) => i !== index));

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

  const currentType = uploadTypes.find((t) => t.type === selectedType)!;

  const handleClose = () => {
    setFiles([]);
    setUploadError(null);
    setSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="mx-4 w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-warm-200 px-6 py-4">
          <h2 className="text-lg font-bold text-warm-900">Add to Vault</h2>
          <button className="flex h-8 w-8 items-center justify-center rounded-full text-warm-400 hover:bg-warm-100 hover:text-warm-600" onClick={handleClose} type="button">✕</button>
        </div>

        {success ? (
          <div className="px-6 py-12 text-center">
            <div className="mb-4 text-5xl">✅</div>
            <h3 className="text-lg font-bold text-warm-900">Upload complete!</h3>
            <p className="mt-1 text-sm text-warm-500">Your memories are securely stored.</p>
          </div>
        ) : (
          <>
            <div className="flex gap-1 border-b border-warm-100 px-6 pt-4">
              {uploadTypes.map(({ type, label, icon }) => (
                <button
                  key={type}
                  className={`flex items-center gap-1.5 rounded-t-xl px-4 py-2 text-sm font-medium transition-all ${selectedType === type ? "bg-hearth-50 text-hearth-700" : "text-warm-500 hover:bg-warm-50 hover:text-warm-700"}`}
                  onClick={() => setSelectedType(type)}
                  type="button"
                >
                  <span>{icon}</span>
                  {label}
                </button>
              ))}
            </div>

            <div className="p-6">
              <div
                className={`relative rounded-xl border-2 border-dashed p-8 text-center transition-all ${isDragging ? "border-hearth-400 bg-hearth-50" : "border-warm-200 bg-warm-50/50"}`}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <input accept={currentType.accept} className="hidden" multiple onChange={handleFileSelect} ref={fileInputRef} type="file" />

                {files.length === 0 ? (
                  <div className="space-y-3">
                    <div className="text-5xl">{currentType.icon}</div>
                    <div>
                      <p className="font-medium text-warm-800">Drop your {currentType.label.toLowerCase()} here</p>
                      <p className="mt-1 text-sm text-warm-400">
                        or <button className="font-medium text-hearth-600 underline hover:text-hearth-700" onClick={() => fileInputRef.current?.click()} type="button">browse files</button>
                      </p>
                    </div>
                    <p className="text-xs text-warm-400">{currentType.desc}</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="text-3xl">📎</div>
                    <p className="font-medium text-warm-800">{files.length} file{files.length > 1 ? "s" : ""} selected</p>
                    <div className="mx-auto max-h-32 space-y-1 overflow-y-auto">
                      {files.map((file, i) => (
                        <div key={i} className="flex items-center justify-between rounded-lg bg-white px-3 py-2 text-sm shadow-sm">
                          <span className="truncate text-warm-700">{file.name}</span>
                          <button className="ml-2 shrink-0 text-warm-400 hover:text-red-500" onClick={() => removeFile(i)} type="button">✕</button>
                        </div>
                      ))}
                    </div>
                    <button className="text-sm font-medium text-hearth-600 underline hover:text-hearth-700" onClick={() => fileInputRef.current?.click()} type="button">Add more files</button>
                  </div>
                )}
              </div>

              {uploadError && (
                <div className="mt-3 rounded-xl bg-red-50 p-3 text-sm text-red-700">
                  {uploadError}
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 border-t border-warm-100 px-6 py-3">
              <span className="text-sm text-warm-400">🔒</span>
              <p className="text-xs text-warm-400">Your memories are encrypted end-to-end. Not even Livity can read them.</p>
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-warm-200 px-6 py-4">
              <button className="btn-secondary" onClick={handleClose} type="button">Cancel</button>
              <button className="btn-primary" disabled={files.length === 0 || isUploading} onClick={handleUpload} type="button">
                {isUploading ? "Uploading..." : `Upload ${files.length > 0 ? `(${files.length})` : ""}`}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}