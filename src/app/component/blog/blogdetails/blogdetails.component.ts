import { Component } from '@angular/core';
import { ServicebannerComponent } from '../../servicepage/servicebanner/servicebanner.component';
import { PostCommentComponent } from "../post-comment/post-comment.component";
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../shared/service/blog.service';
import { CommonModule } from '@angular/common';
import { CanonicalService } from '../../shared/service/canonical.service';
import { BlogformComponent } from '../blogform/blogform.component';

@Component({
  selector: 'app-blogdetails',
  standalone: true,
  imports: [ServicebannerComponent, PostCommentComponent, CommonModule,BlogformComponent],
  templateUrl: './blogdetails.component.html',
  styleUrl: './blogdetails.component.scss'
})
export class BlogdetailsComponent {
  slug: any;
  blogData: any;

  constructor(
    private meta: Meta,
    private route: ActivatedRoute,
    private blogService: BlogService,
    private canonicalService: CanonicalService
  ) {}

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');
    this.canonicalService.setCanonical(`https://bhiive.com/blog/${slug}`);

    this.blogService.getBlogs().subscribe(data => {
      this.blogData = data.find((x: any) => x.slug === slug);
    });
  }
}
