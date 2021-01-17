import React, { useCallback, useEffect, useState, useRef } from "react";
import "./style.scss";
import { getFloorComment } from "src/common/api/comment";
import { Comment, CommentType } from "src/types";
import { toast } from "src/compoents/widgets/Toast";
import CommentItem from "../CommentItem";
import CommentBox from "../CommentBox";
import { useCommentList } from "src/hooks/useComment";
import { useLoadMore } from "src/hooks/useLoadMore";
import Page from "src/compoents/achive/PageLayout";
interface Props {
  parentComment: Comment;
  id: number;
  type: CommentType;
  onDeleteReply: (comment: Comment, parentComment: Comment) => void; //删除回复
  onAddReply: (comment: Comment) => void; //新增回复
  onDeleteParent: (comment: Comment) => Promise<void>; //删除评论
  onToggleLikeParent: (commentId: number, liked: boolean) => void;
}
const ReplyList: React.FC<Props> = ({
  id,
  type,
  parentComment,
  onDeleteParent,
  onAddReply,
  onDeleteReply,
  onToggleLikeParent,
}) => {
  const {
    list,
    setList,
    onDeleteComment,
    onAddComment,
    replyTarget,
    setReplyTarget,
    onToggleLikeComment,
  } = useCommentList(id, type, parentComment);
  const [loading, setLoading] = useState(false);
  const pageInfo = useRef({
    time: 0,
    hasMore: true,
  });
  const parentCommentId = parentComment.commentId;
  const refreshElm = useRef<null | HTMLDivElement>(null);
  const getList = useCallback(async () => {
    try {
      if (loading || !pageInfo.current.hasMore) return;
      setLoading(true);
      const params: any = {
        id,
        parentCommentId,
        type,
      };
      if (list.length) {
        params.time = list[list.length - 1].time;
      }
      const res = await getFloorComment({
        id,
        parentCommentId,
        type,
      });
      const { comments, hasMore, time } = res.data.data;
      setList((list) => [...list, ...comments]);
      pageInfo.current = { hasMore, time };
    } catch (err) {
      toast("加载失败");
    } finally {
      setLoading(false);
    }
  }, [id, list, loading, parentCommentId, setList, type]);
  useLoadMore(refreshElm, getList);
  useEffect(() => {
    setList([]);
    getList();
  }, [id, parentCommentId, type]);
  //新增回复
  async function onAdd(content: string) {
    const comment = await onAddComment(content);
    comment && onAddReply(parentComment);
    return comment;
  }
  async function onDelete(comment: Comment) {
    const res = await onDeleteComment(comment);
    if (res) {
      onDeleteReply(comment, parentComment);
    }
    return res;
  }
  return (
    <Page
      title={`回复（${parentComment.showFloorComment?.replyCount}）`}
      className="reply-page"
      main={
        <div className="reply-list-container" ref={refreshElm}>
          <div className="parent-comment">
            <CommentItem
              comment={parentComment}
              onReply={setReplyTarget}
              onDelete={onDeleteParent}
              onToggleLike={onToggleLikeParent}
            />
          </div>
          <div className="reply-list">
            <div className="title">全部回复</div>
            {list.map((item) => (
              <CommentItem
                key={item.commentId}
                comment={item}
                onReply={setReplyTarget}
                onDelete={onDelete}
                onToggleLike={onToggleLikeComment}
                parentCommentId={parentCommentId}
              ></CommentItem>
            ))}
          </div>
          {loading && <div className="loading">loading</div>}
          <CommentBox
            replyTarget={replyTarget}
            onBlur={() => setReplyTarget(null)}
            onSubmit={onAdd}
          />
        </div>
      }
    ></Page>
  );
};

export default ReplyList;
