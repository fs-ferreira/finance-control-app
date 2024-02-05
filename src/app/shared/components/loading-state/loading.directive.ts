import {
  Directive,
  ElementRef,
  HostBinding,
  Inject,
  Input,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import { uuidv4 } from '../../utils/utils';
import { DOCUMENT } from '@angular/common';

@Directive({
  selector: '[appLoading]',
})
export class LoadingDirective {
  @HostBinding('style.position')
  hostPosition: string = 'relative';

  @Input() appLoading: boolean = false;

  uid: string;

  constructor(
    private targetEl: ElementRef,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit() {
    const theme = this.document.getElementById('app-theme') as HTMLLinkElement;
    let bgColor;
    if (theme.href.includes('saga-blue')) {
      bgColor = 'rgba(0, 0, 0, 0.1)';
    } else {
      bgColor = 'rgba(255, 255, 255, 0.1)';
    }

    this.uid = 'loading-container-' + uuidv4();

    const loadingContainer = this.renderer.createElement('div');
    this.renderer.setStyle(
      loadingContainer,
      'display',
      this.appLoading ? 'flex' : 'none'
    );
    this.renderer.setStyle(loadingContainer, 'justify-content', 'center');
    this.renderer.setStyle(loadingContainer, 'align-items', 'center');
    this.renderer.addClass(loadingContainer, this.uid);
    this.renderer.setStyle(loadingContainer, 'position', 'absolute');
    this.renderer.setStyle(loadingContainer, 'top', '0');
    this.renderer.setStyle(loadingContainer, 'background', bgColor);
    this.renderer.setStyle(loadingContainer, 'width', '100%');
    this.renderer.setStyle(loadingContainer, 'height', '100%');

    const spinnerContainer = this.renderer.createElement('div');
    this.renderer.addClass(spinnerContainer, 'lds-ring');
    const spinnerInnerDiv1 = this.renderer.createElement('div');
    const spinnerInnerDiv2 = this.renderer.createElement('div');
    const spinnerInnerDiv3 = this.renderer.createElement('div');

    this.renderer.appendChild(spinnerContainer, spinnerInnerDiv1);
    this.renderer.appendChild(spinnerContainer, spinnerInnerDiv2);
    this.renderer.appendChild(spinnerContainer, spinnerInnerDiv3);

    this.renderer.appendChild(loadingContainer, spinnerContainer);

    this.renderer.appendChild(this.targetEl.nativeElement, loadingContainer);
  }

  ngOnChanges(simpleChanges: SimpleChanges) {
    if (simpleChanges.appLoading) {
      const container = this.targetEl.nativeElement;
      const div = container.querySelector('.' + this.uid);
      if (div) {
        this.renderer.setStyle(
          div,
          'display',
          this.appLoading ? 'flex' : 'none'
        );
      }
    }
  }
}
