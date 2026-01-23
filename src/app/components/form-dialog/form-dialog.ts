import { Component, EventEmitter, inject, Output, model } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';

export interface DialogData {
  mode?: 'create' | 'edit'
  product: {
    id?: string
    name: string;
    price: string;
    description: string;
  }
}

@Component({
  selector: 'app-form-dialog',
  imports: [MatDialogActions, MatDialogContent, MatFormField, MatLabel, MatDialogClose, FormsModule, MatInput, MatButton],
  templateUrl: './form-dialog.html',
  styleUrl: './form-dialog.css',
})



export class FormDialog {


  public formData: DialogData = {
    product:{
      id: "",
      name: "",
      description: "",
      price: ""
    }
  }

  readonly dialogRef = inject(MatDialogRef<FormDialog>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  inputData: string | undefined
  save = model(this.formData);
  edit = model(this.data)
  ngOnInit() {
    console.log(this.data, 'data on init');
    if (this.data.mode === 'edit' && this.data.product) {
      const editObjCopy = Object.assign({}, this.data)
      this.formData.product = { ...this.data.product };
    }
  }


  onNoClick() {
    this.dialogRef.close();
    console.log('this.formData:after edit ', this.formData);
  }

}
