import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-form-footer',
  template: `
    <div class="flex justify-content-end p-1">
      <button
        pButton
        pRipple
        type="button"
        class="mx-1 p-button-secondary"
        label="Limpar"
        (click)="onReset()"
      ></button>
      <button
        pButton
        pRipple
        type="button"
        class="mx-1"
        label="Salvar"
        [disabled]="isSubmiting || resourceForm.invalid"
        type="submit"
      ></button>
    </div>
  `,
})
export class FormFooterComponent {
  @Input() onReset;
  @Input() isSubmiting;
  @Input() resourceForm;
}
