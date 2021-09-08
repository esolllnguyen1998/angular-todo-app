import { Component, OnInit } from '@angular/core';
import { User } from '../models/user-model';
import { UserService } from '../services/user.service';
import { Router } from "@angular/router"
@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {
  private users: Array<User> = [];
  public error: string = "";
  public userEmail: string = "";
  constructor(private userService: UserService, private router: Router) {
    this.userService.getUsers().subscribe((result) => {
      this.users = result as User[];
    })
  }

  ngOnInit(): void {
  }

  handleUserSubmit() {
    if (this.userEmail.length === 0 || !this.userEmail.includes("@")) {
      this.error = "You enter wrong email template.";
    }
    else {
      let user = this.users.find(x => x.email.toLowerCase().trim() === this.userEmail.toLowerCase().trim());
      if (user) {
        localStorage.setItem('userId', user.id.toString());
        this.router.navigate(['/home'])
      }
      else {
        this.error = "Cannot find your email.";
      }
    }
  }
}
