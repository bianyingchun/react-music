import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import "./style.scss";
import Page from "src/compoents/achive/PageLayout";
import { COMMENT } from "src/common/js/config";
import { Comment, CommentType, CommentTypeNames } from "src/types";
import { getCommentList } from "src/common/api/comment";
import { useLoadMore } from "src/hooks/useLoadMore";
import { toast } from "src/compoents/widgets/Toast";
import { useRouteParam } from "src/hooks/usePage";
import { useCommentList } from "src/hooks/useComment";
import CommentItem from "./components/CommentItem";
import CommentBox from "./components/CommentBox";
import ReplyList from "./components/ReplyList";
import BottomPanel from "src/compoents/widgets/BottomPanel";
const CommentList = () => {
  const { type, id } = useRouteParam<{ id: string; type: CommentTypeNames }>({
    id: "",
    type: "music",
  });
  const sourceId = Number(id);
  const sourceType = CommentType[type];
  const sortTypeList =
    sourceType === CommentType.music
      ? COMMENT.sortType.music
      : COMMENT.sortType.other;
  const {
    list,
    setList,
    onDeleteComment,
    onAddComment,
    replyTarget,
    setReplyTarget,
    onToggleLikeComment,
    updateCommentItem,
  } = useCommentList(sourceId, sourceType);
  const hasMore = useRef(true);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [sortIndex, setSortIndex] = useState(0);
  const pageInfo = useRef({ pageNo: 1, pageSize: 20 });
  const refreshElm = useRef<null | HTMLDivElement>(null);

  const getList = useCallback(async () => {
    if (!hasMore.current || loading) return;
    const sortType = sortTypeList[sortIndex].val;
    setLoading(true);
    const opts: any = {
      ...pageInfo.current,
      sortType,
    };
    if (sortType === 3 && pageInfo.current.pageNo > 1) {
      opts.cursor = list[list.length - 1].time;
    }
    try {
      const res = await getCommentList(sourceId, sourceType, opts);
      hasMore.current = res.hasMore;
      pageInfo.current.pageNo++;
      setList((data) => [...data, ...res.comments]);
      setTotal(res.totalCount);
    } catch (err) {
      toast("加载失败");
    } finally {
      setLoading(false);
    }
  }, [loading, sortTypeList, sortIndex, list, sourceId, sourceType, setList]);
  useLoadMore(refreshElm, getList);
  useEffect(() => {
    pageInfo.current.pageNo = 1;
    hasMore.current = true;
    setList([]);
    getList();
  }, [sortIndex]);

  const [floorCommentIndex, setFloorCommentIndex] = useState(-1);
  const currentFloorComment = useMemo(() => {
    return list[floorCommentIndex] || null;
  }, [list, floorCommentIndex]);
  function hideFloorComment() {
    setFloorCommentIndex(-1);
  }

  function updateCountOnAddComment(
    parentComment?: Comment // 楼层下新增评论(新增回复)
  ) {
    // 新增一条回复
    // 新增一条comment
    let addCount = 1;
    if (parentComment) {
      const showFloorComment = parentComment.showFloorComment || {
        replyCount: 0,
        showReplyCount: true,
      };
      updateCommentItem({
        ...parentComment,
        showFloorComment: {
          ...showFloorComment,
          replyCount: showFloorComment.replyCount + 1,
        },
      });
    }
    setTotal(total + addCount);
  }
  function updateCountOnDeleteComment(
    deletedComment: Comment,
    parentComment?: Comment
  ) {
    // 1. 删除楼层下的某条回复
    // 2. 有回复的评论
    // 3. 无回复无楼层的评论
    let deletedCount = 1;
    if (parentComment) {
      const showFloorComment = parentComment.showFloorComment;
      if (showFloorComment) {
        updateCommentItem({
          ...parentComment,
          showFloorComment: {
            ...showFloorComment,
            replyCount: showFloorComment.replyCount - 1,
          },
        });
      }
    } else {
      deletedCount += deletedComment.showFloorComment
        ? deletedComment.showFloorComment.replyCount
        : 0;
    }
    setTotal(total - deletedCount);
  }

  async function AddParentComment(text: string) {
    const res = await onAddComment(text);
    res && updateCountOnAddComment();
    return res;
  }

  async function onDeleteParent(comment: Comment) {
    const res = await onDeleteComment(comment);
    if (res) {
      updateCountOnAddComment();
      hideFloorComment();
    }
  }

  return (
    <>
      <Page
        title={`评论(${total})`}
        main={
          <div className="comment-container" ref={refreshElm}>
            <div className="navbar-container">
              <div className="navbar">
                <span className="title">评论区</span>
                <div className="list">
                  {sortTypeList.map((item, index) => {
                    return (
                      <React.Fragment key={index}>
                        <span
                          onClick={() => setSortIndex(index)}
                          className={
                            sortIndex === index ? "nav-item active" : "nav-item"
                          }
                        >
                          {item.text}
                        </span>
                        {index < sortTypeList.length - 1 && (
                          <span className="divide"></span>
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="comment-list">
              {list.map((item, index) => (
                <CommentItem
                  key={item.commentId}
                  comment={item}
                  onShowFloor={() => setFloorCommentIndex(index)}
                  onReply={setReplyTarget}
                  onDelete={onDeleteComment}
                  onToggleLike={onToggleLikeComment}
                ></CommentItem>
              ))}
            </div>
            {loading && <div className="loading">loading</div>}
          </div>
        }
      ></Page>
      <CommentBox
        replyTarget={replyTarget}
        onBlur={() => setReplyTarget(null)}
        onSubmit={AddParentComment}
      />
      <BottomPanel show={!!currentFloorComment} onHide={hideFloorComment}>
        <ReplyList
          parentComment={currentFloorComment}
          id={sourceId}
          type={sourceType}
          onDeleteParent={onDeleteParent}
          onDeleteReply={updateCountOnDeleteComment}
          onAddReply={updateCountOnAddComment}
          onToggleLikeParent={onToggleLikeComment}
        />
      </BottomPanel>
    </>
  );
};

export default CommentList;
