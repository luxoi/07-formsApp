import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as customValidators from '../../../shared/validators/validators';
import { ValidatorsService } from '../../../shared/service/validators.service';
import { EmailValidatorService } from '../../../shared/validators/email.validator-service';

@Component({
  templateUrl: './register-page.component.html',
  styles: ``
})
export class RegisterPageComponent {

  public myForm: FormGroup;

  constructor(private fb: FormBuilder,
              private validaroService: ValidatorsService,
              private emailValidatorService: EmailValidatorService,
  ) {
    this.myForm = this.fb.group({
      name: ['',     [Validators.required, Validators.pattern(this.validaroService.firstNameAndLastnamePattern) ] ],
      email: ['',    [Validators.required, Validators.pattern(this.validaroService.emailPattern)], [this.emailValidatorService]],
      username: ['', [Validators.required, this.validaroService.cantBeStrider ]],
      password: ['', [Validators.required, Validators.minLength(6) ]],
      password2: ['', [Validators.required ]],
    }, {
      validators: [
        this.validaroService.isFieldOneEqualFieldTwo('password', 'password2'),
      ]
    });
  }

  isValidField(field: string){
   return this.validaroService.isValidField(this.myForm, field);
  }

  onSubmit(){
    this.myForm.markAllAsTouched();
  }


}
