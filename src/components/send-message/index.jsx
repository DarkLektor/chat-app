import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, { useState } from "react";
import { db, auth } from "@/utils/firebase";
import "./send-message.scss";

export default function SendMessage() {
  const [inputText, setInputText] = useState("");

  async function sendMessage(e) {
    e.preventDefault();
    if (inputText || inputText === 0) {
      const user = auth.currentUser;
      await addDoc(collection(db, "messages"), {
        text: inputText.trim(),
        userName: user.displayName,
        userImg: user.photoURL,
        uid: user.uid,
        timestamp: serverTimestamp(),
      });

      setInputText("");
    }
  }

  return (
    <form className="send-message" onSubmit={sendMessage}>
      <input
        type="text"
        className="send-message__input"
        placeholder="Введите текст"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <button type="submit" className="send-message__btn">
        <img src="images/send.png" alt="send message" />
      </button>
    </form>
  );
}
