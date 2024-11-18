import { useEffect } from "react";
import {
  useStudentsGroupChatMessagesData,
  useUserData,
} from "../../../../Hooks/useQueryFetch/useQueryData";
import PageLoader from "../../../../Animations/PageLoader";
import { SendGroupChatMessage } from "../../../../Custom/Forms/Forms";

const GroupChat = () => {
  useEffect(() => {
    window.scroll(0, 0); // scroll to top on component mount
  }, []);

  const { userData, isUserDataLoading } = useUserData();
  const {
    studentsGroupChatMessagesData,
    isStudentsGroupChatMessagesDataLoading,
    refetchStudentsGroupChatMessages,
  } = useStudentsGroupChatMessagesData();

  const { _id, role } = userData || {};

  const messagesList = studentsGroupChatMessagesData?.map((message) => {
    const isSentByCurrentUser = message.senderId === _id;

    return (
      <li
        key={message._id}
        style={{
          backgroundColor: isSentByCurrentUser
            ? "var(--accent-color-second)"
            : "var(--accent-color)",
          textAlign: isSentByCurrentUser ? "right" : "left",
          marginLeft: isSentByCurrentUser ? "auto" : "0",
          marginRight: isSentByCurrentUser ? "0" : "auto",
          alignItems: isSentByCurrentUser ? "end" : "start",
        }}>
        {!isSentByCurrentUser && <p>{message.senderRole}</p>}
        <strong>{message.content}</strong>
        <p>{new Date(message.createdAt).toLocaleString()}</p>
      </li>
    );
  });

  if (isUserDataLoading || isStudentsGroupChatMessagesDataLoading) {
    return (
      <div className="loader-container">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="manageUsers">
      <div className="viewIndividual-one">
        <h2>Group Chat</h2>
        <p>This group chat is monitored</p>
      </div>

      <ul className="messageBox">{messagesList}</ul>

      {role === "student" && (
        <SendGroupChatMessage
          refetchMessages={refetchStudentsGroupChatMessages}
        />
      )}
    </div>
  );
};

export default GroupChat;
