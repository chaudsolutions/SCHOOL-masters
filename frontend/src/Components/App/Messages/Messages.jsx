import { useEffect } from "react";
import PageLoader from "../../Animations/PageLoader";
import { SendMessageForm } from "../../Custom/Forms/Forms";
import {
  useMessagesData,
  useUserData,
} from "../../Hooks/useQueryFetch/useQueryData";

const Messages = () => {
  useEffect(() => {
    window.scroll(0, 0); // scroll to top on component mount
  }, []);

  const { userData, isUserDataLoading } = useUserData();
  const { messagesData, isMessagesDataLoading, refetchMessages } =
    useMessagesData();

  const { role } = userData || {};
  const isAdmin = role === "admin";

  if (isUserDataLoading || isMessagesDataLoading) {
    return (
      <div className="loader-container">
        <PageLoader />
      </div>
    );
  }

  const messagesList = messagesData?.map((message) => (
    <li
      key={message._id}
      style={{
        backgroundColor: isAdmin
          ? "var(--accent-color-second)"
          : "var(--accent-color)",
        alignItems: isAdmin ? "end" : "start",
      }}>
      {!isAdmin && <h6>{message.senderRole}</h6>}
      <strong>{message.content}</strong>
      <p>{new Date(message.createdAt).toLocaleString()}</p>
    </li>
  ));

  return (
    <div className="manageUsers">
      <h2>Messages</h2>

      <ul
        className="messageBox"
        style={{ alignItems: isAdmin ? "end" : "start" }}>
        {messagesList}
      </ul>

      {isUserDataLoading ? (
        <PageLoader />
      ) : (
        <>
          {role === "admin" && (
            <SendMessageForm refetchMessages={refetchMessages} />
          )}
        </>
      )}
    </div>
  );
};

export default Messages;
