import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConfirmComponent>,
    private _categoryService: CategoryService,
    private _productService: ProductService,
    @Inject(MAT_DIALOG_DATA) public dataId: any
  ) { }

  ngOnInit(): void {
  }

  delete() {
    this.dataId !== null && this.dataId.module === 'category' ?
      this._categoryService.deleteCategory(this.dataId).subscribe(() => {
        this.dialogRef.close(1);
      })
      : this.dataId !== null && this.dataId.module === 'product' ?
        this._productService.deleteProduct(this.dataId).subscribe(() => {
          this.dialogRef.close(1);
        })
        : this.dialogRef.close(2);
  }

  onNoClick() {
    this.dialogRef.close(3);
  }

}
