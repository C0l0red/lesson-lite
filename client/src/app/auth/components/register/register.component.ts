import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Role } from '../../../user/models/role.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  readonly roles = [
    { id: Role.STUDENT, label: 'Student' },
    { id: Role.TUTOR, label: 'Tutor' },
  ];
  isSubmitted!: boolean;

  registerForm!: FormGroup;
  constructor(
    private readonly authService: AuthService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.isSubmitted = false;
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      fullName: new FormControl('', [
        Validators.required,
        Validators.pattern(/^([A-Za-z-]{2,}) ([A-Za-z-]{2,})$/),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        ),
      ]),
      role: new FormControl(Role.STUDENT, [Validators.required]),
    });
  }

  get email() {
    return this.registerForm.controls['email'];
  }

  get fullName() {
    return this.registerForm.controls['fullName'];
  }

  get password() {
    return this.registerForm.controls['password'];
  }

  get role() {
    return this.registerForm.controls['role'];
  }

  onSubmit() {
    this.isSubmitted = true;

    if (this.registerForm.valid) {
      this.authService
        .register(this.registerForm.value)
        .subscribe(async (response) => {
          this.registerForm.reset();
          await this.router.navigate(['auth/login']);
        });
      this.isSubmitted = false;
    }
  }
}
