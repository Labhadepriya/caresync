import { useMemo, useState } from "react";
import { Search, Send, MessageSquare, MoreVertical } from "lucide-react";
import {
  currentUserId,
  mockChatMessages,
  mockConversations,
  type ChatMessage,
} from "@/data/mockMessages";

export default function MessagesPage() {
  const [search, setSearch] = useState("");
  const [activeConversationId, setActiveConversationId] = useState(
    mockConversations[0]?.id ?? "",
  );
  const [messages, setMessages] = useState(mockChatMessages);
  const [draft, setDraft] = useState("");

  const filteredConversations = useMemo(
    () =>
      mockConversations.filter((conversation) =>
        `${conversation.participantName} ${conversation.role} ${conversation.department}`
          .toLowerCase()
          .includes(search.toLowerCase()),
      ),
    [search],
  );

  const activeConversation = filteredConversations.find(
    (conversation) => conversation.id === activeConversationId,
  );

  const activeMessages = messages.filter(
    (message) => message.conversationId === activeConversationId,
  );

  function sendMessage() {
    const text = draft.trim();

    if (!text || !activeConversation) return;

    const newMessage: ChatMessage = {
      id: `MSG-${Date.now()}`,
      conversationId: activeConversation.id,
      senderId: currentUserId,
      text,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      status: "Sent",
    };

    setMessages((previous) => [...previous, newMessage]);
    setDraft("");
  }

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Messages</h1>
        <p className="mt-1 text-sm text-neutral-500">
          Communicate with your healthcare team.
        </p>
      </div>

      <div className="grid h-[650px] grid-cols-1 overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm md:grid-cols-[300px_minmax(0,1fr)]">
        <aside className="flex min-h-0 flex-col border-b border-neutral-200 md:border-b-0 md:border-r">
          <div className="border-b border-neutral-200 p-4">
            <h2 className="text-base font-semibold text-neutral-900">
              Conversations
            </h2>

            <div className="relative mt-3">
              <Search
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
              />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search conversations..."
                aria-label="Search conversations"
                className="w-full rounded-lg border border-neutral-200 py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto">
            {filteredConversations.map((conversation) => (
              <button
                key={conversation.id}
                type="button"
                onClick={() => setActiveConversationId(conversation.id)}
                className={`flex w-full items-start gap-3 border-b border-neutral-100 p-4 text-left transition hover:bg-neutral-50 ${
                  activeConversationId === conversation.id
                    ? "bg-blue-50"
                    : "bg-white"
                }`}
              >
                <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
                  {conversation.avatarInitials}
                  {conversation.isOnline && (
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="truncate text-sm font-semibold text-neutral-900">
                      {conversation.participantName}
                    </p>
                    <span className="shrink-0 text-xs text-neutral-400">
                      {conversation.lastMessageTime}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-neutral-500">
                    {conversation.role}
                  </p>
                  <div className="mt-1 flex items-center justify-between gap-2">
                    <p className="truncate text-xs text-neutral-500">
                      {messages
                        .filter(
                          (message) =>
                            message.conversationId === conversation.id,
                        )
                        .at(-1)?.text ?? conversation.lastMessage}
                    </p>
                    {conversation.unreadCount > 0 && (
                      <span className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-blue-600 px-1 text-xs text-white">
                        {conversation.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}

            {filteredConversations.length === 0 && (
              <p className="p-6 text-center text-sm text-neutral-500">
                No conversations found.
              </p>
            )}
          </div>
        </aside>

        <div className="flex min-h-0 min-w-0 flex-col">
          {activeConversation ? (
            <>
              <header className="flex items-center justify-between border-b border-neutral-200 px-5 py-4">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
                    {activeConversation.avatarInitials}
                  </div>
                  <div className="min-w-0">
                    <h2 className="truncate text-sm font-semibold text-neutral-900">
                      {activeConversation.participantName}
                    </h2>
                    <p className="text-xs text-neutral-500">
                      {activeConversation.role} ·{" "}
                      {activeConversation.isOnline ? "Online" : "Offline"}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  aria-label="More conversation options"
                  title="More options"
                  className="rounded-lg p-2 text-neutral-500 hover:bg-neutral-100"
                >
                  <MoreVertical size={20} />
                </button>
              </header>

              <div className="flex-1 space-y-4 overflow-y-auto bg-neutral-50/70 p-5">
                <div className="text-center">
                  <span className="rounded-full bg-white px-3 py-1 text-xs text-neutral-400 shadow-sm">
                    Today
                  </span>
                </div>

                {activeMessages.map((message) => {
                  const isMine = message.senderId === currentUserId;

                  return (
                    <div
                      key={message.id}
                      className={`flex ${isMine ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-sm sm:max-w-[75%] ${
                          isMine
                            ? "rounded-br-sm bg-blue-600 text-white"
                            : "rounded-bl-sm border border-neutral-200 bg-white text-neutral-800"
                        }`}
                      >
                        <p className="whitespace-pre-wrap break-words text-sm">
                          {message.text}
                        </p>
                        <div
                          className={`mt-1 text-right text-[11px] ${
                            isMine ? "text-blue-100" : "text-neutral-400"
                          }`}
                        >
                          {message.timestamp}
                          {isMine && ` · ${message.status}`}
                        </div>
                      </div>
                    </div>
                  );
                })}

                {activeMessages.length === 0 && (
                  <div className="flex h-full min-h-32 flex-col items-center justify-center text-center">
                    <MessageSquare
                      size={30}
                      className="mb-2 text-neutral-300"
                    />
                    <p className="text-sm text-neutral-500">
                      No messages yet. Start the conversation.
                    </p>
                  </div>
                )}
              </div>

              <form
                className="flex items-center gap-3 border-t border-neutral-200 bg-white p-4"
                onSubmit={(event) => {
                  event.preventDefault();
                  sendMessage();
                }}
              >
                <input
                  type="text"
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  placeholder="Type your message..."
                  aria-label="Type your message"
                  className="min-w-0 flex-1 rounded-lg border border-neutral-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
                <button
                  type="submit"
                  disabled={!draft.trim()}
                  className="flex shrink-0 items-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Send size={16} />
                  <span className="hidden sm:inline">Send</span>
                </button>
              </form>
            </>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center p-6 text-center">
              <MessageSquare size={40} className="mb-3 text-neutral-300" />
              <h2 className="font-semibold text-neutral-800">
                Select a conversation
              </h2>
              <p className="mt-1 text-sm text-neutral-500">
                Choose a conversation to view its messages.
              </p>
            </div>
          )}
        </div>
      </div>

      <p className="text-xs text-neutral-500">
        Demo only: messages are stored in local page state and are not sent to
        real users or persisted to a server.
      </p>
    </section>
  );
}
