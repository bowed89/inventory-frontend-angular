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
  showImg: any;

  imgUpload: any;

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
    // Verificar si existe valor en 'dataUpdate' para llamar al metodo para actualizar
    this.dataUpdate !== null ? (


      console.log(this.dataUpdate),
      this.updateForm(this.dataUpdate),
      this.estadoFormulario = 'Actualizar'
    ) : this.estadoFormulario = 'Agregar Nuevo'
  }

  onSave() {
    const uploadImageData = new FormData()
    let data: ProductElement = {
      name: this.productForm.get('name')?.value,
      price: this.productForm.get('price')?.value,
      account: this.productForm.get('account')?.value,
      category: this.productForm.get('category')?.value,
      picture: this.selectedFile
    };

    // Preguntar si es dataUpdate tiene valores para modificar
    this.dataUpdate !== null ?
      (   // si data.picture es undefined, es porque el usuario no actualizo su imagen y se mantiene la misma img convirtiendo de base64 a File
        data.picture === undefined && (data.picture = this.base64ToFile(this.productForm.value.picture, "image.jpg")),

        uploadImageData.append('picture', data.picture, data.picture.name),
        uploadImageData.append('name', data.name),
        uploadImageData.append('price', data.price),
        uploadImageData.append('account', data.account),
        uploadImageData.append('categoryId', data.category),
        // Modificar producto
        this._productService.updateProduct(uploadImageData, this.dataUpdate.id).subscribe(() => {
          this.dialogRef.close(1);
        }, (error) => {
          this.dialogRef.close(2);
        })
      )
      :
      (
        // Guardar producto
        uploadImageData.append('picture', data.picture, data.picture.name),
        uploadImageData.append('name', data.name),
        uploadImageData.append('price', data.price),
        uploadImageData.append('account', data.account),
        uploadImageData.append('categoryId', data.category),

        this._productService.saveProduct(uploadImageData).subscribe(() => {
          this.dialogRef.close(1);
        }, (error) => {
          this.dialogRef.close(2);
        })
      )
  }

  updateForm(data: ProductElement) {
    const { name, price, account, category, picture } = data;
    this.showImg = picture;
    this.productForm.patchValue({ name, price, account, picture, category: category.id });
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
    this.productForm.patchValue({ picture: this.imgUpload });
    this.selectedFile = event.target.files[0];
    // llamar al metodo para convertir a base64 y mostrar en pantalla
    this.fileToBase64(event.target.files[0]);
  }

  base64ToFile(dataurl: any, filename: any) {
    let arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  fileToBase64(file: File) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.showImg = reader.result;
    }
  }



}
