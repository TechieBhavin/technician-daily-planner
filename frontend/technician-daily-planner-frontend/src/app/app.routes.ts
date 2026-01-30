import { Routes } from '@angular/router';
import { AddTaskComponent } from './pages/add-task/add-task.component';
import { TaskListComponent } from './pages/task-list/task-list.component';
import { AllTasksComponent } from './pages/all-tasks/all-tasks.component';

export const routes: Routes = [
  { path: '', redirectTo: 'tasks', pathMatch: 'full' },
  { path: 'tasks', component: TaskListComponent },
  {
  path: 'add-task',
  loadComponent: () =>
    import('./pages/add-task/add-task.component')
      .then(m => m.AddTaskComponent)
},

  {
  path: 'all-tasks',
  component: AllTasksComponent
}

];
