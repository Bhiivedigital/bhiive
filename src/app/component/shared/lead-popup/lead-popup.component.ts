import { CommonModule } from '@angular/common';
import { Component, HostListener, OnDestroy, OnInit, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { LeadService } from '../../../core/services/lead.service';
import { ServiceCatalog } from '../../../core/services/service-catalog.service';

// Same triggers as the Hunter Property popup: on the homepage, once the visitor
// scrolls a little or after 45 seconds — whichever comes first.
const SCROLL_TRIGGER_PX = 150;
const TIMER_TRIGGER_MS = 45000;
// Shown at most once per browser session (and never again after a submit).
const SEEN_KEY = 'bhiive-lead-popup-seen';

@Component({
  selector: 'app-lead-popup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './lead-popup.component.html',
  styleUrl: './lead-popup.component.scss',
})
export class LeadPopupComponent implements OnInit, OnDestroy {
  isVisible = false;
  submitted = false;
  sending = false;
  sendFailed = false;
  sendSucceeded = false;
  form!: FormGroup;

  readonly services = inject(ServiceCatalog).pillars;

  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly leads = inject(LeadService);
  private readonly sub = new Subscription();
  private isHomeRoute = true;
  private timerId?: ReturnType<typeof setTimeout>;

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email: ['', [Validators.email]],
      service: ['', Validators.required],
    });

    this.sub.add(
      this.router.events.pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd)).subscribe(e => {
        const path = e.urlAfterRedirects.split(/[?#]/)[0];
        this.isHomeRoute = path === '/';
        if (!this.isHomeRoute) this.closePopup();
      }),
    );

    if (!this.alreadySeen()) {
      this.timerId = setTimeout(() => this.triggerPopup(), TIMER_TRIGGER_MS);
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    clearTimeout(this.timerId);
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    if (window.scrollY >= SCROLL_TRIGGER_PX) this.triggerPopup();
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.isVisible) this.closePopup();
  }

  closePopup(): void {
    this.isVisible = false;
    clearTimeout(this.timerId);
  }

  allowOnlyNumbers(event: KeyboardEvent): void {
    if (event.key.length === 1 && !/^[0-9]$/.test(event.key)) event.preventDefault();
  }

  async onSubmit(): Promise<void> {
    this.submitted = true;
    this.sendFailed = false;
    if (this.form.invalid || this.sending) return;

    this.sending = true;
    const { name, mobile, email, service } = this.form.value;
    try {
      // Saved in the CMS (Leads) and emailed via the same EmailJS template.
      await this.leads.send({ name, mobile, email, message: `Interested in: ${service}`, source: 'Lead popup' });
      this.sendSucceeded = true;
      setTimeout(() => this.closePopup(), 4000);
    } catch {
      this.sendFailed = true;
    } finally {
      this.sending = false;
    }
  }

  private triggerPopup(): void {
    if (this.isVisible || !this.isHomeRoute || this.sendSucceeded || this.alreadySeen()) return;
    this.markSeen();
    this.isVisible = true;
  }

  private alreadySeen(): boolean {
    try { return sessionStorage.getItem(SEEN_KEY) === '1'; } catch { return false; }
  }

  private markSeen(): void {
    try { sessionStorage.setItem(SEEN_KEY, '1'); } catch { /* private mode: show once per page load */ }
  }
}
