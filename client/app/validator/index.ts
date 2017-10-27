import { NgModule } from '@angular/core';

import { number, NumberValidator } from './number/index';

export const CustomValidators: any = {
  number
};

const CUSTOM_FORM_DIRECTIVES = [
  NumberValidator
];

@NgModule({
  declarations: [CUSTOM_FORM_DIRECTIVES],
  exports: [CUSTOM_FORM_DIRECTIVES]
})
export class CustomFormsModule {
}
