import React from "react";
import { auth } from "@/utils/firebase";
import "./message.scss";

export default function Message({ message }) {
  let date = message?.timestamp?.toDate().toDateString();
  if (date) date = new Date(date).toLocaleString("ru");
  const fromTo = message.uid === auth.currentUser.uid ? "me" : "others";

  return (
    <div className={`message ${fromTo}`}>
      <img
        src={message.userImg || "/src/assets/images/default-user.png"}
        alt="user avatar"
        className="message__user-avatar"
      />
      <div className="message__wrapper">
        <p className="message__text">{message.text}</p>
        <div className="message__info">
          <p>{message.userName}</p>
          <p>{date}</p>
        </div>
      </div>
    </div>
  );
}
