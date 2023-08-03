import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user/user.service';
import { SnackbarService } from '../services/snackbar/snackbar.service';
import { MatDialogRef } from '@angular/material/dialog';
import { GlobalConstants } from '../shared/global-constant';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm: any = FormGroup;
  responseMessage: any;
  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _userService: UserService,
    private _snackBarService: SnackbarService,
    private dialogRef: MatDialogRef<SignupComponent>
  ) {}

  ngOnInit(): void {
    this.signupForm = this._formBuilder.group({
      name: [
        null,
        [Validators.required, Validators.pattern(GlobalConstants.nameRegex)],
      ],
      email: [
        null,
        [Validators.required, Validators.pattern(GlobalConstants.emailRegix)],
      ],
      contactNumber: [
        null,
        [
          Validators.required,
          Validators.pattern(GlobalConstants.contactNumberRegex),
        ],
      ],
      password: [null, [Validators.required]],
    });
  }

  handleSubmit() {
    var formData = this.signupForm.value;
    var data = {
      name: formData.name,
      email: formData.email,
      contactNumber: formData.contactNumber,
      password: formData.password,
    };
    this._userService.signUp(data).subscribe(
      (response: any) => {
        this.dialogRef.close();
        this.responseMessage = response?.message;
        this._snackBarService.openSnackBar(this.responseMessage, '');
        this._router.navigate(['/']);
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
