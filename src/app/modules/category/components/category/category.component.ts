import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from 'src/app/modules/shared/services/category.service';

import { CategoryElement } from '../../../shared/interfaces/category.interface';
import { NewCategoryComponent } from '../new-category/new-category.component';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'description', 'actions'];
  dataSource = new MatTableDataSource<CategoryElement>();

  constructor(
    private _categoryService: CategoryService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this._categoryService.getCategories().subscribe((data: object) => {
      this.processCategoriesResponse(data);
    }, (error) => {
      console.log("Error => ", error);

    })
  }

  processCategoriesResponse(resp: any) {
    const { metadata, categoryResponse } = resp;
    let dataCategory: CategoryElement[] = [];
    let listCategory;

    metadata[0].code === "00" && (
      listCategory = categoryResponse.category,
      listCategory.map((element: CategoryElement) => dataCategory = [...dataCategory, element]),
      this.dataSource = new MatTableDataSource<CategoryElement>(dataCategory));
  }

  openCategoryDialog() {
    const dialogRef = this.dialog.open(NewCategoryComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe((result: number) => {
      result === 1 ? (this.openSnackBar('Categoría Agregada', "Exitosa"), this.getCategories())
        : result === 2 && this.openSnackBar('Se produjo un error al almacenar categoría', "Error")
    });
  }

  openSnackBar(message: string, action: string): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: 2000
    });
  }

}