import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CategoryElement } from '../../shared/interfaces/category.interface';

const BASE_URL = environment.BASE_URL;

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private http: HttpClient
  ) { }

  // Obtener todas las categorias
  getCategories() {
    const endpoint = `${BASE_URL}/categories`;
    return this.http.get(endpoint);
  }

  // Almacenar Categorias
  saveCategory(body: CategoryElement) {
    const endpoint = `${BASE_URL}/categories`;
    return this.http.post(endpoint, body);

  }

}
