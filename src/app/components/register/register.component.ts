import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserData } from '../../interfaces/user-data.interface';
import { AuthService } from '../../_core/_services/auth.service';
import ConfirmPassword from './confirmPassword.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  register: FormGroup;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.register = new FormGroup(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),
        repeatPassword: new FormControl('', Validators.required),
        markAll: new FormControl(false),
        regul: new FormControl(false, Validators.requiredTrue),
        privacy: new FormControl(false, Validators.requiredTrue),
        marketing: new FormControl(false),
      },
      {
        validators: [ConfirmPassword.match('password', 'repeatPassword')],
      }
    );
  }

  acceptAll() {
    const isMarked = !this.register.get('markAll')?.value;
    this.register.patchValue({
      regul: isMarked,
      privacy: isMarked,
      marketing: isMarked,
    });
  }

  submit() {
    if (this.register.valid) {
      const registerData = { ...this.register.value };
      const userData: UserData = {
        email: registerData.email,
        password: registerData.password,
      };
      this.auth.register(userData).subscribe(
        () => {
          alert('Wysłany!');
        },
        () => {
          alert('Wystąpił błąd');
        }
      );
      this.register.reset();
    } else {
      this.register.markAllAsTouched();
    }
  }
}
