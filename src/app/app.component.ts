import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'todo-list';
  userId = localStorage.getItem("userId");

  handleLogout() {
    localStorage.removeItem("userId");
  }
}
