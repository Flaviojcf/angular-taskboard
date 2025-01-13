import { HttpErrorResponse, provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { TaskService } from './task.service';
import {
  task,
  TASK_INTERNAL_SERVER_ERROR_RESPONSE,
  TASK_UNPROCESSIBLE_ENTITY_RESPONSE,
  tasks,
} from '../../../__mocks__/tasks';
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
      taskService.getTasks().subscribe(response => {
        expect(response).toEqual(MOCKED_TASKS);
        expect(taskService.tasks()).toEqual(MOCKED_TASKS);
      });
      const req = httpTestingController.expectOne(`${baseUrl}/tasks`);
      req.flush(MOCKED_TASKS);

      expect(req.request.method).toEqual('GET');
    }));

    it('should throw an error when server return Internal server error', waitForAsync(() => {
      let httErrorResponse: HttpErrorResponse | undefined;

      taskService.getTasks().subscribe({
        next: () => {
          fail('failed to fetch the tasks list');
        },
        error: (error: HttpErrorResponse) => {
          httErrorResponse = error;
        },
      });

      const req = httpTestingController.expectOne(`${baseUrl}/tasks`);

      req.flush('Internal server error', TASK_INTERNAL_SERVER_ERROR_RESPONSE);

      if (!httErrorResponse) {
        throw new Error('Error needs to be defined');
      }

      expect(httErrorResponse.status).toEqual(500);
      expect(httErrorResponse.statusText).toEqual('Internal Server Error');
    }));
  });

  describe('createTask', () => {
    it('should create a new task', waitForAsync(() => {
      let task: Task | undefined;

      taskService.createTask(MOCKED_TASK).subscribe(response => {
        task = response;
      });

      const req = httpTestingController.expectOne(`${baseUrl}/tasks`);

      req.flush(MOCKED_TASK);

      expect(req.request.method).toEqual('POST');
    }));

    it('should throw unprocessable entity with invalid body', waitForAsync(() => {
      let httErrorResponse: HttpErrorResponse | undefined;

      taskService.createTask(MOCKED_TASK).subscribe({
        next: () => {
          fail('failed to add a new task');
        },
        error: (error: HttpErrorResponse) => {
          httErrorResponse = error;
        },
      });

      const req = httpTestingController.expectOne(`${baseUrl}/tasks`);

      req.flush('Unprocessable Entity', TASK_UNPROCESSIBLE_ENTITY_RESPONSE);

      if (!httErrorResponse) {
        throw new Error('Error needs to be defined');
      }

      expect(httErrorResponse.status).toEqual(422);
      expect(httErrorResponse.statusText).toEqual('Unprocessable Entity');
    }));
  });

  describe('updateTask', () => {
    it('should update a task', waitForAsync(() => {
      taskService.tasks.set([MOCKED_TASK]);

      const updatedTask = MOCKED_TASK;
      updatedTask.title = 'Ir na academia treinar perna';

      taskService.updateTask(updatedTask).subscribe(() => {
        expect(taskService.tasks()[0].title).toEqual(
          'Ir na academia treinar perna'
        );
      });

      const req = httpTestingController.expectOne(
        `${baseUrl}/tasks/${updatedTask.id}`
      );

      req.flush(MOCKED_TASK);

      expect(req.request.method).toEqual('PUT');
    }));

    it('should throw unprocessable entity with invalid body when update a task', waitForAsync(() => {
      let httErrorResponse: HttpErrorResponse | undefined;
      taskService.tasks.set([MOCKED_TASK]);

      const updatedTask = MOCKED_TASK;
      updatedTask.title = 'Ir na academia treinar perna';

      taskService.updateTask(updatedTask).subscribe({
        next: () => {
          fail('failed to update a task');
        },
        error: (error: HttpErrorResponse) => {
          httErrorResponse = error;
        },
      });

      const req = httpTestingController.expectOne(
        `${baseUrl}/tasks/${updatedTask.id}`
      );

      req.flush('Unprocessable Entity', TASK_UNPROCESSIBLE_ENTITY_RESPONSE);

      if (!httErrorResponse) {
        throw new Error('Error needs to be defined');
      }

      expect(httErrorResponse.status).toEqual(422);
      expect(httErrorResponse.statusText).toEqual('Unprocessable Entity');
    }));
  });

  describe('updateIsCompletedStatus', () => {
    it('should update IsCompletedStatus of a task', waitForAsync(() => {
      taskService.tasks.set(MOCKED_TASKS);
      const updatedTask = MOCKED_TASK;

      taskService
        .updateIsCompletedStatus(updatedTask.id, true)
        .subscribe(() => {
          expect(taskService.tasks()[0].isCompleted).toBeTruthy();
        });

      const req = httpTestingController.expectOne(
        `${baseUrl}/tasks/${updatedTask.id}`
      );

      req.flush({ isCompleted: true });

      expect(req.request.method).toEqual('PATCH');
    }));

    it('should throw an error when update a task isCompleted Status', waitForAsync(() => {
      let httErrorResponse: HttpErrorResponse | undefined;
      taskService.tasks.set([MOCKED_TASK]);

      const updatedTask = MOCKED_TASK;

      taskService.updateIsCompletedStatus(updatedTask.id, true).subscribe({
        next: () => {
          fail('failed to update a task isCompleted Status');
        },
        error: (error: HttpErrorResponse) => {
          httErrorResponse = error;
        },
      });

      const req = httpTestingController.expectOne(
        `${baseUrl}/tasks/${updatedTask.id}`
      );

      req.flush('Unprocessable Entity', TASK_UNPROCESSIBLE_ENTITY_RESPONSE);

      if (!httErrorResponse) {
        throw new Error('Error needs to be defined');
      }

      expect(httErrorResponse.status).toEqual(422);
      expect(httErrorResponse.statusText).toEqual('Unprocessable Entity');
    }));
  });

  describe('deleteTask', () => {
    it('should delete a task', waitForAsync(() => {
      taskService.tasks.set([MOCKED_TASK]);

      taskService.deleteTask(MOCKED_TASK.id).subscribe(() => {
        expect(taskService.tasks().length).toEqual(0);
      });

      const req = httpTestingController.expectOne(
        `${baseUrl}/tasks/${MOCKED_TASK.id}`
      );

      req.flush(null);

      expect(req.request.method).toEqual('DELETE');
    }));

    it('should throw an error when delete a task', waitForAsync(() => {
      let httErrorResponse: HttpErrorResponse | undefined;
      taskService.tasks.set([MOCKED_TASK]);

      taskService.deleteTask(MOCKED_TASK.id).subscribe({
        next: () => {
          fail('failed to update a task isCompleted Status');
        },
        error: (error: HttpErrorResponse) => {
          httErrorResponse = error;
        },
      });

      const req = httpTestingController.expectOne(
        `${baseUrl}/tasks/${MOCKED_TASK.id}`
      );

      req.flush('Unprocessable Entity', TASK_UNPROCESSIBLE_ENTITY_RESPONSE);

      if (!httErrorResponse) {
        throw new Error('Error needs to be defined');
      }

      expect(httErrorResponse.status).toEqual(422);
      expect(httErrorResponse.statusText).toEqual('Unprocessable Entity');
    }));
  });
});
