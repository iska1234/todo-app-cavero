import { Component, inject } from '@angular/core';
import { PageTitleComponent } from '../../components/page-title/page-title.component';
import { TaskListComponent } from '../../components/task-list/task-list.component';
import { HttpService } from '../../services/http.service';
import { StateService } from '../../services/state.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-important-tasks',
  standalone: true,
  imports: [PageTitleComponent, TaskListComponent, CommonModule],
  templateUrl: './important-tasks.component.html',
})
export class ImportantTasksComponent {
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

  getAllTasks(){
    this.httpService.getAllTasks().subscribe((result:any) => {
      this.initialTaskList = this.taskList=result.filter((x:any)=> x.important == true);
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

}