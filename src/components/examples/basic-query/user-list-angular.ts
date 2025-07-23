export const angularComponentCode = `
// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(shouldError: boolean): Observable<User[]> {
    const url = shouldError ? '/api/users?error=true' : '/api/users';
    return this.http.get<User[]>(url);
  }
}

// user-list.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User, UserService } from './user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
})
export class UserListComponent implements OnInit {
  @Input() shouldError: boolean = false;
  users$!: Observable<User[]>;
  error: any = null;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.error = null;
    this.users$ = this.userService.getUsers(this.shouldError).pipe(
      catchError(err => {
        this.error = err;
        return of([]);
      })
    );
  }
}
`;

export const angularTemplateCode = `
<!-- user-list.component.html -->
<div *ngIf="users$ | async as users; else loadingOrError">
  <div class="flex justify-between items-center mb-4">
    <h3 class="font-medium">User List</h3>
    <button (click)="fetchUsers()" class="px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded text-sm">
      Refetch
    </button>
  </div>

  <ul class="divide-y border rounded">
    <li *ngFor="let user of users" class="p-3 hover:bg-gray-50">
      <div class="font-medium">{{ user.name }}</div>
      <div class="text-sm text-gray-500">{{ user.email }}</div>
      <div class="text-xs mt-1 inline-block px-2 py-1 bg-gray-100 rounded-full">
        {{ user.role }}
      </div>
    </li>
  </ul>
</div>

<ng-template #loadingOrError>
  <div *ngIf="error; else loading" class="p-6 bg-red-50 border border-red-200 rounded-lg">
    <h3 class="text-red-700 font-medium mb-2">Error Loading Users</h3>
    <p class="text-red-600 mb-4">{{ error.message }}</p>
    <button (click)="fetchUsers()" class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
      Try Again
    </button>
  </div>
</ng-template>

<ng-template #loading>
  <div class="p-8 text-center">
    <div class="inline-block animate-spin border-4 border-gray-300 border-t-blue-600 rounded-full h-8 w-8 mb-2"></div>
    <p>Loading users...</p>
  </div>
</ng-template>
`;
