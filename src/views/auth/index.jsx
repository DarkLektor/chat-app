import React from "react";
import "./auth.scss";

export default function Auth() {
  return (
    <div className="auth">
      <div className="auth__wrapper">
        <img
          src="src/assets/icons/041-user.png"
          alt="add avatar"
          className="auth__avatar-img"
        />
        <span className="auth__avatar__label">Выберите иконку профиля</span>
        <input
          type="text"
          className="auth__login"
          placeholder="Введите логин"
        />
        <input type="file" className="auth__avatar" />
      </div>
    </div>
  );
}
