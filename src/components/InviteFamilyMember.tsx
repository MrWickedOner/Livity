import { useState } from "react";
import { family } from "~/lib/api";

interface InviteFamilyMemberProps {
  isOpen: boolean;
  onClose: () => void;
  vaultOwnerName: string;
}

interface Invitee {
  email: string;
  role: "viewer" | "contributor";
}

export function InviteFamilyMember({ isOpen, onClose, vaultOwnerName }: InviteFamilyMemberProps) {
  const [invitees, setInvitees] = useState<Invitee[]>([{ email: "", role: "viewer" }]);
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const addInvitee = () => setInvitees((prev) => [...prev, { email: "", role: "viewer" }]);

  const updateInvitee = (index: number, field: keyof Invitee, value: string) => {
    setInvitees((prev) =>
      prev.map((invitee, i) =>
        i === index ? { ...invitee, [field]: field === "role" ? (value as "viewer" | "contributor") : value } : invitee,
      ),
    );
  };

  const removeInvitee = (index: number) => setInvitees((prev) => prev.filter((_, i) => i !== index));

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="mx-4 w-full max-w-lg rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-warm-200 px-6 py-4">
          <h2 className="text-lg font-bold text-warm-900">Invite Family</h2>
          <button className="flex h-8 w-8 items-center justify-center rounded-full text-warm-400 hover:bg-warm-100 hover:text-warm-600" onClick={handleClose} type="button">✕</button>
        </div>

        {sent ? (
          <div className="px-6 py-12 text-center">
            <div className="mb-4 text-5xl">🎉</div>
            <h3 className="text-lg font-bold text-warm-900">Invitations sent!</h3>
            <p className="mt-2 text-sm text-warm-500">Your family members will receive an email with instructions to access {vaultOwnerName}'s vault.</p>
            <button className="btn-primary mt-6" onClick={handleClose} type="button">Done</button>
          </div>
        ) : (
          <>
            <div className="px-6 py-4">
              <p className="text-sm text-warm-600">
                Invite family members to view <span className="font-semibold text-warm-900">{vaultOwnerName}'s</span> Digital Twin. Contributors can also upload memories.
              </p>
            </div>

            <div className="space-y-3 px-6 pb-4">
              {invitees.map((invitee, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex-1">
                    <input className="input-field" onChange={(e) => updateInvitee(i, "email", e.target.value)} placeholder="family@example.com" type="email" value={invitee.email} />
                  </div>
                  <select className="input-field w-32 shrink-0" onChange={(e) => updateInvitee(i, "role", e.target.value)} value={invitee.role}>
                    <option value="viewer">Viewer</option>
                    <option value="contributor">Contributor</option>
                  </select>
                  {invitees.length > 1 && (
                    <button className="mt-2 shrink-0 text-warm-400 hover:text-red-500" onClick={() => removeInvitee(i)} type="button">✕</button>
                  )}
                </div>
              ))}
              <button className="text-sm font-medium text-hearth-600 hover:text-hearth-700" onClick={addInvitee} type="button">+ Add another</button>
            </div>

            {error && <div className="mx-6 mb-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</div>}

            <div className="mx-6 mb-4 space-y-2 rounded-xl bg-warm-50 p-4 text-sm">
              <div className="flex items-start gap-2">
                <span className="mt-0.5 text-warm-400">👁️</span>
                <div><span className="font-medium text-warm-700">Viewer</span><span className="text-warm-500"> — can see all memories and chat with the Digital Twin</span></div>
              </div>
              <div className="flex items-start gap-2">
                <span className="mt-0.5 text-warm-400">✏️</span>
                <div><span className="font-medium text-warm-700">Contributor</span><span className="text-warm-500"> — can also upload new photos, stories, and recordings</span></div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-warm-200 px-6 py-4">
              <button className="btn-secondary" onClick={handleClose} type="button">Cancel</button>
              <button className="btn-primary" disabled={isSending || invitees.filter((i) => i.email.trim() && i.email.includes("@")).length === 0} onClick={handleSend} type="button">
                {isSending ? "Sending..." : "Send Invites"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}