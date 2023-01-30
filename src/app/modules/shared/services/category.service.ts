import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CategoryElement } from '../../shared/interfaces/category.interface';

const BASE_URL = environment.BASE_URL;

const options = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
    'key': 'x-api-key',
    'value': 'NNctr6Tjrw9794gFXf3fi6zWBZ78j6Gv3UCb3y0x',
  })  
};

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

  // Actualizar Categorias
  updateCategory(body: CategoryElement, id: any) {
    const endpoint = `${BASE_URL}/categories/${id}`;
    return this.http.put(endpoint, body);
  }

  // Eliminar Categorias
  deleteCategory(id: any) {    
    const endpoint = `${BASE_URL}/categories/${id.id}`;
    return this.http.delete(endpoint);
  }

   // Buscar Categoria por ID
   getCategoryById(id: any) {    
    const endpoint = `${BASE_URL}/categories/${id}`;
    return this.http.get(endpoint);
  }

}
