import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private renderer: Renderer2;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private rendererFac: RendererFactory2
  ) {
    this.renderer = this.rendererFac.createRenderer(null, null);
  }

  switchTheme(themeName: string, backgroundColor: string): void {
    const theme = this.document.getElementById('app-theme') as HTMLLinkElement;
    if (theme) {
      this.renderer.setStyle(document.body, 'background-color', backgroundColor);
      theme.href = themeName + '.css';
    }
  }
}
