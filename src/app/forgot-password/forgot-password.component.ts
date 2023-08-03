import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../services/user/user.service';
import { SnackbarService } from '../services/snackbar/snackbar.service';
import { GlobalConstants } from '../shared/global-constant';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: any = FormGroup;
  responseMessage: any;
  constructor(
    private dialogRef: MatDialogRef<ForgotPasswordComponent>,
    private _formBuilder: FormBuilder,
    private _userService: UserService,
    private _snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.forgotPasswordForm = this._formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(GlobalConstants.emailRegix)]]
    });
  }

  handleSubmit(){
    var formData = this.forgotPasswordForm.value;
    var data = {
      email: formData.email
    }
    this._userService.forgotPassword(data).subscribe((response: any)=>{
      this.responseMessage = response?.message;
      this.dialogRef.close();
      this._snackbarService.openSnackBar(this.responseMessage, '');
    }, (error)=>{
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      }else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this._snackbarService.openSnackBar(this.responseMessage, '');
    });
  }
}
