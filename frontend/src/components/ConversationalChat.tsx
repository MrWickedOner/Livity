import { useState, useRef, useEffect } from "react";
import { chat } from "~/lib/api";
import type { ChatMessage } from "~/lib/types";

interface ConversationalChatProps {
  twinId: string;
  twinName: string;
  twinAvatarUrl?: string;
}

export function ConversationalChat({
  twinId,
  twinName,
  twinAvatarUrl,
}: ConversationalChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "twin",
      content: `Hello, I'm ${twinName}. I'd love to hear from you — ask me anything about my life, my stories, or just say hello.`,
      timestamp: new Date().toISOString(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: input.trim(),
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);
    setError(null);

    try {
      const res = await chat.send(twinId, { message: userMsg.content });
      const twinMsg: ChatMessage = {
        id: `twin-${Date.now()}`,
        role: "twin",
        content: res.reply,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, twinMsg]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to get response");
      // Fallback: show a friendly offline message
      const fallbackMsg: ChatMessage = {
        id: `twin-${Date.now()}`,
        role: "twin",
        content: `I'm sorry, I'm having trouble connecting right now. Please try again in a moment. [Offline: ${err instanceof Error ? err.message : "unknown error"}]`,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="card flex h-[600px] flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-warm-200 pb-4">
        <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-hearth-200 to-legacy-200 text-lg font-bold text-white">
          {twinAvatarUrl ? (
            <img src={twinAvatarUrl} alt={twinName} className="h-full w-full object-cover" />
          ) : (
            twinName.charAt(0).toUpperCase()
          )}
        </div>
        <div>
          <p className="font-semibold text-warm-900">{twinName}</p>
          <p className="text-xs text-warm-400">
            {isTyping ? "thinking..." : "Digital Twin · Mistral AI"}
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-4 overflow-y-auto py-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${msg.role === "user" ? "bg-hearth-600 text-white" : "bg-warm-100 text-warm-800"}`}>
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
              <p className={`mt-1 text-right text-[10px] ${msg.role === "user" ? "text-white/60" : "text-warm-400"}`}>
                {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="rounded-2xl bg-warm-100 px-4 py-3">
              <div className="flex gap-1">
                <span className="h-2 w-2 animate-bounce rounded-full bg-warm-400" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-warm-400 [animation-delay:0.1s]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-warm-400 [animation-delay:0.2s]" />
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="rounded-xl bg-red-50 p-3 text-xs text-red-700">
            Could not reach the AI. The backend might be offline.
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 border-t border-warm-200 pt-4">
        <input
          className="input-field flex-1"
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder={`Ask ${twinName} something...`}
          type="text"
          value={input}
        />
        <button
          className="btn-primary !px-4 !py-3"
          disabled={!input.trim() || isTyping}
          onClick={handleSend}
          type="button"
        >
          Send
        </button>
      </div>
    </div>
  );
}