import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BillService } from 'src/app/services/bill/bill.service';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constant';

@Component({
  selector: 'app-view-bill',
  templateUrl: './view-bill.component.html',
  styleUrls: ['./view-bill.component.scss'],
})
export class ViewBillComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'email',
    'contactNumber',
    'paymentMethod',
    'total',
    'view',
  ];
  dataSource: any;
  responseMessage: any;

  constructor(
    private _billService: BillService,
    private _snackbarService: SnackbarService,
    private _dialog: MatDialog,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.tableData();
  }

  tableData() {
    this._billService.getBills().subscribe(
      (response: any) => {
        this.dataSource = new MatTableDataSource(response);
      },
      (error: any) => {
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
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  handleViewAction(values: any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      data: values
    }
    dialogConfig.width = '100%';
  }
}
