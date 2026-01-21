import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-aboutsection',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './aboutsection.component.html',
  styleUrl: './aboutsection.component.scss'
})
export class AboutsectionComponent {
 constructor(private translate:TranslateService){
   translate.setDefaultLang('en');
   translate.use('en')
 }
}
