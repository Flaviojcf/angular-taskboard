import { Component, computed, DestroyRef, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { delay, finalize } from 'rxjs';
import { CommonModule } from '@angular/common';
import { SnackBarService } from '../../../../../shared/services/snack-bar.service';
import { CategoryService } from '../../../../categories/services/category.service';
import { createTaskForm } from '../../../constants/create-task-form.component';
import { Task } from '../../../model/task.model';
import { TaskService } from '../../../services/task.service';

const MODULES = [
  ReactiveFormsModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  CommonModule,
];

@Component({
  selector: 'app-include-task-form',
  imports: [...MODULES],
  templateUrl: './include-task-form.component.html',
  styleUrl: './include-task-form.component.scss',
})
export class IncludeTaskFormComponent {
  private readonly categoryService = inject(CategoryService);
  private readonly taskService = inject(TaskService);
  private readonly snackBarService = inject(SnackBarService);
  public destroy$ = inject(DestroyRef);

  public readonly categories = this.categoryService.categories;

  public newTaskForm = createTaskForm();

  public selectionChangeHandler(event: MatSelectChange): void {
    const categoryId = event.value;
    this.categoryService.selectedCategoryId.set(categoryId);
  }

  public isIncludeTaskFormDisabled = computed(() => {
    if (this.taskService.isLoadingTask()) {
      this.newTaskForm.disable();

      return this.taskService.isLoadingTask();
    }

    this.newTaskForm.enable();

    return this.taskService.isLoadingTask();
  });

  public onEnterToAddATask(): void {
    if (this.newTaskForm.invalid) return;

    this.taskService.isLoadingTask.set(true);

    const { title, categoryId } = this.newTaskForm.value;

    const newTask: Partial<Task> = {
      title,
      categoryId,
      isCompleted: false,
    };
    this.taskService
      .createTask(newTask)
      .pipe(
        // delay(4000),
        finalize(() => this.taskService.isLoadingTask.set(false)),
        takeUntilDestroyed(this.destroy$)
      )
      .subscribe({
        next: task => this.taskService.insertATaskInTheTasksList(task),
        error: error => {
          this.snackBarConfigHandler(error.message);
        },
        complete: () => this.snackBarConfigHandler('Tarefa incluída'),
      });
    this.newTaskForm.reset();
  }

  public snackBarConfigHandler(message: string): void {
    this.snackBarService.showSnackBar(message, 2000, 'end', 'top');
  }
}
