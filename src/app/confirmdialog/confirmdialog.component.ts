import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-confirmdialog',
  templateUrl: './confirmdialog.component.html',
  styleUrls: ['./confirmdialog.component.css']
})
export class ConfirmdialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConfirmdialogComponent>) { }

  ngOnInit(): void {
  }

  closedialog(){
    this.dialogRef.close(false);
  }
}
