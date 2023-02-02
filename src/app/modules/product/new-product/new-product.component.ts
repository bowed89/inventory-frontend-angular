import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from '../../shared/services/product.service';
import { CategoryService } from 'src/app/modules/shared/services/category.service';
import { ProductElement } from '../../shared/interfaces/product.interface';
import { CategoryElement } from '../../shared/interfaces/category.interface';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  public productForm: FormGroup;
  estadoFormulario: string = '';
  categories: CategoryElement[] = [];
  selectedFile: any;
  nameImg: string = "";

  constructor(
    private fb: FormBuilder,
    private _categoryService: CategoryService,
    private _productService: ProductService,
    private dialogRef: MatDialogRef<NewProductComponent>,
    @Inject(MAT_DIALOG_DATA) public dataUpdate: ProductElement // Se recibe desde el componente padre(category.component.ts) los datos corrrespondientes
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      account: ['', Validators.required],
      category: ['', Validators.required],
      picture: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getCategories();
    this.estadoFormulario = 'Agregar Nuevo'
    // Verificar si existe valor en 'datas' para llamar al metodo para actualizar
    /* this.dataUpdate != null ? (
      this.updateForm(this.dataUpdate),
      this.estadoFormulario = 'Actualizar'
    ) : this.estadoFormulario = 'Agregar Nuevo' */
  }

  onSave() {
    let data: ProductElement = {
      name: this.productForm.get('name')?.value,
      price: this.productForm.get('price')?.value,
      account: this.productForm.get('account')?.value,
      category: this.productForm.get('category')?.value,
      picture: this.selectedFile
    };

    const uploadImageData = new FormData();
    uploadImageData.append('picture', data.picture, data.picture.name),
    uploadImageData.append('name', data.name),
    uploadImageData.append('price', data.price),
    uploadImageData.append('account', data.account),
    uploadImageData.append('categoryId', data.category)

    console.log(uploadImageData);
    

    // Guardar producto
    this._productService.saveProduct(uploadImageData).subscribe(() => {
      this.dialogRef.close(1);
    }, (error) => {
      this.dialogRef.close(2);
    })


  }

  onCancel() {
    this.dialogRef.close(3);
  }

  getCategories() {
    this._categoryService.getCategories()
      .subscribe(({ categoryResponse: { category } }: any) => {
        this.categories = category;
      })
  }

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
    this.nameImg = event.target.files[0].name;


  }

}
