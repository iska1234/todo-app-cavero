import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './header.component.html',
})
export class HeaderComponent {

  stateService = inject(StateService); // Inyectar servicios de esta manera está en desuso, considera usar el decorador @Injectable en el servicio.
  searchControl = new FormControl();

  ngOnInit(){
    // Suscripción a los cambios en el control de búsqueda.
    this.searchControl.valueChanges.subscribe((value) => {
        // Emitir el valor del control de búsqueda al servicio de estado.
        this.stateService.searchSubject.next(value || "");
    })
  }
}
