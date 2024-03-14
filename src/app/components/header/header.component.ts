import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StateService } from '../../services/state.service';
import { MatButtonModule } from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import { ModalEditComponent } from '../modal-edit/modal-edit.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalRouterComponent } from '../modal-router/modal-router.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatSidenavModule, MatButtonModule],
  templateUrl: './header.component.html',
})
export class HeaderComponent {

  stateService = inject(StateService); // Inyectar servicios de esta manera está en desuso, considera usar el decorador @Injectable en el servicio.
  searchControl = new FormControl();

  constructor(public dialog: MatDialog) {}
  ngOnInit(){
    // Suscripción a los cambios en el control de búsqueda.
    this.searchControl.valueChanges.subscribe((value) => {
        // Emitir el valor del control de búsqueda al servicio de estado.
        this.stateService.searchSubject.next(value || "");
    })
  }
  openDialog() {
    const dialogRef = this.dialog.open(ModalRouterComponent, {
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      // Acciones despues de cerrar el modal
    });
  }
}
