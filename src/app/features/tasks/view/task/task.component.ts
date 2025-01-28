import { Component } from '@angular/core';
import { InclusionFormComponent } from '../../components/inclusion-form/inclusion-form.component';
import { IncludeTaskFormComponent } from '../../components/inclusion-form/include-task-form/include-task-form.component';
import { ListTasksComponent } from '../../components/list-tasks/list-tasks.component';

const COMPONENTS = [InclusionFormComponent];
@Component({
  selector: 'app-task',
  imports: [...COMPONENTS, IncludeTaskFormComponent, ListTasksComponent],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})
export class TaskComponent {}
