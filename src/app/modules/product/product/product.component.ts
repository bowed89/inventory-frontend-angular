import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProductElement } from '../../shared/interfaces/product.interface';
import { ProductService } from '../../shared/services/product.service';
import { UtilService } from '../../shared/services/util.service';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { NewProductComponent } from '../new-product/new-product.component';
import { ConfirmComponent } from '../../shared/components/confirm/confirm.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'price', 'account', 'category', 'picture', 'actions'];
  dataSource = new MatTableDataSource<ProductElement>();
  isAdmin: Boolean = false;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  constructor(
    private _productServices: ProductService,
    private _util: UtilService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getProducts();
    this.isAdmin = this._util.isAdmin();
  }

  getProducts() {
    this._productServices.getProducts().subscribe((data: object) => {
      this.processProductResponse(data)

    }, (error) => {
      console.log(error);
    });
  }

  processProductResponse(res: any) {
    const { metadata, product: { products } } = res;
    let dateProduct: ProductElement[] = [];

    metadata[0].code === "00" && (
      products.map((element: ProductElement) => {
        //element.category = element.category.name;
        element.picture = `data:image/jpeg;base64,${element.picture}`;
        dateProduct = [...dateProduct, element];
      }),
      this.dataSource = new MatTableDataSource<ProductElement>(dateProduct),
      this.dataSource.paginator = this.paginator)
  }

  openProductDialog() {
    const dialogRef = this.dialog.open(NewProductComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe((result: number) => {
      result === 1 ? (this.openSnackBar('Producto Agregada', "Exitosa"), this.getProducts())
        : result === 2 && this.openSnackBar('Se produjo un error al almacenar el producto', "Error")
    });
  }

  openSnackBar(message: string, action: string): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: 2000
    });
  }

  edit(product: ProductElement) {
    const { id, name, price, account, category, picture } = product;
    const dialogRef = this.dialog.open(NewProductComponent, {
      width: '450px',
      data: { id, name, price, account, category, picture }
    });

    dialogRef.afterClosed().subscribe((result: number) => {
      result === 1 ? (this.openSnackBar('Producto Modificado', "Exitosa"), this.getProducts())
        : result === 2 && this.openSnackBar('Se produjo un error al modificar el producto', "Error")
    });
  }

  delete(id: number) {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '200px',
      data: { id, module: "product" }
    });

    dialogRef.afterClosed().subscribe((result: number) => {
      result === 1 ? (this.openSnackBar('Producto Eliminada', "Exitosa"), this.getProducts())
        : result === 2 && this.openSnackBar('Se produjo un error al eliminar el producto', "Error")
    });
  }

  exportExcel() {
    this._productServices.exportProducts().subscribe(res => {
      let file = new Blob([res], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      let fileUrl = URL.createObjectURL(file);
      let anchor = document.createElement("a");
      anchor.download = "products.xlsx";
      anchor.href = fileUrl;
      anchor.click();

      this.openSnackBar("Archivo exportado correctamente", "Exito");

    }, (error) => {
      console.log(error);
      this.openSnackBar("No se pudo exportar el archivo", "Error");

    });
  }

  buscar(nombre: any) {
    nombre.length === 0 ? this.getProducts()
      : this._productServices.getProductByName(nombre).subscribe((data: any) => {
        this.processProductResponse(data);
      })

  }

}
