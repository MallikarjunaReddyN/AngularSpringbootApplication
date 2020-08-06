import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../user.service';
import { User } from '../user';
import {MatSnackBarModule, MatSnackBar} from '@angular/material/snack-bar';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user : User = new User();
  loginform : FormGroup;
  constructor(private router: Router, private userService: UserService, private snakbar: MatSnackBar) { }

  ngOnInit(){
    this.loginform = new FormGroup(
      {
        email : new FormControl('',[Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)])
      }
    );
  }

  register(){
    this.router.navigate(['/register']);
  }
  
  login(){
    this.userService.login(this.user)
      .subscribe(data => {console.log(data)
        this.router.navigate(['/emplist']);
        this.snakbar.open("Login successfully",'dismiss', {
          duration: 2000,
          verticalPosition: 'top'
        });
      },
      
      error => console.log(error));
      this.snakbar.open("Bad crediential",'dismiss', {
        duration: 2000,
        verticalPosition: 'bottom'
      });
  }
  }

