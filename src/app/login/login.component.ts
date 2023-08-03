import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalConstants } from '../shared/global-constant';
import { UserService } from '../services/user/user.service';
import { SnackbarService } from '../services/snackbar/snackbar.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  responseMessage: any;
  loginForm:any = FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _userService: UserService,
    private _snackBarService: SnackbarService,
    private _router: Router,
    private dialogRef: MatDialogRef<LoginComponent>,) { }

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      email: [
        null,
        [Validators.required, Validators.pattern(GlobalConstants.emailRegix)],
      ],
      password: [null, [Validators.required]],
    });
  }

  handleSubmit() {
    var formData = this.loginForm.value;
    var data = {
      email: formData.email,
      password: formData.password,
    };
    this._userService.login(data).subscribe(
      (response: any) => {
        this.dialogRef.close();
        localStorage.setItem('token', response.token)
        this._snackBarService.openSnackBar("Your Successfull login..!", '');
        this._router.navigate(['/cafe/dashboard']);
      },
      (error) => {
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        }
        else {
          this.responseMessage = GlobalConstants.genericError;
        }
        this._snackBarService.openSnackBar(this.responseMessage, GlobalConstants.error);
      }
    );
  }

}
