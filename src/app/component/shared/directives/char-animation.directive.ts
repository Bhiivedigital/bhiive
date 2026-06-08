// src/app/component/shared/directives/char-animation.directive.ts
import { Directive, ElementRef, OnInit, NgZone } from '@angular/core';

@Directive({
  selector: '[appCharAnimation]',
  standalone: true
})
export class CharAnimationDirective implements OnInit {
  constructor(private el: ElementRef, private zone: NgZone) {}

  ngOnInit() {
    // Element renders as plain text immediately (LCP records this)
    // Animation class added after first paint
    this.zone.runOutsideAngular(() => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          this.zone.run(() => {
            this.el.nativeElement.classList.add('char-animation-active');
          });
        });
      });
    });
  }
}