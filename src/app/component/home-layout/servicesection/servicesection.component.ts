import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { LineclampPipe } from '../../shared/lineclamp.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-servicesection',
  standalone: true,
  imports: [RouterLink, LineclampPipe, CommonModule],
  templateUrl: './servicesection.component.html',
  styleUrl: './servicesection.component.scss'
})
export class ServicesectionComponent {
  services = [
    {
      title: 'Website Development',
      description:
        'Build responsive, SEO-optimized websites that perform across devices and drive engagement. From corporate sites to e-commerce stores, we develop secure, scalable solutions tailored to your business goals.',
        img:'assets/img/service/icon-01.png',
        cardClass: 'service-card-items border-radius-style'
    },
     {
      title: 'Digital Marketing',
      description:
        'Comprehensive digital marketing services in Chennai that include SEO, content marketing, social media marketing, and analytics — all designed to boost your brand visibility and attract targeted traffic.',
      img:'assets/img/service/icon-02.png',
      cardClass:'service-card-items bg-1'

      },

    {
      title: 'Paid Advertising',
      img:'assets/img/service/icon-03.png',
      description:
        'Launch high-impact paid campaigns on Google Ads, Facebook & Instagram to increase leads, sales, and revenue through hyper-targeted advertising strategies....',
      cardClass:'service-card-items bg-2'
    },
     {
      title: 'Brand Building',
      img:'assets/img/service/icon-04.png',
      description:
        'Elevate your brand with tailored strategy, audience research, and creative campaigns that strengthen your online presence and drive loyalty.',
      cardClass:'service-card-items bg-3'
    }
  ];
}
