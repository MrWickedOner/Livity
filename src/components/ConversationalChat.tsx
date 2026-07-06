import { useState, useRef, useEffect } from "react";

interface Message {
  id: string;
  role: "user" | "twin";
  content: string;
  timestamp: Date;
}

interface ConversationalChatProps {
  twinName: string;
  twinAvatarUrl?: string;
}

export function ConversationalChat({
  twinName,
  twinAvatarUrl,
}: ConversationalChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "twin",
      content: `Hello, I'm ${twinName}. I'd love to hear from you — ask me anything about my life, my stories, or just say hello.`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate twin response — will be replaced with AI API call
    setTimeout(() => {
      const twinMsg: Message = {
        id: `twin-${Date.now()}`,
        role: "twin",
        content: `That's a wonderful question. Let me share a memory with you about that... *This is a placeholder response — the AI twin will be connected by the AI & RAG Engineer.*`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, twinMsg]);
      setIsTyping(false);
    }, 1500);
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
            {isTyping ? "typing..." : "Digital Twin"}
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-4 overflow-y-auto py-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                msg.role === "user"
                  ? "bg-hearth-600 text-white"
                  : "bg-warm-100 text-warm-800"
              }`}
            >
              <p className="text-sm leading-relaxed">{msg.content}</p>
              <p
                className={`mt-1 text-right text-[10px] ${
                  msg.role === "user" ? "text-white/60" : "text-warm-400"
                }`}
              >
                {msg.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
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