"use client";
import { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatMessage {
  type: "user" | "bot";
  content: string;
}

interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: number;
}

interface ChatbotAIProps {
  onClose: () => void;
}

const ChatbotAI = ({ onClose }: ChatbotAIProps) => {
  // State for current messages and input
  const [messages, setMessages] = useState<ChatMessage[]>([
    { type: "bot", content: "Hello! How can I help you today?" },
  ]);
  const [inputMessage, setInputMessage] = useState("");

  // State for chat history
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string>("");

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load chat history from localStorage on component mount
  useEffect(() => {
    const savedChats = localStorage.getItem("chatSessions");
    if (savedChats) {
      const parsedChats = JSON.parse(savedChats) as ChatSession[];
      setChatSessions(parsedChats);

      // If there are previous chats, load the most recent one
      if (parsedChats.length > 0) {
        const mostRecent = parsedChats[parsedChats.length - 1];
        setMessages(mostRecent.messages);
        setCurrentSessionId(mostRecent.id);
      } else {
        // No previous chats, create a new session
        createNewSession();
      }
    } else {
      // First time user, create a new session
      createNewSession();
    }
  }, []);

  // Save chat sessions to localStorage whenever they change
  useEffect(() => {
    if (chatSessions.length > 0) {
      localStorage.setItem("chatSessions", JSON.stringify(chatSessions));
    }
  }, [chatSessions]);

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Create a new chat session
  const createNewSession = () => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      title: "New Chat",
      messages: [{ type: "bot", content: "Hello! How can I help you today?" }],
      createdAt: Date.now(),
    };

    setChatSessions((prev) => [...prev, newSession]);
    setMessages(newSession.messages);
    setCurrentSessionId(newSession.id);
    setInputMessage("");
  };

  // Load a specific chat session
  const loadChatSession = (sessionId: string) => {
    const session = chatSessions.find((s) => s.id === sessionId);
    if (session) {
      setMessages(session.messages);
      setCurrentSessionId(session.id);
    }
  };

  // Update the current session title based on first user message
  const updateSessionTitle = (firstUserMessage: string) => {
    setChatSessions((prev) =>
      prev.map((session) =>
        session.id === currentSessionId
          ? {
              ...session,
              title:
                firstUserMessage.slice(0, 30) +
                (firstUserMessage.length > 30 ? "..." : ""),
            }
          : session
      )
    );
  };

  const handleSendMessage = async () => {
    if (inputMessage.trim() === "") return;

    const userMessage = { type: "user", content: inputMessage };
    const newMessages = [...messages, userMessage];

    // If this is the first user message, update the session title
    if (messages.length === 1 && messages[0].type === "bot") {
      updateSessionTitle(inputMessage);
    }

    setMessages(newMessages);
    setInputMessage("");

    try {
      const res = await fetch("http://localhost:8000/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: inputMessage }),
      });

      const data = await res.json();
      const botMessage = {
        type: "bot",
        content: data.answer || "Sorry, I couldn't find an answer.",
      };

      const updatedMessages = [...newMessages, botMessage];
      setMessages(updatedMessages);

      // Update the chat session with new messages
      setChatSessions((prev) =>
        prev.map((session) =>
          session.id === currentSessionId
            ? { ...session, messages: updatedMessages }
            : session
        )
      );
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        { type: "bot", content: "Oops! Something went wrong." },
      ]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSendMessage();
  };

  return (
    <div className="flex w-full h-full">
      {/* Left Side - Chat History */}
      <div className="w-1/5 bg-[#222] border-r border-gray-300 overflow-y-auto">
        <div className="flex items-center gap-2 m-5">
          <button
            onClick={createNewSession}
            className="bg-white cursor-pointer text-[#222] text-sm font-semibold px-4 py-2 rounded-2xl w-full"
          >
            New Chat
          </button>
          <button className="bg-white text-[#222] w-9 h-9 flex items-center justify-center rounded-lg">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z" />
            </svg>
          </button>
        </div>
        <div className="px-2">
          {chatSessions.map((session) => (
            <div
              key={session.id}
              onClick={() => loadChatSession(session.id)}
              className={`text-white px-4 py-3 rounded-md cursor-pointer hover:bg-[#2a2a2a] transition-all duration-200 hover:translate-x-1 truncate ${
                session.id === currentSessionId ? "bg-[#2a2a2a]" : ""
              }`}
            >
              {session.title}
            </div>
          ))}
        </div>
      </div>

      {/* Right Side - Current Chat */}
      <div className="w-4/5 bg-white flex flex-col h-full">
        {/* Header */}
        <div className="p-5 border-b border-gray-200 flex justify-between items-center bg-white">
          <span className="text-2xl font-medium">Lena AI</span>
          <div className="flex gap-2 items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="rounded-full hover:bg-gray-100"
            >
              <X className="h-4 w-4" />
            </Button>
            {["share", "more"].map((_, i) => (
              <button
                key={i}
                className="p-2 rounded-md hover:bg-gray-100 transition-colors text-[#222]"
              >
                {i === 0 ? (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M18 16.08C17.24 16.08 16.56 16.38 16.04 16.85L8.91 12.7C8.96 12.47 9 12.24 9 12C9 11.76 8.96 11.53 8.91 11.3L15.96 7.19C16.5 7.69 17.21 8 18 8C19.66 8 21 6.66 21 5C21 3.34 19.66 2 18 2C16.34 2 15 3.34 15 5C15 5.24 15.04 5.47 15.09 5.7L8.04 9.81C7.5 9.31 6.79 9 6 9C4.34 9 3 10.34 3 12C3 13.66 4.34 15 6 15C6.79 15 7.5 14.69 8.04 14.19L15.16 18.35C15.11 18.56 15.08 18.78 15.08 19C15.08 20.61 16.39 21.92 18 21.92C19.61 21.92 20.92 20.61 20.92 19C20.92 17.39 19.61 16.08 18 16.08Z" />
                  </svg>
                ) : (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 8C13.1 8 14 7.1 14 6C14 4.9 13.1 4 12 4C10.9 4 10 4.9 10 6C10 7.1 10.9 8 12 8ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10ZM12 16C10.9 16 10 16.9 10 18C10 19.1 10.9 20 12 20C13.1 20 14 19.1 14 18C14 16.9 13.1 16 12 16Z" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-5 space-y-5">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-4 py-3 rounded-xl max-w-[70%] text-sm ${
                    message.type === "user"
                      ? "bg-[#222] text-white"
                      : "bg-gray-100 text-black"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input */}
        <div className="p-5 border-t border-gray-200 flex gap-3 bg-white">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message here..."
            className="flex-1 px-4 py-3 rounded-xl shadow-sm text-sm focus:shadow-md outline-none transition-all"
          />
          <button
            onClick={handleSendMessage}
            className="w-[45px] h-[45px] rounded-xl bg-[#222] text-white flex items-center justify-center hover:bg-[#333] transition-transform hover:-translate-y-0.5 shadow"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatbotAI;
