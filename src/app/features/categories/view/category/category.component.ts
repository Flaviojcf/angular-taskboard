import { Component } from '@angular/core';
import { MainListComponent } from '../../components/main-list/main-list.component';
import { ColorsListComponent } from '../../components/colors-list/colors-list.component';

const COMPONENTS = [MainListComponent, ColorsListComponent];

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [...COMPONENTS],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
})
export class CategoryComponent {}
