import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryService } from 'src/app/modules/shared/services/category.service';

export interface CategoryElement {
  id: number,
  name: string;
  description: string;
}


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'description', 'actions'];
  dataSource = new MatTableDataSource<CategoryElement>();

  constructor(
    private _categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.getCategories();
  }


  getCategories() {
    this._categoryService.getCategories().subscribe(data => {
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

}
