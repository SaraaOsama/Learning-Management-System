import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-login',
  styleUrls: ['./login.component.css'],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor( private router: Router , private authService: AuthenticationService,
     private messageService: MessageService
    ) {}

  login() {
    // const messageService : MessageService
    const loginData = { email: this.email, password: this.password };
    if(this.email == "admin" && this.password == "admin"){
      this.router.navigate(['/admin'])
      return;
    }
    this.authService.checkLogin(this.email , this.password).subscribe(
      (response: any) => {
        if (response.length === 0) {
          // this.errorMessage = 'Invalid credentials';
          this.messageService.add({severity: 'error', summary: 'Error', detail: 'Invalid credentials'});
        } 
        else {  
          const user = response[0];
          if (user.active === 0) {
            // this.errorMessage = 'Account is not active';
            this.messageService.add({severity: 'error', summary: 'Error', detail: 'Account is not active'});
          } else if (user.approve === 0) {
            // this.errorMessage = 'Account is not approved';
            this.messageService.add({severity: 'error', summary: 'Error', detail: 'Account is not approved'});
          } else {
            if (user.role === 1) {
              this.router.navigate(['/icourses']);
            } else if (user.role === 0) {
              this.router.navigate(['./homestudent' , user.id_user]);
            }
          }
        }
      },
      (error) => {
        this.errorMessage = 'An error occurred during login';
      }
    );
  }
}
