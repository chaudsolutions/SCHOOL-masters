import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useUserByIdData,
  useUserData,
} from "../../../../Hooks/useQueryFetch/useQueryData";
import PageLoader from "../../../../Animations/PageLoader";
import { TeacherStudentMessageForm } from "../../../../Custom/Forms/Forms";

const MessageIndividual = () => {
  useEffect(() => {
    window.scroll(0, 0); // scroll to top on component mount
  }, []);

  const { userId } = useParams();

  const { userData, isUserDataLoading } = useUserData();
  const { userByIdData, isUserByIdDataLoading, refetchUserById } =
    useUserByIdData(userId);

  const { _id } = userData || {};
  const { name, role, teacherStudentMessages } = userByIdData || {};

  const messagesList = teacherStudentMessages?.map((message) => {
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

  if (isUserByIdDataLoading || isUserDataLoading) {
    return (
      <div className="loader-container">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="manageUsers">
      {role === "teacher" ? (
        <>
          <h2>Message {name}</h2>
          <p>{role}</p>
        </>
      ) : (
        <h2>Messaging with teacher</h2>
      )}

      <ul className="messageBox">{messagesList}</ul>

      <TeacherStudentMessageForm
        refetchUser={refetchUserById}
        studentId={userId}
        userId={_id}
      />
    </div>
  );
};

export default MessageIndividual;
