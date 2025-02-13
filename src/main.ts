import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatToolbarModule,
  ],
  template: `
    <mat-toolbar color="primary">
      <span>Task Manager</span>
    </mat-toolbar>

    <div class="container">
      <mat-card>
        <mat-card-content>
          <div class="task-header">
            <mat-form-field class="full-width">
              <mat-label>New Task</mat-label>
              <input
                matInput
                [(ngModel)]="newTaskTitle"
                (keyup.enter)="addTask()"
                placeholder="What needs to be done?"
              />
            </mat-form-field>
            <button mat-raised-button color="primary" (click)="addTask()">
              Add Task
            </button>
          </div>
        </mat-card-content>
      </mat-card>

      <mat-card *ngFor="let task of tasks">
        <mat-card-content>
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <div style="display: flex; align-items: center; gap: 16px;">
              <mat-checkbox
                [(ngModel)]="task.completed"
                color="primary"
              ></mat-checkbox>
              <span [style.text-decoration]="task.completed ? 'line-through' : 'none'">
                {{ task.title }}
              </span>
            </div>
            <button mat-icon-button color="warn" (click)="deleteTask(task)">
              <mat-icon>delete</mat-icon>
            </button>
          </div>
        </mat-card-content>
      </mat-card>

      <mat-card *ngIf="tasks.length > 0">
        <mat-card-content>
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span>{{ tasks.length }} tasks total</span>
            <span>{{ completedTasks }} completed</span>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
})
export class App implements OnInit {
  tasks: Task[] = [];
  newTaskTitle = '';

  ngOnInit() {
    // Initialize with some sample tasks
    this.tasks = [
      { id: 1, title: 'Learn Angular', completed: false },
      { id: 2, title: 'Create a task app', completed: true },
      { id: 3, title: 'Add more features', completed: false },
    ];
  }

  get completedTasks(): number {
    return this.tasks.filter(task => task.completed).length;
  }

  addTask() {
    if (this.newTaskTitle.trim()) {
      const newTask: Task = {
        id: Date.now(),
        title: this.newTaskTitle,
        completed: false,
      };
      this.tasks.unshift(newTask);
      this.newTaskTitle = '';
    }
  }

  deleteTask(task: Task) {
    this.tasks = this.tasks.filter(t => t.id !== task.id);
  }
}

bootstrapApplication(App, {
  providers: [provideAnimations()]
});