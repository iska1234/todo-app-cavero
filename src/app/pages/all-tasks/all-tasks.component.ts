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
  newTask="";
  initialTaskList: any[] = [];
  taskList:any[]=[];
  httpService = inject(HttpService);
  stateService = inject(StateService)
  toastr = inject(ToastrService)
  taskUpdated: EventEmitter<void> = new EventEmitter<void>();

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

  addTask(){
    this.httpService.addTask(this.newTask).subscribe(() => {
      this.newTask = "";
      this.getAllTasks();
      this.showsuccess();
    })
  }

  onTaskUpdated() {
    this.getAllTasks();
  }
  getAllTasks(){
    this.httpService.getAllTasks().subscribe((result:any) => {
      this.initialTaskList =  this.taskList=result;
      this.applyFilter();
    })
  }

  onCompleted(task: any) {
    task.completed = true;
    this.updateTask(task);
    this.showUpdatedCompleted();
  }

  onImportant(task: any) {
    task.important = true;
    this.updateTask(task);
    this.showUpdatedImportant();
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


  search(searchTerm:any){

  }

  deleteTask(task: any) {
    this.httpService.deteleTask(task).subscribe(() => {
      this.getAllTasks();
      this.showDelete();
    });
  }


  //
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

  //Alertas
  //Si se presiona el mismo no aceptarán duplicados
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
