import React from "react";
import { Link } from "react-router-dom";
import { User } from "src/types";
import "./style.scss";

interface Props {
  list: User[];
}

const UserList: React.FC<Props> = ({ list }) => {
  return (
    <div className="user-list">
      {list.map((item, index) => (
        <Link className="user-item" key={index} to={`/user/${item.userId}`}>
          <img className="avatar" alt="" src={item.avatarUrl} />
          <div className="text">
            <div className="name">{item.nickname}</div>
            <div className="sub-text">{item.signature}</div>
          </div>
          {item.followed ? (
            <span className="follow-status">
              <i className="iconfont icon-selected"></i>
              已关注
            </span>
          ) : (
            <span className="follow-status unfollowed">
              <i className="iconfont icon-add"></i>关注
            </span>
          )}
        </Link>
      ))}
    </div>
  );
};

export default UserList;
