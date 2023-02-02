import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProductElement } from '../../shared/interfaces/product.interface';
import { ProductService } from '../../shared/services/product.service';


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

}
