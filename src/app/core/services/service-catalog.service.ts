import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, firstValueFrom, forkJoin, of } from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { PILLARS, loadPillar } from '../data/site-data';
import type { Pillar, PillarSummary } from '../models/pillar.model';
import { serviceFromCms, serviceListQuery, servicePagesQuery } from '../seo/seo-shared.mjs';

/**
 * The service pages, edited in Strapi ("Service Page" collection).
 *
 * Menus render immediately from the copy bundled with the site
 * (data/pillars/), then switch to the CMS list once it arrives. If the CMS is
 * unreachable, or has no service pages yet, the bundled copy stays in use —
 * so the site never depends on the CMS being up to show its services.
 */
@Injectable({ providedIn: 'root' })
export class ServiceCatalog {
  private readonly http = inject(HttpClient);
  private readonly api = environment.cmsUrl;

  /** Current list for menus, cards and article routing. */
  readonly pillars = signal<PillarSummary[]>(PILLARS);
  private cmsHasServices = false;

  /** Emits once the CMS has answered (or failed): the list to trust from then on. */
  readonly ready$: Observable<PillarSummary[]> = this.http
    .get<any>(`${this.api}/api/service-pages?${serviceListQuery()}`)
    .pipe(
      map(res => (res?.data || []).map((raw: any) => serviceFromCms(raw, this.api)) as PillarSummary[]),
      map(list => {
        if (list.length) {
          this.cmsHasServices = true;
          this.pillars.set(list);
        }
        return this.pillars();
      }),
      catchError(() => of(this.pillars())),
      shareReplay(1),
    );

  constructor() {
    this.ready$.subscribe();
  }

  summary(slug: string): PillarSummary | undefined {
    return this.pillars().find(p => p.slug === slug);
  }

  /**
   * Full page for /:slug. `undefined` means there is no such service (404).
   * The CMS is authoritative once it has service pages; before that (or when
   * it can't be reached) the bundled pages are used.
   */
  async load(slug: string): Promise<Pillar | undefined> {
    const [, page] = await firstValueFrom(forkJoin([
      this.ready$,
      this.http.get<any>(`${this.api}/api/service-pages?${servicePagesQuery(slug)}`).pipe(
        map(res => (res?.data || [])[0] || null),
        catchError(() => of(null)),
      ),
    ]));
    if (page) return serviceFromCms(page, this.api);
    if (this.cmsHasServices) return undefined; // the CMS has services, just not this one
    return loadPillar(slug);
  }
}
