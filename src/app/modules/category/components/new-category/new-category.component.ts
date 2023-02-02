import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from 'src/app/modules/shared/services/category.service';
import { CategoryElement } from '../../../shared/interfaces/category.interface';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.css']
})
export class NewCategoryComponent implements OnInit {
  public categoryForm: FormGroup;
  estadoFormulario: string = '';

  constructor(
    private fb: FormBuilder,
    private _categoryService: CategoryService,
    private dialogRef: MatDialogRef<NewCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public dataUpdate: CategoryElement // Se recibe desde el componente padre(category.component.ts) los datos corrrespondientes
  ) {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Verificar si existe valor en 'datas' para llamar al metodo para actualizar
    this.dataUpdate != null ? (
      this.updateForm(this.dataUpdate),
      this.estadoFormulario = 'Actualizar'
    ) : this.estadoFormulario = 'Agregar Nueva'
  }

  onSave() {
    let data: CategoryElement = {
      name: this.categoryForm.get('name')?.value,
      description: this.categoryForm.get('description')?.value
    };

    // Verificar si dataUpdate tiene dato para actualizar, sino almacenar nueva categoria
    this.dataUpdate !== null ? (
      // actualizar registro
      this._categoryService.updateCategory(data, this.dataUpdate.id).subscribe(() => {
        this.dialogRef.close(1);
      }, (error) => {
        this.dialogRef.close(2);
      })
    )
      : (
        // nuevo registro
        this._categoryService.saveCategory(data).subscribe(() => {
          this.dialogRef.close(1);
        }, (error) => {
          this.dialogRef.close(2);
        })
      )
  }

  onCancel() {
    this.dialogRef.close(3);
  }

  updateForm(data: any) {
    this.categoryForm.setValue({
      name: data.name,
      description: data.description
    })
  }

}
