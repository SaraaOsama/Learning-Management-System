// signup.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-signup',
  styleUrls: ['./signup.component.css'],
  templateUrl: './signup.component.html',
})
export class SignupComponent {
  userName: string = '';
  email: string = '';
  password: string = '';
  role: number = 0;
  errorMessage: string = '';
  successMessage: string = '';

  constructor( private router: Router, private authService: AuthenticationService ,
     private messageService: MessageService
    ) {}

  signup() {
    const signupData = {
      userName: this.userName,
      email: this.email,
      password: this.password,
      role: this.role,
      active: 0,
      approve: 0,
      id_user: 0
    };
    this.authService.getAllUsers().subscribe(
      (users) => {
      const validUsers = users.filter(user => user.id_user !== undefined && user.id_user !== null);
      const maxIdUser = validUsers.length > 0 ? Math.max(...validUsers.map(user => user.id_user)) + 1 : 1;
      signupData.id_user = maxIdUser;
      })
    
    this.authService.getUserByEmail(this.email).subscribe(
      (response: any) => {
        if (response.length > 0) {
          // this.errorMessage = 'Email is already registered';
          this.messageService.add({severity: 'error', summary: 'Error', detail: 'Email is already registered'});
          
        } else {
          this.authService.addUser(signupData).subscribe(
            (response) => {
              
              // this.successMessage = 'User created successfully. Please wait for approval.';
              this.messageService.add({severity: 'success', summary: 'Success', detail: 'User created successfully. Please wait for approval.'});
              this.router.navigate(['/login']);
            },
            (error) => {
              // this.errorMessage = 'An error occurred during sign-up';
              this.messageService.add({severity: 'error', summary: 'Error', detail: 'An error occurred during sign-up'});
            }
          );
        }
      },
      (error) => {
        // this.errorMessage = 'An error occurred';
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'An error occurred'});
      }
    );
  }
}