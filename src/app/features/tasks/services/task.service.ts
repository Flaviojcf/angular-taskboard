import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '@environment/environment';
import { Task } from '@taskModel/task.model';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _apiUrl = environment.apiUrl;

  public tasks = signal<Task[]>([]);
  public numberOfTasks = computed(() => this.tasks().length);

  public isLoadingTask = signal(false);

  public getTasks(): Observable<Task[]> {
    return this._httpClient.get<Task[]>(`${this._apiUrl}/tasks`).pipe(
      tap(tasks => {
        const sortedTasks = this.getSortedTasks(tasks);
        this.tasks.set(sortedTasks);
      })
    );
  }

  public getSortedTasks(tasks: Task[]): Task[] {
    return tasks.sort((a, b) => a.title?.localeCompare(b.title));
  }

  public createTask(task: Partial<Task>): Observable<Task> {
    return this._httpClient.post<Task>(`${this._apiUrl}/tasks`, task);
  }

  public updateTask(updatedTask: Task): Observable<Task> {
    return this._httpClient
      .put<Task>(`${this._apiUrl}/tasks/${updatedTask.id}`, updatedTask)

      .pipe(tap(task => this.updateATaskInTheTasksList(task)));
  }

  public insertATaskInTheTasksList(newTask: Task): void {
    this.tasks.update(tasks => {
      const newTasksList = [...tasks, newTask];
      return this.getSortedTasks(newTasksList);
    });
  }

  public updateATaskInTheTasksList(updatedTask: Task): void {
    this.tasks.update(tasks => {
      const allTasksWithUpdatedTaskRemoved = tasks.filter(
        task => task.id !== updatedTask.id
      );

      const updatedTaskList = [...allTasksWithUpdatedTaskRemoved, updatedTask];
      return this.getSortedTasks(updatedTaskList);
    });
  }

  public updateIsCompletedStatus(
    taskId: string,
    isCompleted: boolean
  ): Observable<Task> {
    return this._httpClient
      .patch<Task>(`${this._apiUrl}/tasks/${taskId}`, {
        isCompleted,
      })
      .pipe(tap(task => this.updateATaskInTheTasksList(task)));
  }

  public deleteTask(taskId: string): Observable<Task> {
    return this._httpClient
      .delete<Task>(`${this._apiUrl}/tasks/${taskId}`)
      .pipe(tap(() => this.deleteATaskInTheTasksList(taskId)));
  }

  public deleteATaskInTheTasksList(taskId: string): void {
    this.tasks.update(tasks => tasks.filter(task => task.id !== taskId));
  }
}
