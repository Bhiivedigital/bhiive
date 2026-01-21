import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LineclampPipe } from '../../shared/lineclamp.pipe';

@Component({
  selector: 'app-testmonial',
  standalone: true,
  imports: [CommonModule, LineclampPipe],
  templateUrl: './testmonial.component.html',
  styleUrl: './testmonial.component.scss'
})
export class TestmonialComponent {
testmonial = [
    {
      name: 'sri makeovers',
      description:'We had an amazing experience working with Bhiive Digi Tech Pvt Ltd for our digital marketing needs. From PPC campaigns to SEO strategies, they handled everything with expertise and delivered outstanding results.',
      img:'assets/img/testimonial/client-info-02.png',
    },
     {
      name:'Hunter Property',
      description:'The best website service I’ve experienced in chennai. Our business saw a 40% increase in leads after launching with Bhiive Digi Tech.',
      img:'assets/img/testimonial/client-info-02.png',
     },
     {
      name:'Chitra judes',
      description:'Great results, though the initial setup phase took a bit longer than expected.',
      img:'assets/img/testimonial/client-info-02.png',
     },
     {
      name:'Pavi Natraj',
      description:'Simple process, excellent results. Will work with them again.',
      img:'assets/img/testimonial/client-info-02.png',
     },
     {
      name:'Linto Wilfared',
      description:'They understood our vision and delivered exactly what we needed',
      img:'assets/img/testimonial/client-info-02.png',
     }
  ];
}
