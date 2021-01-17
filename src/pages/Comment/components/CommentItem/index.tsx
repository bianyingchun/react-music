import React from "react";
import { Link } from "react-router-dom";
import "./style.scss";
import { Comment } from "src/types";
import { formatTime } from "src/common/js/util";
import { showToolTips, confirm } from "src/compoents/widgets/Dialog";
import { useAuth } from "src/hooks/useAuth";
interface Props {
  comment: Comment;
  onReply: (comment: Comment) => void;
  onDelete: (comment: Comment) => void;
  onToggleLike: (commentId: number, liked: boolean) => void;
  onShowFloor?: () => void;
  parentCommentId?: number;
}
const CommentItem: React.FC<Props> = ({
  comment,
  onToggleLike,
  onReply,
  onDelete,
  onShowFloor,
  parentCommentId,
}) => {
  const { account, toggleLoginBox } = useAuth();
  const onTriggerToolbar = () => {
    if (!account) {
      return toggleLoginBox(true);
    }
    const list = [
      {
        title: "回复评论",
        action() {
          onReply(comment);
        },
      },
    ];
    account.id === comment.user.userId &&
      list.push({
        title: "删除评论",
        action() {
          confirm("确认删除该条评论？")
            .then(() => {
              onDelete(comment);
            })
            .catch(() => console.log("canceled"));
        },
      });
    showToolTips(list);
  };
  function renderReply(comment: Comment) {
    if (!comment.beReplied || !comment.beReplied.length) return null;
    const reply = comment.beReplied[0];
    if (reply.beRepliedCommentId === parentCommentId) return null;
    if (reply.status) return <div className="replied-content">评论已删除</div>;
    return (
      <div className="replied-content">
        <Link
          to={`/user/${comment.beReplied[0].user.userId}`}
          className="nickname"
        >
          @{comment.beReplied[0].user.nickname}
        </Link>
        :{comment.beReplied[0].content}
      </div>
    );
  }
  return (
    <div className="comment-item">
      <Link to={`/user/${comment.user.userId}`} className="avatar">
        <img src={comment.user.avatarUrl} alt="" className="avatar" />
      </Link>
      <div className="text">
        <div className="header">
          <div className="title">
            <div className="nickname">{comment.user.nickname}</div>
            <div className="date">{formatTime(comment.time)}</div>
          </div>

          <div className={comment.liked ? "like-count active" : "like-count"}>
            <span className="count">{comment.likedCount}</span>
            <span
              className={[
                "iconfont",
                comment.liked ? "icon-like-fill" : "icon-like",
              ].join(" ")}
              onClick={() => onToggleLike(comment.commentId, !comment.liked)}
            ></span>
          </div>
        </div>
        <div className="comment-body">
          <div className="content">{comment.content}</div>
          <span onClick={onTriggerToolbar}>
            <i className="iconfont icon-more"></i>
          </span>
        </div>
        {!!comment.showFloorComment && comment.showFloorComment.replyCount > 0 && (
          <span
            onClick={() => {
              onShowFloor && onShowFloor();
            }}
            className="reply-count"
          >
            {comment.showFloorComment.replyCount}条回复
            <i className="iconfont icon-right"></i>
          </span>
        )}
        {renderReply(comment)}
      </div>
    </div>
  );
};

export default CommentItem;
