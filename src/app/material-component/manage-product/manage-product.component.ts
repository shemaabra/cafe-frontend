import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product/product.service';
import { MatTableDataSource } from '@angular/material/table';

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
        console.log(this.dataSource);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
