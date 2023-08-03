import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category/category.service';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constant';

@Component({
  selector: 'app-manage-category',
  templateUrl: './manage-category.component.html',
  styleUrls: ['./manage-category.component.scss']
})
export class ManageCategoryComponent implements OnInit {
  displayedColumns: string[] = ['name', 'edit'];
  dataSource: any;
  responseMessage: any;
  constructor(
    private _categoryService: CategoryService,
    private _snackbarService: SnackbarService,
    private _dialog: MatDialog,
    private _router: Router
  ) { }

  ngOnInit(): void {
  }

  tableData() {
    this._categoryService.getCategory().subscribe(
      (response: any) => {
        this.dataSource = new MatTableDataSource(response);
      },
      (error) => {
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

  handleAddAction() {}

  handleEditAction(value: any) {}

}
