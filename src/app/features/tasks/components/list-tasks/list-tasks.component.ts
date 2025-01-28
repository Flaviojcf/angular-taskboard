import { Component, inject } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatBadgeModule } from '@angular/material/badge';
import { TaskService } from '../../services/task.service';
import { categoryIdBackgroundColors } from '../../../categories/constants/category-color';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../../categories/services/category.service';
import { DialogService } from '../../../../shared/services/dialog.service';

const MODULES = [MatCheckboxModule, MatBadgeModule, CommonModule];

@Component({
  selector: 'app-list-tasks',
  imports: [...MODULES],
  templateUrl: './list-tasks.component.html',
  styleUrl: './list-tasks.component.scss',
})
export class ListTasksComponent {
  private readonly taskService = inject(TaskService);
  private readonly categoryService = inject(CategoryService);
  private readonly dialogService = inject(DialogService);

  public readonly tasksQuantity = this.taskService.numberOfTasks;
  public readonly tasks = this.taskService.tasks;
  public colorVariants = categoryIdBackgroundColors;

  public readonly categories = this.categoryService.categories;

  public initialLetterOfCategory(categoryId: string): string | undefined {
    return this.categories()
      .find(x => x.id == categoryId)!
      .name.at(0);
  }

  public handleCompleteTask(taskId: string): void {
    this.taskService.updateIsCompletedStatus(taskId, true);
  }

  public openDialog(taskName: string): void {
    this.dialogService.openDialog('450px', '', '', {
      title: 'Deletar Task',
      content: 'Tem certeza que deseja deletar a task ',
      self: taskName,
    });
  }
}
