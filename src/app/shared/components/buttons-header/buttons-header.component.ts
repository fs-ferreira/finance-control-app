import { Component, Input } from '@angular/core';
export interface ButtonModel {
  link?: string;
  icon?: string;
}

@Component({
  selector: 'app-buttons-header',
  templateUrl: './buttons-header.component.html',
})
export class ButtonsHeaderComponent {
  @Input('buttons')
  buttons: ButtonModel[] = [];
}
