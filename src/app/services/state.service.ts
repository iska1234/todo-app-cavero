import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root' // Proporciona este servicio en el ámbito raíz de la aplicación
})
export class StateService {

  // BehaviorSubject se utiliza para compartir un valor o un flujo de valores con los suscriptores
  searchSubject: BehaviorSubject<string> = new BehaviorSubject<string>(""); // BehaviorSubject inicializado con una cadena vacía
  constructor() { } // Constructor del servicio

}
