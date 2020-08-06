import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/employee';
import { EmployeeService } from 'src/app/employee.service';
import { DialogService } from 'src/app/dialog.service';
import { error } from '@angular/compiler/src/util';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialogModule, MatDialog} from '@angular/material/dialog';
import {MatSnackBarModule, MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-employeelist',
  templateUrl: './employeelist.component.html',
  styleUrls: ['./employeelist.component.css']
})
export class EmployeelistComponent implements OnInit {

  public employees: Employee[];

  constructor(private employeeService: EmployeeService,
    private router: Router, private dialogService: DialogService,
    private snakbar: MatSnackBar) { }

  ngOnInit() {
    this.getEmployees();
  }

  logout(){
    this.router.navigate(['/']);
    this.snakbar.open("You have been loged out",'dismiss', {
      duration: 2000,
      verticalPosition: 'top'
    });
  }

  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) =>{
        this.employees = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  addEmployee(){
    this.router.navigate(['/addemployee']);
  }

  updateEmployee(id: number){
    this.router.navigate(['update', id]);
  }

  deleteEmployee(id: number) {
    this.dialogService.openConfirmDialog().afterClosed().subscribe(res =>{
      if(res){
        this.employeeService.deleteEmployee(id)
        .subscribe(
        data => {
          this.ngOnInit();
          this.snakbar.open("deleted successfully",'dismiss', {
            duration: 2000,
            verticalPosition: 'bottom'
          });
        },
        error => console.log(error));
      }
    });
  }

}