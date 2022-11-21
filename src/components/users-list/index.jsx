import React, { useState } from "react";
import "./users-list.scss";

export default function UsersList({ users }) {
  return (
    <aside className="users-list">
      <h3 className="users-list__title">Список пользователей</h3>
      <img
        className="users-list__header-img"
        src="/src/assets/images/group.png"
        alt="users"
      />

      {users?.map((user) => {
        return user.isOnline ? (
          <div className="user" key={user.uid}>
            <img
              src={user.userImg || "/src/assets/images/default-user.png"}
              alt="user avatar"
              className="user__avatar"
              title={user.userName}
            />
            <div className="user__info">
              <p className="user__info__name">{user.userName}</p>
            </div>
          </div>
        ) : (
          <span key={user.uid}></span>
        );
      })}
    </aside>
  );
}
