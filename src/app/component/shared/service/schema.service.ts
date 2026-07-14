import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SchemaService {

  private renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  updateSchema(schema: object) {
    this.removeSchema();

    const script = this.renderer.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'page-schema';
    script.text = JSON.stringify(schema);

    this.renderer.appendChild(document.head, script);
  }

  removeSchema() {
    const existing = document.getElementById('page-schema');
    if (existing) existing.remove();
  }
}