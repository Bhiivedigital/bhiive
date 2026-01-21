import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CommentModel } from './comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
// private commentsSubject = new BehaviorSubject<CommentModel[]>(this.loadComments());
//   comments$ = this.commentsSubject.asObservable();

//   constructor() {}

//   private loadComments(): CommentModel[] {
//     const data = localStorage.getItem('comments');
//     return data ? JSON.parse(data) : [];
//   }

//   private saveComments(comments: CommentModel[]) {
//     localStorage.setItem('comments', JSON.stringify(comments));
//   }

//   addComment(comment: CommentModel) {
//     const current = this.commentsSubject.value;
//     const updated = [comment, ...current];

//     this.commentsSubject.next(updated);
//     this.saveComments(updated);  // <-- Important for persistence
//   }
 private commentsSubject = new BehaviorSubject<CommentModel[]>(
    JSON.parse(localStorage.getItem('comments') || '[]')
  );

  comments$ = this.commentsSubject.asObservable();

  updateComments(comments: CommentModel[]) {
    localStorage.setItem('comments', JSON.stringify(comments));
    this.commentsSubject.next(comments);
  }
}
