import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserData } from '../../interfaces/user-data.interface';
import { AuthService } from '../../_core/_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  login: FormGroup;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.login = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  submit() {
    if (this.login.valid) {
      const loginData = { ...this.login.value };
      const userData: UserData = {
        email: loginData.email,
        password: loginData.password,
      };
      this.auth.register(userData).subscribe(
        () => {
          alert('Wysłany!');
        },
        () => {
          alert('Wystąpił błąd');
        }
      );
      this.login.reset();
    } else {
      this.login.markAllAsTouched();
    }
  }
}
