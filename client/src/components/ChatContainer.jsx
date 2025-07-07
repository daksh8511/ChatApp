import React, { useEffect, useRef } from "react";
import useChat from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./MessageSkeleton";
import useAuth from "../store/useAuthStore";

const ChatContainer = () => {
  const {
    message,
    isMessagesLoading,
    selectedUser,
    getMessages,
    subscribeToMessage,
    unsubscribeFromMessages,
  } = useChat();

  const { authUser } = useAuth();

  const messageRef = useRef("");

  const formatMessageTime = (date) => {
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessage();

    return () => {
      unsubscribeFromMessages();
    };
  }, [
    selectedUser._id,
    getMessages,
    subscribeToMessage,
    unsubscribeFromMessages,
  ]);

  useEffect(() => {
    if (messageRef.current && message) {
      messageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [message]);

  if (isMessagesLoading) {
    return (
      <div className="flex flex-1 flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-col flex flex-1 overflow-auto">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {message.map((message, i) => {
          return (
            <div
              key={i}
              className={`chat ${
                message.senerdId === authUser._id ? "chat-end" : "chat-start"
              }`}
              ref={messageRef}
            >
              <div className="chat-image avatar">
                <div className="size-10 rounded-full border">
                  <img
                    src={
                      message.senerdId === authUser._id
                        ? authUser.profilePic || "/avatar.png"
                        : selectedUser.profilePic || "/avatar.png"
                    }
                    alt="avatar"
                  />
                </div>
              </div>
              <div className="chat-header mb-1 ">
                <time>{formatMessageTime(message.createdAt)}</time>
              </div>
              <div className="chat-bubble flex flex-col">
                {message.image && (
                  <img
                    src={message.image}
                    alt="Attachment"
                    className="sm:max-w-[200px] rounded-md mb-2"
                  />
                )}
                {message.text && <p>{message.text}</p>}
              </div>
            </div>
          );
        })}
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;
