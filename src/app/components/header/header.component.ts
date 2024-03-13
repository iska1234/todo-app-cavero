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

  stateService = inject(StateService)
  searchControl = new FormControl();

  ngOnInit(){
    this.searchControl.valueChanges.subscribe((value) => {
        this.stateService.searchSubject.next(value || "");
    })
  }
}
