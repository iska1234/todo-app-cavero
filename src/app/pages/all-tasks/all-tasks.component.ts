import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { DatePipe } from '@angular/common';
import { PageTitleComponent } from '../../components/page-title/page-title.component';
import { TaskListComponent } from '../../components/task-list/task-list.component';
import { StateService } from '../../services/state.service';

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
    })
  }

  getAllTasks(){
    this.httpService.getAllTasks().subscribe((result:any) => {
      this.initialTaskList =  this.taskList=result;
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
  }

  clearImportant(task: any) {
    task.important = false;
    this.updateTask(task);
  }

  updateTask(task: any) {
    this.httpService.updateTask(task).subscribe(() => {
      this.getAllTasks();
    });
  }
  search(searchTerm:any){

  }
}
