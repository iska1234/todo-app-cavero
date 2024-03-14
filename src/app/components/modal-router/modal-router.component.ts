import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-modal-router',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, RouterLink, RouterLinkActive],
  templateUrl: './modal-router.component.html',
})
export class ModalRouterComponent {

}
