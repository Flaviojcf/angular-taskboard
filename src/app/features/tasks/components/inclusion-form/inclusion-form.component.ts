import { Component, inject } from '@angular/core';
import { IncludeTaskFormComponent } from './include-task-form/include-task-form.component';
import { CommonModule } from '@angular/common';
import { CategoryService } from '@categoryService/category.service';
import { TaskService } from '@taskService/task.service';
import { categoryIdBackgroundColors } from '@categoryConstants/category-color';

const COMPONENTS = [IncludeTaskFormComponent];
const MODULES = [CommonModule];
@Component({
  selector: 'app-inclusion-form',
  standalone: true,
  imports: [...COMPONENTS, ...MODULES],
  templateUrl: './inclusion-form.component.html',
  styleUrl: './inclusion-form.component.scss',
})
export class InclusionFormComponent {
  private readonly categoryService = inject(CategoryService);
  public readonly taskService = inject(TaskService);

  public readonly categories = this.categoryService.categories();

  public readonly selectedCategoryId = this.categoryService.selectedCategoryId;

  public colorVariants = categoryIdBackgroundColors;
}
