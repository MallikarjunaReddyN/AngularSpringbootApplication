import { Injectable } from '@angular/core';
import {MatDialogModule, MatDialog} from '@angular/material/dialog';
import { ConfirmdialogComponent } from './confirmdialog/confirmdialog.component';
@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openConfirmDialog(){
   return this.dialog.open(ConfirmdialogComponent,{
      width:'390px',
      disableClose: true
    });
  }
}
