import { Component } from '@angular/core';
import { CommentModel } from '../../shared/models/comment.model';
import { CommentService } from '../../shared/models/comment.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../shared/models/auth.service';

@Component({
  selector: 'app-post-comment',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './post-comment.component.html',
  styleUrl: './post-comment.component.scss'
})
export class PostCommentComponent {
 comments: CommentModel[] = [];
isAdmin = true;

  formData: CommentModel = {
    id: 0,
    name: '',
    email: '',
    website: '',
    comment: '',
    date: new Date()
  };

  // reply input data (TEMP only)
  replyData: { [key: number]: { name: string; comment: string } } = {};

  constructor(private commentService: CommentService, private authService:AuthService) {}

  ngOnInit() {
    this.commentService.comments$.subscribe(res => {
      // 🔥 Reset UI state on refresh
      this.comments = res.map(c => ({
        ...c,
        showReplyBox: false
      }));
    });
    this.isAdmin = this.authService.isAdmin();
  }

  postComment() {
    const newComment: CommentModel = {
      ...this.formData,
      id: Date.now(),
      date: new Date(),
      replies: []
    };

    const updated = [...this.comments, newComment];
    this.commentService.updateComments(updated);

    // reset form
    this.formData = {
      id: 0,
      name: '',
      email: '',
      website: '',
      comment: '',
      date: new Date()
    };
  }

  toggleReply(comment: CommentModel) {
    // close all reply boxes
    this.comments.forEach(c => c.showReplyBox = false);

    // open selected
    comment.showReplyBox = true;

    // init reply data
    if (!this.replyData[comment.id]) {
      this.replyData[comment.id] = { name: '', comment: '' };
    }
  }

  postReply(comment: CommentModel) {
   const replyForm = this.replyData[comment.id];

  if (!replyForm?.comment || !replyForm?.name) return;

  // ensure replies array exists
  comment.replies = comment.replies || [];

  // ✅ MUST include id
  comment.replies.push({
    id: Date.now(),            // 🔑 REQUIRED
    name: replyForm.name,
    comment: replyForm.comment,
    date: new Date()
  });

  // clear UI state
  this.replyData[comment.id] = { name: '', comment: '' };
  comment.showReplyBox = false;

  // persist
  this.commentService.updateComments(this.comments);
  }
 

    
   /* ---------------- DELETE COMMENT ---------------- */
  deleteComment(commentId: number) {
    if (!confirm('Delete this comment?')) return;

    const updated = this.comments.filter(c => c.id !== commentId);
    this.commentService.updateComments(updated);
  }

  /* ---------------- DELETE REPLY ---------------- */
  deleteReply(comment: CommentModel, replyId: number) {
    if (!confirm('Delete this reply?')) return;

    comment.replies = comment.replies?.filter(r => r.id !== replyId);
    this.commentService.updateComments(this.comments);
  }
}
