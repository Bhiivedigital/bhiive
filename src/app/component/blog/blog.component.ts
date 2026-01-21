import { Component } from '@angular/core';
import { ServicebannerComponent } from '../servicepage/servicebanner/servicebanner.component';
import { RouterLink } from "@angular/router";
import { BlogdetailsComponent } from './blogdetails/blogdetails.component';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [ServicebannerComponent, RouterLink],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent {

}
