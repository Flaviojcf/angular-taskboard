import { Component, inject, Output, EventEmitter } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { CategoryService } from '../../../../categories/services/category.service';

const COMPONENTS = [];

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
  public readonly categories = this.categoryService.categories;
  @Output() colorChange = new EventEmitter<string>();

  public selectionChangeHandler(event: MatSelectChange): void {
    const categoryId = event.value;

    const selectedCategory = this.categoryService
      .categories()
      .find(category => category.id === categoryId);

    if (selectedCategory) {
      this.colorChange.emit(selectedCategory.color);
    }
  }
}
