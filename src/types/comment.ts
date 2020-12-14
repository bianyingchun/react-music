import { User } from "./user";
export interface CommentList {
  code: number;
  data: {
    comments: Comment[];
    currentComment?: any;
    totalCount: number;
    hasMore: boolean;
    cursor: string;
    sortType: number;
    sortTypeList: SortTypeList[];
  };
}

interface SortTypeList {
  sortType: number;
  sortTypeName: string;
  target: string;
}
export interface Comment {
  user: User;
  beReplied: BeReplied[];
  pendantData?: PendantDatum;
  showFloorComment?: any;
  status: number;
  commentId: number;
  content: string;
  time: number;
  likedCount: number;
  expressionUrl?: any;
  commentLocationType: number;
  parentCommentId: number;
  decoration: Object;
  repliedMark?: any;
  liked: boolean;
}

interface BeReplied {
  user: User;
  beRepliedCommentId: number;
  content: string;
  status: number;
  expressionUrl?: any;
}
interface PendantDatum {
  id: number;
  imageUrl: string;
}

export type CommentType = "music" | "album" | "dj" | "video" | "mv";
