import React, { useRef, useState } from "react";
import { FaArrowRight, FaMicrophone } from "react-icons/fa";
import { FaCircleQuestion, FaXmark } from "react-icons/fa6";
import { apiProxyRequest } from "../lib/api-client-proxy";
import { useChatPanelStore } from "../stores/chatPanelStore";
import SelectLanguage from "./select-dropdown/language-select";
import ModeSelect from "./select-dropdown/chat-mode-select";
import { useDashboardStore } from "../stores/dashboardStore";

interface ChatMessage {
  question?: string;
  answer?: string;
}

const ChatPanel = () => {  
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [hasStarted, setHasStarted] = useState(false);
  const [loading, setLoading] = useState(false);
    const {
      selectedLanguage,
      setSelectedLanguage,

    } = useDashboardStore();
  

  const chatRef = useRef<HTMLDivElement | null>(null);

  const { isOpen, close, queryInput, setQueryInput, clearInput } =
    useChatPanelStore();



  const handleSend = async () => {
    if (!queryInput.trim()) return;

    setChatHistory((prev) => [...prev, { question: queryInput }]);
    setTimeout(() => {
      if (chatRef.current) {
        chatRef.current.scrollTop = chatRef.current.scrollHeight;
      }
    }, 100);

    setLoading(true);
    setHasStarted(true);

    const payload = { prompt: queryInput };

    try {
      const response = await apiProxyRequest<string[], typeof payload>(
        "POST",
        "ChatGPT/SendPromptQuery",
        payload
      );

      setChatHistory((prev) => [
        ...prev,
        {
          answer: response.join("\n") ?? "No answer received.",
        },
      ]);

      setTimeout(() => {
        if (chatRef.current) {
          chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
      }, 100);

      clearInput();
    } catch (error) {
      console.error("Chat request failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <aside className={`${isOpen ? "open" : ""} chat-panel`} id="chatPanel">
      <div className="chat-header">
        <div className="chat-title">
          <div className="chat-icon">
            <img src="/ai-tutor-1.png" className="w-75" alt="AI Tutor" />
          </div>
          <h3 className="chat-name m-0">
            Ask <span style={{ color: "rgb(237, 129, 51)" }}>Pad</span>
            <span style={{ color: "rgb(33, 140, 118)" }}>AI</span>
          </h3>
        </div>
        <div className="chat-controls">
          <div className="dropdown">
            <SelectLanguage
              onSelectLanguage={setSelectedLanguage}
              selectedLanguage={selectedLanguage}
            />
          </div>
          <div className="dropdown">
            <ModeSelect />
          </div>
          <button className="close-btn" id="closeChatBtn" onClick={close}>
            <FaXmark />
          </button>
        </div>
      </div>

      <div className="chat-content" ref={chatRef}>
        {!hasStarted && <>{/* You can add default example Q&A here */}</>}

        {chatHistory.map((msg, i) => (
          <React.Fragment key={i}>
            {msg.question && (
              <div className="question-bubble">
                <div className="question-header">
                  <div className="question-icon">
                    <FaCircleQuestion />
                  </div>
                  <div className="question-label">You</div>
                </div>
                <div className="question-text">{msg.question}</div>
              </div>
            )}
            {msg.answer && (
              <div className="answer-bubble">
                <div className="answer-content">
                  <div className="answer-icon">
                    <img src="/ai-white.svg" className="w-75" alt="AI" />
                  </div>
                  <div className="answer-text">{msg.answer}</div>
                </div>
              </div>
            )}
          </React.Fragment>
        ))}

        {loading && (
          <div className="typing-indicator">
            AI Buddy is typing
            <span className="dot" />
            <span className="dot" />
            <span className="dot" />
          </div>
        )}
      </div>

      <div className="chat-input-area">
        <div className="chat-input-container">
          <input
            type="text"
            className="chat-input"
            value={queryInput}
            placeholder="Ask a question..."
            onChange={(e) => setQueryInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            disabled={loading}
            style={{ paddingRight: "90px" }}
          />
          <div className="sidebar-icon micro-adjust">
            <FaMicrophone />
          </div>
          <button
            className="chat-send-btn"
            onClick={handleSend}
            disabled={loading}
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default ChatPanel;
