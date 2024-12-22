import { Component, inject, OnInit } from '@angular/core';
import { LoginUseCase } from '../../use-cases/login.use-case';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { IonContent, NavController } from '@ionic/angular/standalone';
import { SpinnerComponent } from '../../../ui/spinner/spinner.component';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, IonContent, SpinnerComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  private fb = inject(FormBuilder);
  private login = inject(LoginUseCase);
  private router = inject(NavController);
  
  errorMessage = '';
  isLoading = false;
  formulario: FormGroup;

  constructor() {
    this.formulario = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(6)
      ]]
    });
  }

  ngOnInit(): void {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      this.router.navigateForward(['/dashboard']);
    }
  }

  get emailError() {
    const control = this.formulario.get('email');
    return control?.errors && control.touched;
  }

  get passwordError() {
    const control = this.formulario.get('password');
    return control?.errors && control.touched;
  }

  protected send() {
    if (this.formulario.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      
      const email = this.formulario.get('email')?.value;
      const password = this.formulario.get('password')?.value;

      if (email && password) {
        this.login.execute({ email, password }).subscribe({
          next: (response) => {
            localStorage.setItem('currentUser', JSON.stringify(response));
            this.router.navigateForward(['/dashboard']);
          },
          error: (error) => {
            this.errorMessage = 'Credenciales inválidas';
            console.error('Error en login:', error);
            this.isLoading = false; // Ensure loading state is stopped on error
          },
          complete: () => {
            this.isLoading = false;
          }
        });
      }
    } else {
      // Mark all fields as touched to show errors
      Object.keys(this.formulario.controls).forEach(key => {
        this.formulario.get(key)?.markAsTouched();
      });
    }
  }

  navigateTo() {
    this.formulario.reset(); // Reset form without marking it as touched
    this.router.navigateForward(['/auth/register'],{
      animated: true,
      animationDirection: 'forward',
    })
  }
}
