export interface ReplyModel {
  id: number;  
  name: string;
  comment: string;
  date: Date;
}

export interface CommentModel {
  id: number;
  name: string;
  email: string;
  website?: string;
  comment: string;
  date: Date;
  replies?: ReplyModel[];

  // ❗ UI-only (DO NOT STORE)
  showReplyBox?: boolean;
}