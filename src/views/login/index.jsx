import React from "react";
import "./login.scss";

export default function Login({ signIn }) {
  return (
    <div className="login">
      <div className="login__wrapper">
        <h1 className="login__title">
          Добро пожаловать в <br />
          <span>CHAT APP</span>
        </h1>
        <button className="login__btn" onClick={signIn}>
          <span>Войти</span>
          <img src="/images/google.svg" alt="google" />
        </button>
      </div>
    </div>
  );
}
