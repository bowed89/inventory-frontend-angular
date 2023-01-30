import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConfirmComponent>,
    private _categoryService: CategoryService,
    @Inject(MAT_DIALOG_DATA) public dataId: number
  ) { }

  ngOnInit(): void {
  }

  delete() {
    this.dataId !== null ?
      this._categoryService.deleteCategory(this.dataId).subscribe(() => {
        this.dialogRef.close(1);
      })
      : this.dialogRef.close(2);
  }

  onNoClick() {
    this.dialogRef.close(3);
  }

}
