import { Component, EventEmitter, Inject, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { HttpService } from '../../services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modal-edit',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, FormsModule],
  templateUrl: './modal-edit.component.html',
})
export class ModalEditComponent {

  // Evento de emisión para cuando se actualiza una tarea
  @Output() updated = new EventEmitter<any>();
  // Evento de emisión para cuando se actualiza la lista de tareas
  @Output() taskUpdated = new EventEmitter<void>();

  // Variable para almacenar la tarea actualizada
  updatedTask: string = '';

  // Método para expandir automáticamente el área de texto
  autoExpand(event: any) {
    const textarea = event.target;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }

  constructor(
    // Inyección de datos del diálogo
    @Inject(MAT_DIALOG_DATA)
    public data: {
      id: number;
      title: string;
      creationTime: string;
      important: boolean;
      completed: boolean;
    },
    // Servicio HTTP para actualizar la tarea
    private httpService: HttpService
  ) {}

  // Método para actualizar la tarea
  updateTask() {
    // Crear un objeto con los datos actualizados de la tarea
    const taskToUpdate = { ...this.data, title: this.updatedTask };
    // Llamar al servicio HTTP para actualizar la tarea en el servidor
    this.httpService.updateTask(taskToUpdate).subscribe((updatedTask) => {
      // Emitir el evento de actualización con la tarea actualizada y su ID
      this.updated.emit({ id: this.data.id, updatedTask });
      // Recargar la página para reflejar los cambios
      window.location.reload();
    });
  }
}
