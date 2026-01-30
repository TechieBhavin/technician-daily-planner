import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private API_URL = 'http://localhost:5007/api/tasks';

  constructor(private http: HttpClient) {}

  // Create task
  createTask(task: any): Observable<any> {
    return this.http.post(this.API_URL, task);
  }

  // Get today's tasks
  getTodayTasks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/today`);
  }

  getAllTasks() {
  return this.http.get<any[]>(`${this.API_URL}`);
}

  // ✅ Mark task as completed (ONLY THIS ONE)
  completeTask(taskId: string) {
    return this.http.put<any>(
      `${this.API_URL}/${taskId}/complete`,
      { completedAt: new Date() }
    );
  }

  // Get summary
  getTodaySummary(): Observable<any> {
    return this.http.get(`${this.API_URL}/summary/today`);
  }
}
