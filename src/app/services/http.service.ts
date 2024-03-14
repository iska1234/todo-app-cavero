import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', // Proporciona este servicio en el ámbito raíz de la aplicación
})
export class HttpService {
  constructor(private httpClient: HttpClient) {} // Utiliza la inyección de dependencias en el constructor para obtener una instancia de HttpClient

  addTask(task: string) {
    const creationTime = new Date().toISOString();

    // Utiliza HttpClient para hacer una solicitud POST para agregar una tarea
    return this.httpClient.post('http://localhost:3000/tasks', {
      title: task,
      creationTime: creationTime
    });
  }

  getAllTasks() {
    // Utiliza HttpClient para hacer una solicitud GET para obtener todas las tareas
    return this.httpClient.get('http://localhost:3000/tasks');
  }

  updateTask(task: any) {
    // Utiliza HttpClient para hacer una solicitud PUT para actualizar una tarea específica
    return this.httpClient.put(`http://localhost:3000/tasks/${task.id}`, task);
  }

  deleteTask(task: any) {
    // Utiliza HttpClient para hacer una solicitud DELETE para eliminar una tarea específica
    return this.httpClient.delete(`http://localhost:3000/tasks/${task.id}`);
  }
}
