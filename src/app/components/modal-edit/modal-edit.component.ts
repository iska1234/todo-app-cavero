import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-edit',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './modal-edit.component.html',
})
export class ModalEditComponent {
  autoExpand(event: any) {
    const textarea = event.target;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }



}
