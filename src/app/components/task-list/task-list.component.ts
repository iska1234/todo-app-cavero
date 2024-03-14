import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { ModalEditComponent } from '../modal-edit/modal-edit.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule],
  templateUrl: './task-list.component.html',
})
export class TaskListComponent {

  constructor(public dialog: MatDialog) {}
  @Input() taskList: any[] = [];
  @Output() important = new EventEmitter<any>();
  @Output() completed = new EventEmitter<any>();
  @Output() clearImportant = new EventEmitter<any>();
  @Output() clearCompleted = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @Output() updated = new EventEmitter<any>();

  openDialog(task: any) {
    const dialogRef = this.dialog.open(ModalEditComponent, {
      data: { id: task.id, title: task.title }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }


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
  deleteTask(task: any) {
    this.delete.emit(task);
  }

}
