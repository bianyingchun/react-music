import { useState } from "react";
import { likeComment, addComment, deleteComment } from "src/common/api/comment";
import { toast } from "src/compoents/widgets/Toast";
import { Comment, CommentType } from "src/types";
export function useCommentList(
  sourceId: number,
  sourceType: CommentType,
  parentComment?: Comment
) {
  const [list, setList] = useState<Comment[]>([]);
  async function onToggleLikeComment(cid: number, islike: boolean) {
    try {
      await likeComment({
        id: sourceId,
        t: islike ? 1 : 0,
        cid,
        type: sourceType,
      });
      setList((list) =>
        list.map((item) => {
          if (item.commentId === cid) {
            const likedCount = islike
              ? item.likedCount + 1
              : item.likedCount - 1;
            return { ...item, likedCount, liked: islike };
          } else {
            return item;
          }
        })
      );
    } catch (err) {
      toast("请求失败");
    }
  }
  const [replyTarget, _setReplyTarget] = useState<Comment | null>(
    parentComment || null
  );
  function setReplyTarget(target: Comment | null) {
    _setReplyTarget(target || parentComment || null);
  }
  // 添加评论
  async function onAddComment(content: string) {
    const params: any = {
      id: sourceId,
      t: replyTarget ? 2 : 1,
      type: sourceType,
      content: content,
    };
    let comment: Comment | null = null;

    if (replyTarget) {
      params.commentId = replyTarget.commentId;
    }
    try {
      const res = await addComment(params);
      comment = res.data.comment;
      if (parentComment) {
        // 回复列表回复
        if (replyTarget) {
          if (replyTarget.commentId !== parentComment.commentId) {
            comment = {
              ...comment,
              beReplied: [
                {
                  user: replyTarget.user,
                  beRepliedCommentId: replyTarget.commentId,
                  content: replyTarget.content,
                  status: 0,
                },
              ],
            };
            addCommentItem(comment);
          }
        }
      } else {
        //评论列表回复
        if (!replyTarget) {
          addCommentItem(comment);
        } else {
          const showFloorComment = replyTarget.showFloorComment || {
            replyCount: 0,
            showReplyCount: true,
          };
          updateCommentItem({
            ...replyTarget,
            showFloorComment: {
              ...showFloorComment,
              replyCount: showFloorComment.replyCount + 1,
            },
          });
        }
      }
    } catch (err) {
      if (err.response.status === 405) {
        toast(err.response.data.message || "请求过于频繁");
      } else {
        toast("请求失败");
      }
    } finally {
      setReplyTarget(null);
    }
    return comment;
  }

  function addCommentItem(comment: Comment) {
    const newList = list.slice();
    newList.unshift(comment);
    setList(newList);
  }
  function updateCommentItem(comment: Comment) {
    const index = list.findIndex(
      (item) => item.commentId === comment.commentId
    );
    setList((list) => {
      const newList = list.slice();
      newList.splice(index, 1, comment);
      return newList;
    });
  }
  // 删除评论
  async function onDeleteComment(comment: Comment) {
    const commentId = comment.commentId;
    let deleted = false;
    try {
      await deleteComment({
        id: sourceId,
        type: sourceType,
        commentId,
      });
      const index = list.findIndex((item) => item.commentId === commentId);
      if (index < 0) return false;
      deleted = true;
      const newList = list.slice();
      newList.splice(index, 1);
      setList(newList);
    } catch (err) {
      deleted = false;
      toast("删除失败");
    }
    return deleted;
  }

  return {
    list,
    setList,
    onDeleteComment,
    onAddComment,
    onToggleLikeComment,
    updateCommentItem,
    replyTarget,
    setReplyTarget,
  };
}
