import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-modal-edit',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, FormsModule],
  templateUrl: './modal-edit.component.html',
})
export class ModalEditComponent {

  @Output() updated = new EventEmitter<any>();

  updatedTask: string = '';

  autoExpand(event: any) {
    const textarea = event.target;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: number, title: string },
    private httpService: HttpService
  ) {}

  updateTask() {
    const taskToUpdate = { id: this.data.id, title: this.updatedTask };
    this.httpService.updateTask(taskToUpdate).subscribe((updatedTask) => {
      this.updated.emit(updatedTask);
      window.location.reload();
    });
  }
}
