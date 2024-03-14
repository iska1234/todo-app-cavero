import { Component, inject } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { TaskListComponent } from '../../components/task-list/task-list.component';
import { PageTitleComponent } from '../../components/page-title/page-title.component';
import { StateService } from '../../services/state.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { filterTasksByAsc, filterTasksByDesc } from '../../utils/filter-date.util';

@Component({
  selector: 'app-completed-tasks',
  standalone: true,
  imports: [FormsModule, TaskListComponent, PageTitleComponent, CommonModule],
  templateUrl: './completed-tasks.component.html',
})
export class CompletedTasksComponent {
  // Variables para el manejo de tareas
  newTask = '';
  initialTaskList: any[] = [];
  taskList: any[] = [];

  // Servicios y servicios de emisión de eventos
  httpService = inject(HttpService);
  stateService = inject(StateService);
  toastr = inject(ToastrService);

  // Método que se ejecuta cuando se inicializa el componente
  ngOnInit() {
    // Suscribe al observable searchSubject para realizar búsquedas en la lista de tareas
    this.stateService.searchSubject.subscribe((value) => {
      if (value) {
        // Filtra las tareas basadas en el valor de búsqueda
        this.taskList = this.initialTaskList.filter((x) =>
          x.title.toLowerCase().includes(value.toLowerCase())
        );
      } else {
        // Si no hay valor de búsqueda, muestra todas las tareas
        this.taskList = this.initialTaskList;
      }
    });

    // Obtiene todas las tareas completadas al inicializar el componente
    this.getAllTasks();
  }

  // Método para obtener todas las tareas completadas
  getAllTasks() {
    this.httpService.getAllTasks().subscribe((result: any) => {
      // Filtra y establece las tareas completadas como la lista inicial de tareas
      this.initialTaskList = this.taskList = result.filter(
        (x: any) => x.completed == true
      );
    });
  }

  // Método para marcar una tarea como completada
  onCompleted(task: any) {
    task.completed = true;
    this.updateTask(task);
  }

  // Método para marcar una tarea como importante
  onImportant(task: any) {
    task.important = true;
    this.updateTask(task);
  }

  // Método para limpiar el estado "completado" de una tarea
  clearCompleted(task: any) {
    task.completed = false;
    this.updateTask(task);
    this.showClearCompleted(); // Muestra una alerta
  }

  // Método para limpiar el estado "importante" de una tarea
  clearImportant(task: any) {
    task.important = false;
    this.updateTask(task);
    this.showClearImportant(); // Muestra una alerta
  }

  // Método para actualizar una tarea
  updateTask(task: any) {
    this.httpService.updateTask(task).subscribe(() => {
      // Vuelve a cargar todas las tareas después de la actualización
      this.getAllTasks();
    });
  }

  // Método para eliminar una tarea
  deleteTask(task: any) {
    this.httpService.deleteTask(task).subscribe(() => {
      // Vuelve a cargar todas las tareas después de la eliminación
      this.getAllTasks();
      this.showDelete(); // Muestra una alerta
    });
  }

  // Aplicar filtro a la lista de tareas
  selectedFilter: string = 'asc';
  applyFilter() {
    switch (this.selectedFilter) {
      case 'asc':
        this.taskList = filterTasksByAsc(this.initialTaskList);
        break;
      case 'desc':
        this.taskList = filterTasksByDesc(this.initialTaskList);
        break;
      default:
        break;
    }
  }

  // Alertas para acciones realizadas
  showClearImportant() {
    this.toastr.warning('Removed task from Important.', 'Updated');
  }

  showClearCompleted() {
    this.toastr.warning('Removed task from Completed.', 'Updated');
  }

  showDelete() {
    this.toastr.error('Task Deleted Successfully.', 'Deleted');
  }
}
