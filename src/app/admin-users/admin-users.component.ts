import { Component } from '@angular/core';
import {  OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {
  users: any[] = [];
  constructor(private aminService: AdminService) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.aminService.getAllUsers().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  deleteUser(id_user: number): void {
    this.aminService.deleteUser(id_user).subscribe(() => {
      this.users = this.users.filter(user => user.id !== id_user);
    });
  }

  activateUser(id_user: number): void {
    const user = this.users.find(user => user.id === id_user);
    if (user) {
      console.log("1");
      user.active = 1;
      this.aminService.ActiveUser(id_user, user).subscribe();
    }
  }

  deactivateUser(id_user: number): void {
    const user = this.users.find(user => user.id === id_user);
    if (user) {
      user.active = 0;
      this.aminService.ActiveUser(id_user, user).subscribe();
    }
  }

  approveUser(id_user: number): void {
    const user = this.users.find(user => user.id === id_user);
    if (user) {
      user.approve = 1;
      this.aminService.ActiveUser(id_user, user).subscribe();
    }
  }
}
