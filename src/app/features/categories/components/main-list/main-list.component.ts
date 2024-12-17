import { Component, inject } from '@angular/core';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-main-list',
  standalone: true,
  imports: [],
  templateUrl: './main-list.component.html',
  styleUrl: './main-list.component.scss',
})
export class MainListComponent {
  private readonly categoryService = inject(CategoryService);

  public categories = this.categoryService.categories;
}
