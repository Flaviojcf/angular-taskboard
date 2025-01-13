import { Component, inject } from '@angular/core';
import { IncludeTaskFormComponent } from './include-task-form/include-task-form.component';
import { CategoryService } from '../../../categories/services/category.service';
import { CommonModule } from '@angular/common';

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

  public selectedColor = 'blue';

  public readonly categories = this.categoryService.categories();

  public handleColorChange(color: string): void {
    this.selectedColor = color;
  }
}
