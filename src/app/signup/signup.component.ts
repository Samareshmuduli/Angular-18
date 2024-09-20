import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DataService } from '../data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dataService: DataService,
    private toastr: ToastrService
  ) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [
        Validators.required,
        Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/),
        Validators.email
      ]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(32)]],
      confirmPassword: ['', Validators.required]  
    }, {
      validator: this.passwordMatchValidator 
    });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }
  onSignUpSubmit() {
    if (this.signupForm.valid) {
      // Submit form data to the service
      this.dataService.saveUser(this.signupForm.value).subscribe(
        (registerResponse: any) => {
          console.log('Register Response:', registerResponse);

          // Show success toastr notification
          this.toastr.success('Registration Successfull', 'Success');

          // Navigate to personal details page
          this.router.navigate(['login']);
        },
        (error: any) => {
          console.log('Registration Error:', error);

          // Show error toastr notification
          this.toastr.error(error.error.message);
        }
      );
    } else {
      // Mark form controls as touched to show validation errors
      this.signupForm.markAllAsTouched();

      // Show validation error toastr
      // this.toastr.error('please enter name email and password details');
      console.error('Form is invalid');
    }

    console.log('User Data:', this.signupForm.value);
  }
}
