import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import emailjs from '@emailjs/browser';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Lead {
  name: string;
  email: string;
  mobile: string;
  message?: string;
  /** Which form sent it — lands in the email subject and the CMS record. */
  source: string;
  /** Hidden honeypot input; real visitors leave it empty. */
  honeypot?: string;
}

// Same EmailJS account, service and template the site has always used.
const PUBLIC_KEY = 'bKJipK3m800SQHwLe';
const SERVICE_ID = 'service_wjjtovg';
const TEMPLATE_ID = 'template_tt1n5xt';

/**
 * Every enquiry is saved in the CMS (Leads) and emailed via EmailJS at the
 * same time. Either one succeeding counts as sent, so an expired email
 * connection or a CMS outage never loses a lead.
 */
@Injectable({ providedIn: 'root' })
export class LeadService {
  private readonly http = inject(HttpClient);

  async send(lead: Lead): Promise<void> {
    if (lead.honeypot) return; // a bot filled the hidden field: drop it quietly

    const page = typeof location !== 'undefined' ? location.href : '';
    const [stored, emailed] = await Promise.allSettled([
      firstValueFrom(this.http.post(`${environment.cmsUrl}/api/leads`, {
        data: {
          name: lead.name,
          email: lead.email,
          phone: lead.mobile,
          message: lead.message || '',
          source: lead.source,
          page,
        },
      })),
      emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          subject: `Website enquiry — ${lead.source}`,
          name: lead.name,
          email: lead.email,
          mobile: lead.mobile,
          message: lead.message || '',
          source: lead.source,
          page,
        },
        { publicKey: PUBLIC_KEY },
      ),
    ]);

    if (stored.status === 'rejected' && emailed.status === 'rejected') {
      throw new Error('Lead could not be stored or emailed');
    }
  }
}
