import { Component, inject, OnInit } from '@angular/core';
import { LoginUseCase } from '../../use-cases/login.use-case';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ILoginUser } from '../../Models/AuthUser.model';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  private fb = inject(FormBuilder);
  private login = inject(LoginUseCase);
  private router = inject(Router);
  
  errorMessage = '';
  isLoading = false;

  formulario = this.fb.group({
    email: ['', [
      Validators.required,
      Validators.email
    ]],
    password: ['', [
      Validators.required,
      Validators.minLength(6)
    ]]
  });

  ngOnInit(): void {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      this.router.navigate(['/dashboard']);
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
            this.router.navigate(['/dashboard']);
          },
          error: (error) => {
            this.errorMessage = 'Credenciales inválidas';
            console.error('Error en login:', error);
          },
          complete: () => {
            this.isLoading = false;
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
    this.router.navigate(['/auth/register']);
  }
}