import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useRef, useEffect } from "react";
import { c as chat } from "./router-CsWl_KXd.js";
function ConversationalChat({
  twinId,
  twinName,
  twinAvatarUrl
}) {
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      role: "twin",
      content: `Hello, I'm ${twinName}. I'd love to hear from you — ask me anything about my life, my stories, or just say hello.`,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = {
      id: `user-${Date.now()}`,
      role: "user",
      content: input.trim(),
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);
    setError(null);
    try {
      const res = await chat.send(twinId, { message: userMsg.content });
      const twinMsg = {
        id: `twin-${Date.now()}`,
        role: "twin",
        content: res.reply,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      };
      setMessages((prev) => [...prev, twinMsg]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to get response");
      const fallbackMsg = {
        id: `twin-${Date.now()}`,
        role: "twin",
        content: `I'm sorry, I'm having trouble connecting right now. Please try again in a moment. [Offline: ${err instanceof Error ? err.message : "unknown error"}]`,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsTyping(false);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "card flex h-[600px] flex-col", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 border-b border-warm-200 pb-4", children: [
      /* @__PURE__ */ jsx("div", { className: "flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-hearth-200 to-legacy-200 text-lg font-bold text-white", children: twinAvatarUrl ? /* @__PURE__ */ jsx("img", { src: twinAvatarUrl, alt: twinName, className: "h-full w-full object-cover" }) : twinName.charAt(0).toUpperCase() }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "font-semibold text-warm-900", children: twinName }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-warm-400", children: isTyping ? "thinking..." : "Digital Twin · Mistral AI" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 space-y-4 overflow-y-auto py-4", children: [
      messages.map((msg) => /* @__PURE__ */ jsx("div", { className: `flex ${msg.role === "user" ? "justify-end" : "justify-start"}`, children: /* @__PURE__ */ jsxs("div", { className: `max-w-[80%] rounded-2xl px-4 py-3 ${msg.role === "user" ? "bg-hearth-600 text-white" : "bg-warm-100 text-warm-800"}`, children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm leading-relaxed whitespace-pre-wrap", children: msg.content }),
        /* @__PURE__ */ jsx("p", { className: `mt-1 text-right text-[10px] ${msg.role === "user" ? "text-white/60" : "text-warm-400"}`, children: new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) })
      ] }) }, msg.id)),
      isTyping && /* @__PURE__ */ jsx("div", { className: "flex justify-start", children: /* @__PURE__ */ jsx("div", { className: "rounded-2xl bg-warm-100 px-4 py-3", children: /* @__PURE__ */ jsxs("div", { className: "flex gap-1", children: [
        /* @__PURE__ */ jsx("span", { className: "h-2 w-2 animate-bounce rounded-full bg-warm-400" }),
        /* @__PURE__ */ jsx("span", { className: "h-2 w-2 animate-bounce rounded-full bg-warm-400 [animation-delay:0.1s]" }),
        /* @__PURE__ */ jsx("span", { className: "h-2 w-2 animate-bounce rounded-full bg-warm-400 [animation-delay:0.2s]" })
      ] }) }) }),
      error && /* @__PURE__ */ jsx("div", { className: "rounded-xl bg-red-50 p-3 text-xs text-red-700", children: "Could not reach the AI. The backend might be offline." }),
      /* @__PURE__ */ jsx("div", { ref: messagesEndRef })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 border-t border-warm-200 pt-4", children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          className: "input-field flex-1",
          onChange: (e) => setInput(e.target.value),
          onKeyDown: (e) => e.key === "Enter" && handleSend(),
          placeholder: `Ask ${twinName} something...`,
          type: "text",
          value: input
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          className: "btn-primary !px-4 !py-3",
          disabled: !input.trim() || isTyping,
          onClick: handleSend,
          type: "button",
          children: "Send"
        }
      )
    ] })
  ] });
}
export {
  ConversationalChat as C
};
