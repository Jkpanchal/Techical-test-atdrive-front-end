import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from "@angular/material/table"
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Productservice } from '../service/productservice'

import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { FormDialog } from '../components/form-dialog/form-dialog';
import { WeatherModal } from '../components/weather-modal/weather-modal';

export interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule, MatButtonModule],
  templateUrl: './products.html',
  styleUrls: ['./products.css'],
})
export class Products implements OnInit {

  public displayColumn: string[] = ['action', 'name', 'description', 'price'];
  public products: any;
  readonly dialog = inject(MatDialog);

  constructor(private productService: Productservice) { }

  ngOnInit(): void {
    // this.getProductData()
  }

  getProductData() {
    this.productService.getProductsList().subscribe((Response) => {
      let resJson = Response.body
      console.log('resJson: ', resJson);
      if (resJson) {
        this.products = resJson
      }
    })
  }

  editProduct(data: any) {
    console.log('data:compoent ', data);
    this.productService.editProduct(data.product).subscribe((Response) => {
      const resposne = Response.body
      if (resposne) {
        alert('Product Updated')
        this.getProductData()
      } else {
        alert("Product not saved")
      }
    })
  }

  openEdit(data: any) {
    const dialogRef = this.dialog.open(FormDialog, {
      width: '2100px',
      data: {
        mode: 'edit',
        product: data
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('result: ', result);
        this.editProduct(result)
      }
    });
  }
  delete(data: any) {
    this.productService.deleteProductList(data._id).subscribe((Response) => {
      let response = Response.body
      if (response) {
        alert('Product Deleted')
        this.getProductData()
      } else {
        alert("Product not saved")
      }
    })
  }

  saveProduct(data: any) {
    console.log('data: save product', data);
    this.productService.saveProduct(data?.product).subscribe((Response) => {
      const resposne = Response.body
      if (resposne) {
        alert('Product saved')
        this.getProductData()
      } else {
        alert("Product not saved")
      }
    })
  }


  openCreateDialog(): void {
    const dialogRef = this.dialog.open(FormDialog, {
      width: '2100px',
      data: {
        mode: 'create'
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      this.saveProduct(result)
    });
  }

  openWeatherModal(): void {
    const dialogRef = this.dialog.open(WeatherModal, {
      width: '2100px',
    })
    dialogRef.afterClosed().subscribe(result => {
      this.saveProduct(result)
    });
  }

}
