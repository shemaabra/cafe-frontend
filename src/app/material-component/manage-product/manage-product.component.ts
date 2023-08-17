import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product/product.service';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalConstants } from 'src/app/shared/global-constant';
import { ProductComponent } from '../dialog/product/product.component';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.scss'],
})
export class ManageProductComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'categoryName',
    'description',
    'price',
    'edit',
  ];
  dataSource: any;
  responseMessage: any;

  constructor(
    private _productService: ProductService,
    private _dialog: MatDialog,
    private _snackbarService: SnackbarService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.tableData();
  }

  tableData() {
    this._productService.getProduct().subscribe(
      (response: any) => {
        this.dataSource = new MatTableDataSource(response);
      },
      (error: any) => {
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  handleAddAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Add',
    };
    dialogConfig.width = '850px';
    const dialogRef = this._dialog.open(ProductComponent, dialogConfig);
    this._router.events.subscribe(()=>{
      dialogRef.close();
    });
  }

  handleEditAction(values: any) {}
  handleDeleteAction(values: any) {}
  onChange(status: any, id: any) {}
}
