import { Component, EventEmitter, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { DatePipe } from '@angular/common';
import { PageTitleComponent } from '../../components/page-title/page-title.component';
import { TaskListComponent } from '../../components/task-list/task-list.component';
import { StateService } from '../../services/state.service';
import { ToastrService } from 'ngx-toastr';
import { filterTasksByAsc, filterTasksByDesc } from '../../utils/filter-date.util';

@Component({
  selector: 'app-all-tasks',
  standalone: true,
  imports: [FormsModule, DatePipe, PageTitleComponent, TaskListComponent,],
  templateUrl: './all-tasks.component.html',
})
export class AllTasksComponent {

  // Variables para el manejo de tareas
  newTask="";
  initialTaskList: any[] = [];
  taskList:any[]=[];

  // Servicios y servicios de emisión de eventos
  httpService = inject(HttpService);
  stateService = inject(StateService)
  toastr = inject(ToastrService)
  taskUpdated: EventEmitter<void> = new EventEmitter<void>();

  ngOnInit(){
    // Suscribirse al servicio de búsqueda y obtener todas las tareas al inicializar
    this.stateService.searchSubject.subscribe((value) => {
      if(value){
        this.taskList = this.initialTaskList.filter((x) => x.title.toLowerCase().includes(value.toLowerCase()))
      }else{
        this.taskList = this.initialTaskList;
      }
    })
    this.getAllTasks();
  }

  // Agregar una nueva tarea
  addTask(){
    this.httpService.addTask(this.newTask).subscribe(() => {
      this.newTask = "";
      this.getAllTasks(); // Actualizar la lista de tareas después de agregar una nueva tarea
      this.showsuccess(); // Mostrar mensaje de éxito
    })
  }

  // Obtener todas las tareas
  getAllTasks(){
    this.httpService.getAllTasks().subscribe((result:any) => {
      this.initialTaskList =  this.taskList=result;
      this.applyFilter(); // Aplicar filtro después de obtener las tareas
    })
  }

  // Marcar una tarea como completada
  onCompleted(task: any) {
    task.completed = true;
    this.updateTask(task);
    this.showUpdatedCompleted();
  }

  // Marcar una tarea como importante
  onImportant(task: any) {
    task.important = true;
    this.updateTask(task);
    this.showUpdatedImportant();
  }

  // Limpiar la marca de una tarea como completada
  clearCompleted(task: any) {
    task.completed = false;
    this.updateTask(task);
    this.showClearCompleted();
  }

  // Limpiar la marca de una tarea como importante
  clearImportant(task: any) {
    task.important = false;
    this.updateTask(task);
    this.showClearImportant();
  }

  // Actualizar una tarea
  updateTask(task: any) {
    this.httpService.updateTask(task).subscribe(() => {
      this.getAllTasks(); // Actualizar la lista de tareas después de actualizar una tarea
    });
  }

  // Método para realizar una búsqueda
  search(searchTerm:any){

  }

  // Eliminar una tarea
  deleteTask(task: any) {
    this.httpService.deleteTask(task).subscribe(() => {
      this.getAllTasks(); // Actualizar la lista de tareas después de eliminar una tarea
      this.showDelete(); // Mostrar mensaje de eliminación
    });
  }


  // Aplicar filtro a la lista de tareas
  selectedFilter: string = 'asc'
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

  // Mostrar mensajes de alerta
  showsuccess(){
    this.toastr.success('Task Added Sucessfully.', 'Success');
  }

  showUpdatedImportant(){
    this.toastr.info('Updated task to important.', 'Updated');
  }

  showUpdatedCompleted(){
    this.toastr.info('Updated task to Completed.', 'Updated');
  }

  showClearImportant(){
    this.toastr.warning('Removed task from Important.', 'Updated');
  }

  showClearCompleted(){
    this.toastr.warning('Removed task from Completed.', 'Updated');
  }

  showDelete(){
    this.toastr.error('Task Deleted Sucessfully.', 'Deleted');
  }
}
