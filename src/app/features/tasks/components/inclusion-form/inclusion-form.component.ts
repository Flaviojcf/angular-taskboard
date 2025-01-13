import { Component, inject } from '@angular/core';
import { IncludeTaskFormComponent } from './include-task-form/include-task-form.component';
import { CategoryService } from '../../../categories/services/category.service';
import { CommonModule } from '@angular/common';
import { categoryIdBackgroundColors } from '../../../categories/constants/category-color';

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

  public readonly categories = this.categoryService.categories();

  public readonly selectedCategoryId = this.categoryService.selectedCategoryId;

  public colorVariants = categoryIdBackgroundColors;
}
