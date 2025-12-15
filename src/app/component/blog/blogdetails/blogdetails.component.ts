import { Component } from '@angular/core';
import { ServicebannerComponent } from '../../servicepage/servicebanner/servicebanner.component';
import { PostCommentComponent } from "../post-comment/post-comment.component";

@Component({
  selector: 'app-blogdetails',
  standalone: true,
  imports: [ServicebannerComponent, PostCommentComponent],
  templateUrl: './blogdetails.component.html',
  styleUrl: './blogdetails.component.scss'
})
export class BlogdetailsComponent {

}
