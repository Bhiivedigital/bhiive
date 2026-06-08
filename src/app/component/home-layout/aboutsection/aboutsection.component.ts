import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CharAnimationDirective } from '../../shared/directives/char-animation.directive';
import { ScrollAnimateDirective } from '../../shared/directives/scroll-animate.directive';

@Component({
  selector: 'app-aboutsection',
  standalone: true,
  imports: [TranslateModule, ScrollAnimateDirective, CharAnimationDirective],
  templateUrl: './aboutsection.component.html',
  styleUrl: './aboutsection.component.scss'
})
export class AboutsectionComponent {
 constructor(private translate:TranslateService){
   translate.setDefaultLang('en');
   translate.use('en')
 }
}
