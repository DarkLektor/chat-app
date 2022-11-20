import React, { useEffect, useRef, useState } from "react";
import Message from "@/components/message";
import "./home.scss";
import { auth } from "@/utils/firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "@/utils/firebase";
import SendMessage from "@/components/send-message";

export default function Home({ user }) {
  const [messages, setMessages] = useState([]);
  const scroll = useRef(null);

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    scroll.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat">
      {/* <aside className="chat__users-list">
        <h3 className="chat__users-list__title">Список пользователей</h3>
        <div className="user">
          <div className="user-avatar">
            <img
              src="/src/assets/images/default-user.png"
              alt="user avatar"
              className="user-avatar__img"
            />
          </div>
          <div className="user__info">
            <p className="user__info__name">name</p>
          </div>
        </div>
      </aside> */}

      <main className="chat__main">
        <header className="chat__main__header">
          <h1 className="header__title">CHAT APP</h1>
          <button className="header__logout" onClick={() => auth.signOut()}>
            Выйти
          </button>
        </header>
        <section className="chat__main__messages">
          {messages &&
            messages.map((message) => (
              <Message key={message.id} message={message} />
            ))}
          <span ref={scroll}></span>
        </section>

        <SendMessage scroll={scroll} />
      </main>
    </div>
  );
}
