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

  @Input() taskList: any[] = []; // Lista de tareas recibida desde el componente padre
  @Output() important = new EventEmitter<any>(); // Evento emitido al marcar una tarea como importante
  @Output() completed = new EventEmitter<any>(); // Evento emitido al marcar una tarea como completada
  @Output() clearImportant = new EventEmitter<any>(); // Evento emitido al limpiar la marca de una tarea como importante
  @Output() clearCompleted = new EventEmitter<any>(); // Evento emitido al limpiar la marca de una tarea como completada
  @Output() delete = new EventEmitter<any>(); // Evento emitido al eliminar una tarea

  // Abrir el diálogo de edición de tarea
  openDialog(task: any) {
    const dialogRef = this.dialog.open(ModalEditComponent, {
      data: { ...task } // Pasar los datos de la tarea al componente ModalEditComponent
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      // Acciones despues de cerrar el modal
    });
  }

  // Marcar una tarea como importante
  markImportant(task: any) {
    task.important = true;
    this.important.emit(task); // Emitir evento de tarea importante
  }

  // Limpiar la marca de una tarea como importante
  cImportant(task: any) {
    task.important = false;
    this.clearImportant.emit(task); // Emitir evento de limpieza de marca de tarea importante
  }

  // Marcar una tarea como completada
  markCompleted(task: any) {
    task.completed = true;
    this.completed.emit(task); // Emitir evento de tarea completada
  }

  // Limpiar la marca de una tarea como completada
  cCompleted(task: any) {
    task.completed = false;
    this.clearCompleted.emit(task); // Emitir evento de limpieza de marca de tarea completada
  }

  // Eliminar una tarea
  deleteTask(task: any) {
    this.delete.emit(task); // Emitir evento de eliminación de tarea
  }

}
