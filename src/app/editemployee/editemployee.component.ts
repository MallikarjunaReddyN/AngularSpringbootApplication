import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-editemployee',
  templateUrl: './editemployee.component.html',
  styleUrls: ['./editemployee.component.css']
})
export class EditemployeeComponent implements OnInit {

  id: number;
  employee: Employee;
  registerForm: FormGroup;

  constructor(private route: ActivatedRoute,private router: Router,
    private employeeService: EmployeeService, private location: Location) { }
  
    ngOnInit(): void {
      this.employee = new Employee();
      this.id = this.route.snapshot.params['id'];
    
    this.employeeService.getEmployeeById(this.id)
      .subscribe(data => {
        console.log(data)
        this.employee = data;
      }, error => console.log(error));
      this.registerForm = new FormGroup({
        name: new FormControl('', [Validators.required, Validators.maxLength(42)]),
        email: new FormControl('', [Validators.required, Validators.email]),
        jobtitle: new FormControl('', [Validators.required, Validators.maxLength(50)]),
        phone: new FormControl('', [Validators.required, Validators.maxLength(10)]),
        empid: new FormControl('', [Validators.required, Validators.maxLength(10)]),
        joindate: new FormControl('', [Validators.required])
      });
    }
    public hasError = (controlName: string, errorName: string) =>{
      return this.registerForm.controls[controlName].hasError(errorName);
    }
    
   
    public onCancel = () => {
      this.location.back();
    }

    onSubmit() {
      this.updateEmployee();    
    }
  

    updateEmployee() {
    this.employeeService.updateEmployee(this.employee)
      .subscribe(data => {console.log(data)
        this.router.navigate(['/']);
      },
      error => console.log(error));
  }

}
