import { Routes } from '@angular/router';
import { AllTasksComponent } from './pages/all-tasks/all-tasks.component';
import { CompletedTasksComponent } from './pages/completed-tasks/completed-tasks.component';
import { ImportantTasksComponent } from './pages/important-tasks/important-tasks.component';

export const routes: Routes = [

  {
    path:"",
    component: AllTasksComponent,
  },
  {
    path:"importants",
    component: ImportantTasksComponent,
  },
  {
    path:"completed",
    component: CompletedTasksComponent,
  },
];
