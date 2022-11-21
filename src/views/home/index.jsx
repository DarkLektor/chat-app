import React, { useEffect, useRef, useState } from "react";
import Message from "@/components/message";
import "./home.scss";
import { auth } from "@/utils/firebase";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { db } from "@/utils/firebase";
import SendMessage from "@/components/send-message";
import UsersList from "@/components/users-list";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const scroll = useRef(null);

  useEffect(() => {
    const user = auth.currentUser;
    writeUserData(user);

    const q = query(collection(db, "messages"), orderBy("timestamp"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });
    const q2 = query(collection(db, "users"));
    const unsubscribe2 = onSnapshot(q2, (snapshot) => {
      let users = [];
      snapshot.forEach((doc) => {
        users.push({ ...doc.data() });
      });
      setUsers(users);
    });

    return () => {
      writeUserData(user, false);

      unsubscribe();
      unsubscribe2();
    };
  }, []);

  useEffect(() => {
    scroll.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function writeUserData(user, isOnline = true) {
    if (!user) return;
    const docRef = doc(db, "users", user.uid);
    setDoc(docRef, {
      isOnline,
      userName: user.displayName,
      userImg: user.photoURL,
      uid: user.uid,
    }).catch((e) => console.log(e));
  }

  return (
    <div className="chat">
      <div className="chat__wrapper">
        <UsersList users={users} />
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
    </div>
  );
}
