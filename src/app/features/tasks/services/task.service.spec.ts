import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { TaskService } from './task.service';
import { task, tasks } from '../../../__mocks__/tasks';
import { Task } from '../model/task.model';

describe('Task Service', () => {
  let taskService: TaskService;
  let httpTestingController: HttpTestingController;
  const MOCKED_TASKS = tasks;
  const MOCKED_TASK = task;
  const baseUrl = 'http://localhost:3000';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    taskService = TestBed.inject(TaskService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('creates service', () => {
    expect(taskService).toBeTruthy();
  });

  it('getSortedTasks', () => {
    const sortedTasks = taskService.getSortedTasks(tasks);
    expect(sortedTasks[0].title).toEqual('Comprar pão na padaria');
  });

  describe('getTask', () => {
    it('should return a list of tasks', waitForAsync(() => {
      let tasks!: Task[] | undefined;

      taskService.getTasks().subscribe(response => {
        expect(response).toEqual(MOCKED_TASKS);
        expect(taskService.tasks()).toEqual(MOCKED_TASKS);
      });
      const req = httpTestingController.expectOne(`${baseUrl}/tasks`);
      req.flush(MOCKED_TASKS);

      expect(req.request.method).toEqual('GET');
    }));
  });
});
