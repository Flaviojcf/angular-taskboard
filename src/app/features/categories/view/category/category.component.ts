import { Component } from '@angular/core';
import { ColorsListComponent } from '@categoryComponents/colors-list/colors-list.component';
import { MainListComponent } from '@categoryComponents/main-list/main-list.component';

const COMPONENTS = [MainListComponent, ColorsListComponent];

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [...COMPONENTS],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
})
export class CategoryComponent {}
