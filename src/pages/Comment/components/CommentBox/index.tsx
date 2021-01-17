import React, { useRef, useState, useMemo, useEffect } from "react";
import "./style.scss";
import { Comment } from "src/types";
import { toast } from "src/compoents/widgets/Toast";

interface Props {
  replyTarget: Comment | null;
  onBlur: () => void;
  onSubmit: (text: string) => Promise<Comment | null>;
}
const CommentBox: React.FC<Props> = ({ replyTarget, onBlur, onSubmit }) => {
  const inputBox = useRef<HTMLDivElement | null>(null);
  const [commentContent, setCommentContent] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const placeholder = useMemo(() => {
    if (commentContent) return "";
    return replyTarget
      ? `回复${replyTarget.user.nickname}:`
      : "千头万绪，落笔汇成评论一句";
  }, [replyTarget, commentContent]);
  const onInput = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const t = e.target as HTMLDivElement;
    setCommentContent(t.innerText);
  };

  const sendComment = async () => {
    if (isPosting) return;
    setIsPosting(true);
    const content = commentContent.trim();
    if (!content) {
      return toast("请输入文本");
    }
    const success = await onSubmit(content);
    if (success) {
      setCommentContent("");
      if (inputBox.current) inputBox.current.innerText = "";
    }
    setIsPosting(false);
  };
  useEffect(() => {
    if (replyTarget) {
      inputBox.current?.focus();
    } else {
      inputBox.current?.blur();
    }
  }, [replyTarget]);
  return (
    <div
      className="comment-box"
      onBlur={(e) => {
        if (e.relatedTarget) return;
        onBlur();
      }}
    >
      <div
        contentEditable="true"
        className="comment-input"
        suppressContentEditableWarning={true}
        onInput={onInput}
        ref={inputBox}
        placeholder={placeholder}
      ></div>
      <button
        className="submit-btn"
        disabled={!commentContent.length || isPosting}
        onClick={sendComment}
      >
        发送
      </button>
    </div>
  );
};

export default CommentBox;
