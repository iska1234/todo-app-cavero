import { Component, inject } from '@angular/core';
import { PageTitleComponent } from '../../components/page-title/page-title.component';
import { TaskListComponent } from '../../components/task-list/task-list.component';
import { HttpService } from '../../services/http.service';
import { StateService } from '../../services/state.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-important-tasks',
  standalone: true,
  imports: [PageTitleComponent, TaskListComponent, CommonModule],
  templateUrl: './important-tasks.component.html',
})
export class ImportantTasksComponent {

  // Variables para el manejo de tareas
  newTask="";
  initialTaskList: any[] = [];
  taskList:any[]=[];

  // Servicios y servicios de emisión de eventos
  httpService = inject(HttpService);
  stateService = inject(StateService)
  toastr = inject(ToastrService)

  ngOnInit(){
    // Suscríbete al BehaviorSubject en StateService para buscar tareas importantes
    this.stateService.searchSubject.subscribe((value) => {
      if(value){
        this.taskList = this.initialTaskList.filter((x) => x.title.toLowerCase().includes(value.toLowerCase()))
      }else{
        this.taskList = this.initialTaskList;
      }
    })
    this.getAllTasks(); // Obtiene todas las tareas importantes al inicializar el componente
  }

  getAllTasks(){
    // Obtiene todas las tareas y filtra las importantes
    this.httpService.getAllTasks().subscribe((result:any) => {
      this.initialTaskList = this.taskList=result.filter((x:any)=> x.important == true);
    })
  }

  onCompleted(task: any) {
    task.completed = true;
    this.updateTask(task); // Actualiza la tarea completada
  }

  onImportant(task: any) {
    task.important = true;
    this.updateTask(task); // Actualiza la tarea importante
  }

  clearCompleted(task: any) {
    task.completed = false;
    this.updateTask(task); // Actualiza la tarea completada
    this.showClearCompleted(); // Muestra una alerta
  }

  clearImportant(task: any) {
    task.important = false;
    this.updateTask(task); // Actualiza la tarea importante
    this.showClearImportant(); // Muestra una alerta
  }

  updateTask(task: any) {
    // Actualiza la tarea en el servidor y vuelve a cargar las tareas importantes
    this.httpService.updateTask(task).subscribe(() => {
      this.getAllTasks();
    });
  }

  deleteTask(task: any) {
    // Elimina la tarea del servidor y vuelve a cargar las tareas importantes
    this.httpService.deleteTask(task).subscribe(() => {
      this.getAllTasks();
      this.showDelete(); // Muestra una alerta
    });
  }

  // Muestra una alerta de que se ha eliminado una tarea importante
  showClearImportant(){
    this.toastr.warning('Removed task from Important.', 'Updated');
  }

  // Muestra una alerta de que se ha eliminado una tarea completada
  showClearCompleted(){
    this.toastr.warning('Removed task from Completed.', 'Updated');
  }

  // Muestra una alerta de que se ha eliminado una tarea
  showDelete(){
    this.toastr.error('Task Deleted Sucessfully.', 'Deleted');
  }
}
