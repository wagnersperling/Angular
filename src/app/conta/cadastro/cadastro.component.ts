import { ValidationMessages, GenericValidator, DisplayMessage } from './../../utils/generic-form-validation';
import { Usuario } from './../models/usuario';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormControlName } from '@angular/forms';
import { ContaService } from '../services/conta.service';
import { CustomValidators } from 'ng2-validation';
import { fromEvent, merge, Observable } from 'rxjs';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html'
})
export class CadastroComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, {read: ElementRef})
  formInputElements: ElementRef[];

  errors: any[] = [];
  cadastroForm: FormGroup;
  usuario: Usuario;

  validationMessages: ValidationMessages;
  genericValidator: GenericValidator;
  displayMessage: DisplayMessage = {};

  constructor(private fb: FormBuilder,
    private contaService: ContaService) {

      this.validationMessages = {
        email: {
          required: 'Informe o e-mail',
          email: 'Email inválido'
        },
        password: {
          required: 'Informe a senha',
          rangeLength: 'A senha deve possuir entre 6 e 15 caracteres'
        },
        confirmPassword: {
          required: 'Informe a senha novamente',
          rangeLength: 'A senha deve possuir entre 6 e 15 caracteres',
          equalTo: 'As senhas não conferem'
        }
      };
      this.genericValidator = new GenericValidator(this.validationMessages);
     }

  ngOnInit(): void {
    let senha = new FormControl('', [Validators.required, CustomValidators.rangeLength([6, 15])]);
    let senhaConfirm = new FormControl('', [Validators.required, CustomValidators.rangeLength([6, 15]), CustomValidators.equalTo(senha)]);


    this.cadastroForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: senha,
        confirmPassword: senhaConfirm
      });
  }

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((FormControl: ElementRef) => fromEvent(FormControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidator.processarMensagens(this.cadastroForm);
    });
  }

  adicionarConta(){
    if(this.cadastroForm.dirty && this.cadastroForm.valid){
      this.usuario = Object.assign({}, this.usuario, this.cadastroForm.value);

      this.contaService.registrarUsuario(this.usuario);
    }
  }
}
