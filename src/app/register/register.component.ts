import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../user.service';
import { User } from '../user';
import {MatSnackBarModule, MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user : User = new User();
  registerform : FormGroup;
  constructor(private router: Router, private userService: UserService, private snakbar: MatSnackBar) { }

  ngOnInit(){
    this.registerform = new FormGroup(
      {
        uname : new FormControl('',[Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
        email : new FormControl('',[Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)])
      }
    );
  }

  loginback(){
    this.router.navigate(['/']);
  }

  register(){
    this.userService.register(this.user)
    .subscribe(data => {console.log(data)
      this.router.navigate(['/']);
      this.snakbar.open("Register successfully",'dismiss', {
        duration: 2000,
        verticalPosition: 'top'
      });
    },
    
    error => console.log(error));
    this.snakbar.open("Email is aleardy exists",'dismiss', {
      duration: 3000,
      verticalPosition: 'top'
    });
}

}
