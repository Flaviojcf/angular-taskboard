import { Component, inject } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../services/category.service';

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
