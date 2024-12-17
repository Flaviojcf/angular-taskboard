import { Component, inject } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { CategoryService } from '../../services/category.service';
import { CommonModule } from '@angular/common';

const MODULES = [MatDividerModule, CommonModule];

@Component({
  selector: 'app-colors-list',
  standalone: true,
  imports: [...MODULES],
  templateUrl: './colors-list.component.html',
  styleUrl: './colors-list.component.scss',
})
export class ColorsListComponent {
  private readonly categoryService = inject(CategoryService);

  public categories = this.categoryService.categories;
}
