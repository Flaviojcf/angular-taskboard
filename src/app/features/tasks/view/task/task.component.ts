import { Component } from '@angular/core';
import { InclusionFormComponent } from '@taskComponents/inclusion-form/inclusion-form.component';

const COMPONENTS = [InclusionFormComponent];
@Component({
  selector: 'app-task',
  standalone: true,
  imports: [...COMPONENTS],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})
export class TaskComponent {}
