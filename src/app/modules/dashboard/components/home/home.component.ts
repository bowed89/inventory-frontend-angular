import { Component, OnInit } from '@angular/core';
import { ProductElement } from 'src/app/modules/shared/interfaces/product.interface';
import { ProductService } from 'src/app/modules/shared/services/product.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  chartBar: any;
  chartDoughnut: any;

  constructor(
    private _productServices: ProductService,
  ) { }

  ngOnInit(): void {
    this.getProducts()
  }

  getProducts() {
    this._productServices.getProducts().subscribe((data: object) => {
      this.processProductResponse(data);
    }, (error) => {
      console.log(error);
    });
  }

  processProductResponse(res: any) {
    const { metadata, product: { products } } = res;
    let nameProduct: String[] = [];
    let account: number[] = [];

    metadata[0].code === "00" && (
      products.map((element: ProductElement) => {
        nameProduct = [...nameProduct, element.name];
        account = [...account, element.account];
      }),
      // Grafico Barras
      this.chartBar = new Chart('canvas-bar', {
        type: 'bar',
        data: {
          labels: nameProduct,
          datasets: [{ label: 'Productos', data: account }]
        }
      }),
      // Grafico Donas
      this.chartDoughnut = new Chart('canvas-doughnut', {
        type: 'doughnut',
        data: {
          labels: nameProduct,
          datasets: [{ label: 'Productos', data: account }]
        }
      }));
  }

}
