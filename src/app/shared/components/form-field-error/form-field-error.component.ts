import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-field-error',
  template: `
    <div class="text-danger">
      <span>{{ errorMessage }}</span>
    </div>
  `,
})
export class FormFieldErrorComponent {
  @Input()
  formControl: FormControl;

  public get errorMessage(): string | null {
    if (this.hasFormError()) {
      return this.setErrorMessages();
    }
    return null;
  }

  private setErrorMessages(): string | null {
    const errors = this.formControl.errors;
    if (errors.required) {
      return 'Campo obrigatório';
    } else if (errors.minlength) {
      return `O campo precisa ter no mínimo ${errors.minlength.requiredLength} caracteres`;
    } else if (errors.maxlength) {
      return `O campo precisa ter no máximo ${errors.minlength.requiredLength} caracteres`;
    } else if (errors.email) {
      return `O email informado não é válido`;
    }
    return null;
  }

  private hasFormError(): boolean {
    return this.formControl.invalid && this.formControl.dirty;
  }
}
