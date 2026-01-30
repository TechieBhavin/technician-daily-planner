import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { TaskCardComponent } from '../../components/task-card/task-card.component';

@Component({
  selector: 'app-all-tasks',
  standalone: true,
  imports: [CommonModule, TaskCardComponent],
  templateUrl: './all-tasks.component.html',
  styleUrl: './all-tasks.component.css'
})
export class AllTasksComponent implements OnInit {

  tasks: any[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.taskService.getAllTasks().subscribe({
      next: data => this.tasks = data,
      error: err => console.error(err)
    });
  }

  completeTask(taskId: string) {
    this.taskService.completeTask(taskId).subscribe(() => {
      const task = this.tasks.find(t => t._id === taskId);
      if (task) {
        task.status = 'Completed';
        task.completedAt = new Date();
      }
    });
  }
}
