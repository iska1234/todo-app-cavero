import { Component, inject } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { TaskListComponent } from '../../components/task-list/task-list.component';
import { PageTitleComponent } from '../../components/page-title/page-title.component';
import { StateService } from '../../services/state.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-completed-tasks',
  standalone: true,
  imports: [TaskListComponent, PageTitleComponent, CommonModule],
  templateUrl: './completed-tasks.component.html',

})
export class CompletedTasksComponent {
  newTask="";
  initialTaskList: any[] = [];
  taskList:any[]=[];
  httpService = inject(HttpService);
  stateService = inject(StateService)
  toastr = inject(ToastrService)

  ngOnInit(){
    this.stateService.searchSubject.subscribe((value) => {
      if(value){
        this.taskList = this.initialTaskList.filter((x) => x.title.toLowerCase().includes(value.toLowerCase()))
      }else{
        this.taskList = this.initialTaskList;
      }
    })
    this.getAllTasks();
  }

  getAllTasks(){
    this.httpService.getAllTasks().subscribe((result:any) => {
      this.initialTaskList =  this.taskList=result.filter((x:any)=>x.completed==true);
    })
  }

  onCompleted(task: any) {
    task.completed = true;
    this.updateTask(task);
  }

  onImportant(task: any) {
    task.important = true;
    this.updateTask(task);
  }

  clearCompleted(task: any) {
    task.completed = false;
    this.updateTask(task);
    this.showClearCompleted();
  }

  clearImportant(task: any) {
    task.important = false;
    this.updateTask(task);
    this.showClearImportant();
  }

  updateTask(task: any) {
    this.httpService.updateTask(task).subscribe(() => {
      this.getAllTasks();
    });
  }

  deleteTask(task: any) {
    this.httpService.deteleTask(task).subscribe(() => {
      this.getAllTasks();
      this.showDelete();
    });
  }

  //Alertas
  //Si se presiona el mismo no aceptarán duplicados
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
