import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicebannerComponent } from "../servicepage/servicebanner/servicebanner.component";

@Component({
  selector: 'app-careerdetails',
  standalone: true,
  imports: [CommonModule, ServicebannerComponent],
  templateUrl: './careerdetails.component.html',
  styleUrl: './careerdetails.component.scss'
})
export class CareerdetailsComponent {

  job: any;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');

    this.http.get<any[]>('../assets/careers.json')
      .subscribe(data => {
        this.job = data.find(j => j.slug === slug);
      });
  }
}
