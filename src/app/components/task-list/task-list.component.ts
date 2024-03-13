import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-list.component.html',
})
export class TaskListComponent {

  @Input() taskList: any[] = [];
  @Output() important = new EventEmitter<any>();
  @Output() completed = new EventEmitter<any>();
  @Output() clearImportant = new EventEmitter<any>();
  @Output() clearCompleted = new EventEmitter<any>();

  markImportant(task: any) {
    task.important = true;
    this.important.emit(task);
  }

  cImportant(task: any) {
    task.important = false;
    this.clearImportant.emit(task);
  }

  markCompleted(task: any) {
    task.completed = true;
    this.completed.emit(task);
  }

  cCompleted(task: any) {
    task.completed = false;
    this.clearCompleted.emit(task);
  }
}
