import { Component, AfterViewInit, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard/dashboard.service';
import { GlobalConstants } from '../shared/global-constant';
import { SnackbarService } from '../services/snackbar/snackbar.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements AfterViewInit, OnInit {
  responseMessage: any;
  data: any;

  ngAfterViewInit() {}

  constructor(
    private _dashboardService: DashboardService,
    private _snackbarService: SnackbarService
  ) {}
  ngOnInit(): void {
    this.dashboardData();
  }

  dashboardData() {
    this._dashboardService.getDetails().subscribe(
      (response) => {
        console.log(response);
        this.data = response;
      },
      (error) => {
        console.log(error);
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = GlobalConstants.genericError;
        }
        this._snackbarService.openSnackBar(
          this.responseMessage,
          GlobalConstants.error
        );
      }
    );
  }
}
