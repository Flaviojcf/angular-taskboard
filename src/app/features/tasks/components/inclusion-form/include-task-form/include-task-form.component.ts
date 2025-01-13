import { Component, DestroyRef, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { CategoryService } from '../../../../categories/services/category.service';
import { createTaskForm } from '../../../constants/create-task-form.component';
import { Task } from '../../../model/task.model';
import { TaskService } from '../../../services/task.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

const MODULES = [
  ReactiveFormsModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
];

@Component({
  selector: 'app-include-task-form',
  standalone: true,
  imports: [...MODULES],
  templateUrl: './include-task-form.component.html',
  styleUrl: './include-task-form.component.scss',
})
export class IncludeTaskFormComponent {
  private readonly categoryService = inject(CategoryService);
  private readonly taskService = inject(TaskService);

  public readonly categories = this.categoryService.categories;

  public selectionChangeHandler(event: MatSelectChange): void {
    const categoryId = event.value;
    this.categoryService.selectedCategoryId.set(categoryId);
  }

  public newTaskForm = createTaskForm();

  public destroy$ = inject(DestroyRef);

  public onEnterToAddATask(): void {
    if (this.newTaskForm.invalid) return;

    const { title, categoryId } = this.newTaskForm.value;

    const newTask: Partial<Task> = {
      title,
      categoryId,
      isCompleted: true,
    };
    this.taskService
      .createTask(newTask)
      .pipe(takeUntilDestroyed(this.destroy$))
      .subscribe({
        next: task => this.taskService.insertATaskInTheTasksList(task),
        error: error => {
          throw new Error(error.message);
        },
        complete: () => alert('Tarefa icluída!'),
      });
  }
}
