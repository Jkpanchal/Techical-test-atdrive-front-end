import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Productservice {
  constructor(private http: HttpClient) { }

  getProductsList() {
    return this.http.get('http://localhost:8080/api/products/getlist', { observe: 'response' })
  }

  deleteProductList(id: any) {
    return this.http.delete(`http://localhost:8080/api/products/delete/${id}`, { observe: 'response' })
  }

  saveProduct(data: any) {
    return this.http.post('http://localhost:8080/api/products/save', data, { observe: 'response' })
  }

  editProduct(data: any) {
    console.log('data: servcie', data);
    return this.http.put(`http://localhost:8080/api/products/update/${data._id}`, data, { observe: 'response' })
  }
}
