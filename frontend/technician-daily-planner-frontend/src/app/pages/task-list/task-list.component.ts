import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { TaskCardComponent } from '../../components/task-card/task-card.component';
import { SummaryCardsComponent } from '../../components/summary-cards/summary-cards.component';


@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, TaskCardComponent, SummaryCardsComponent],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: any[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTodayTasks().subscribe({
      next: data => this.tasks = data,
      error: err => console.error(err)
    });
  }

  completeTask(taskId: string) {
    this.taskService.completeTask(taskId).subscribe({
      next: () => {
        const task = this.tasks.find(t => t._id === taskId);
        if (task) {
          task.status = 'Completed';
          task.completedAt = new Date();
        }
      },
      error: err => console.error(err)
    });
  }
}
