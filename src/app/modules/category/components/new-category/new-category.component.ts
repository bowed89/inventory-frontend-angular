import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from 'src/app/modules/shared/services/category.service';
import { CategoryElement } from '../../../shared/interfaces/category.interface';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.css']
})
export class NewCategoryComponent implements OnInit {
  public categoryForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _categoryService: CategoryService,
    private dialogRef: MatDialogRef<NewCategoryComponent>
  ) {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onSave() {
    let data: CategoryElement = {
      name: this.categoryForm.get('name')?.value,
      description: this.categoryForm.get('description')?.value
    }

    this._categoryService.saveCategory(data).subscribe(data => {
      console.log(data);
      this.dialogRef.close(1);
    }, (error) => {
      this.dialogRef.close(2);
    });
  }

  onCancel() {
    this.dialogRef.close(3);
  }

}
