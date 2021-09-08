import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TodoModel } from 'src/app/models/todo-model';
import { TodoService } from 'src/app/services/todo.service';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  public todoList: Array<TodoModel> = [];
  public editingTodoId: number = 0;
  public maxId: number = 0;
  public userId: number = 0;
  public todoNote: string = "";
  public error: string = "";

  constructor(private todoService: TodoService, private modalService: NgbModal) {
    this.userId = parseInt(localStorage.getItem("userId") ?? "-1");

    this.todoService.getTodos().subscribe((result) => {
      let todos = result as TodoModel[];
      this.maxId = todos[todos.length - 1].id;
      this.todoList = todos.filter(x => x.userId === this.userId);
    })
  }

  ngOnInit(): void {
  }

  handleEnableEditingMode(id: number) {
    this.editingTodoId = id;
  }

  handleEditTodoNote() {
    this.editingTodoId = -1;
  }

  handleEnableDeletingMode(id: number) {
    const modalRef = this.modalService.open(ConfirmModalComponent);
    modalRef.componentInstance.todoIndex = id;
    modalRef.componentInstance["handleConfirmClick"].subscribe((event: any) => {
      this.todoList = this.todoList.filter(x => x.id !== event);
    });
  }

  handleAddTodo() {
    if (this.todoNote === "") {
      this.error = "Please enter your todo note.";
      return;
    }

    if (this.todoNote.length > 250) {
      return
    }

    let todo: TodoModel = {
      id: this.maxId + 1,
      title: this.todoNote,
      completed: false,
      userId: this.userId
    };
    this.todoList.push(todo);
    this.todoNote = "";
  }
}
