import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SignupComponent } from '../signup/signup.component';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { LoginComponent } from '../login/login.component';
import { Router } from '@angular/router';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private _dialog: MatDialog,
    private _router: Router,
    private _userService: UserService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('token') != null) {
      this._userService.checkToken().subscribe((response: any)=>{
        this._router.navigate(['/cafe/dashboard']);
      }, (error: any)=> {
        console.log(error);
      });
    }
  }

  signUpAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '550px';
    this._dialog.open(SignupComponent, dialogConfig); 
  }

  forgotPasswordAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '550px';
    this._dialog.open(ForgotPasswordComponent, dialogConfig);
  }

  loginAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '550px';
    this._dialog.open(LoginComponent, dialogConfig);
  }
}
