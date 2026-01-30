import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-summary-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './summary-cards.component.html',
  styleUrls: ['./summary-cards.component.css']
})
export class SummaryCardsComponent implements OnInit {

  total = 0;
  completed = 0;
  pending = 0;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getAllTasks().subscribe(tasks => {
      this.total = tasks.length;
      this.completed = tasks.filter(t => t.status === 'Completed').length;
      this.pending = tasks.filter(t => t.status === 'Pending').length;
    });
  }
}
