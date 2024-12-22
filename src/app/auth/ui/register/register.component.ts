import { Component, inject } from '@angular/core';
import { RegisterUseCase } from '../../use-cases/register.use-case';


import { 
  FormBuilder, 
  ReactiveFormsModule, 
  Validators, 
  AbstractControl, 
  ValidationErrors, 
  FormGroup
} from '@angular/forms';
import { NgIf } from '@angular/common';
import { IonContent, NavController } from '@ionic/angular/standalone';
import { SpinnerComponent } from '../../../ui/spinner/spinner.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, IonContent, SpinnerComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  private register = inject(RegisterUseCase);
  private router = inject(NavController);
  private fb = inject(FormBuilder);

  protected formulario: FormGroup;
  isLoading = false;

  constructor(){
    this.formulario = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      apellidos: ['', [Validators.required, Validators.minLength(2)]],
      nickname: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required, 
        Validators.minLength(6),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/) // Al menos una mayúscula, una minúscula y un número
      ]],
      passwordConfirmacion: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  // Validador personalizado para confirmar contraseña
  private passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('passwordConfirmacion');
    
    return password && confirmPassword && password.value !== confirmPassword.value ? 
      { passwordMismatch: true } : null;
  }

  // Getters para facilitar la validación en el template
  get emailError() {
    const control = this.formulario.get('email');
    return control?.errors && control.touched;
  }

  get passwordError() {
    const control = this.formulario.get('password');
    return control?.errors && control.touched;
  }

  get passwordMismatch() {
    return this.formulario.errors?.['passwordMismatch'] && 
           this.formulario.get('passwordConfirmacion')?.touched;
  }

  protected send() {
    if (this.formulario.valid) {
      this.isLoading = true;
      const { name, apellidos, nickname, email, password } = this.formulario.value;
      
      if (name && apellidos && nickname && email && password) {
        const userData = {
          name: `${name} ${apellidos}`.trim(),
          nickname,
          email,
          password
        };

        this.register.execute(userData).subscribe({
          next: () => {
            this.isLoading = false;
            this.router.navigateForward(['/auth/login']);
          },
          error: (error) => {
            this.isLoading = false;
            console.error('Error al registrar:', error);
            // Aquí podrías añadir una notificación al usuario
          }
        });
      }
    } else {
      // Marcar todos los campos como tocados para mostrar errores
      Object.keys(this.formulario.controls).forEach(key => {
        this.formulario.get(key)?.markAsTouched();
      });
    }
  }

  navigateTo() {
    this.formulario.reset(); // Reiniciar el formulario sin marcarlo como tocado
    this.router.navigateBack(['auth/login']);
  }
}
