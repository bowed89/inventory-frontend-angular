import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProductElement } from '../../shared/interfaces/product.interface';
import { ProductService } from '../../shared/services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { NewProductComponent } from '../new-product/new-product.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'price', 'account', 'category', 'picture', 'actions'];
  dataSource = new MatTableDataSource<ProductElement>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  constructor(
    private _productServices: ProductService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getProducts();
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
        element.category = element.category.name;
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

}
