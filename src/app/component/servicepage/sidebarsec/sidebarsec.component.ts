import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { BlogformComponent } from '../../blog/blogform/blogform.component';

@Component({
  selector: 'app-sidebarsec',
  standalone: true,
  imports: [RouterLink,BlogformComponent],
  templateUrl: './sidebarsec.component.html',
  styleUrl: './sidebarsec.component.scss'
})
export class SidebarsecComponent {

}
