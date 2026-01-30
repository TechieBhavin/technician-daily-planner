import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-task.component.html',
})
export class AddTaskComponent {

  task = {
    customerName: '',
    location: '',
    taskType: '',
    scheduledTime: '',
    notes: ''
  };

  constructor(private taskService: TaskService) {}

  submitTask() {
    this.taskService.createTask(this.task).subscribe({
      next: () => {
        alert('Task added successfully ✅');
        this.task = {
          customerName: '',
          location: '',
          taskType: '',
          scheduledTime: '',
          notes: ''
        };
      },
      error: (err) => console.error(err)
    });
  }
}
