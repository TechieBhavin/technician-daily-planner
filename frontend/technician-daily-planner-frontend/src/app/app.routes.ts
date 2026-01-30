import { Routes } from '@angular/router';
import { AddTaskComponent } from './pages/add-task/add-task.component';
import { TaskListComponent } from './pages/task-list/task-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'tasks', pathMatch: 'full' },
  { path: 'tasks', component: TaskListComponent },
  { path: 'add-task', component: AddTaskComponent },
];
