import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSnackBarModule, MatSnackBar} from '@angular/material/snack-bar';
  
@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  employee: Employee = new Employee();
  submitted = false;
  empForm: FormGroup;

  constructor(private employeeService: EmployeeService,
    private router: Router, private location: Location, private snakbar: MatSnackBar) { }

    ngOnInit(): void {
      this.empForm = new FormGroup({
        name: new FormControl('', [Validators.required, Validators.maxLength(42)]),
        email: new FormControl('', [Validators.required, Validators.email]),
        jobtitle: new FormControl('', [Validators.required, Validators.maxLength(50)]),
        empid: new FormControl('', [Validators.required, Validators.maxLength(10)]),
        phone: new FormControl('', [Validators.required, Validators.maxLength(10)]),
        joindate: new FormControl('', [Validators.required])
      });
    }
    public hasError = (controlName: string, errorName: string) =>{
      return this.empForm.controls[controlName].hasError(errorName);
    }
   
    public onCancel = () => {
      this.location.back();
    }

  onSubmit() {
    this.employeeService.addEmployee(this.employee)
      .subscribe(data => {console.log(data)
        this.router.navigate(['/emplist']);
      this.snakbar.open("Added successfully",'dismiss', {
        duration: 2000,
        verticalPosition: 'top'
      });
      },
      
      error => console.log(error));  
  }
}
