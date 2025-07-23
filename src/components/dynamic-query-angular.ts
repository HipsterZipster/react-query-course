export const angularComponentCode = `
// user.service.ts (shared from basic example)

// dynamic-user-list.component.ts
import { Component } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { User, UserService } from './user.service';

@Component({
  selector: 'app-dynamic-user-list',
  templateUrl: './dynamic-user-list.component.html',
})
export class DynamicUserListComponent {
  userId$ = new BehaviorSubject<number>(1);
  user$: Observable<User | null>;
  error: any = null;

  constructor(private userService: UserService) {
    this.user$ = this.userId$.pipe(
      switchMap(id => 
        this.userService.getUser(id).pipe(
          catchError(err => {
            this.error = err;
            return of(null);
          })
        )
      )
    );
  }

  selectUser(id: number) {
    this.error = null;
    this.userId$.next(id);
  }
}
`;

export const angularTemplateCode = `
<!-- dynamic-user-list.component.html -->
<div class="space-y-4">
  <div>
    <label class="block text-sm font-medium mb-2">Select User ID:</label>
    <div class="flex gap-2">
      <button *ngFor="let id of [1, 2, 3, 4, 5]" 
        (click)="selectUser(id)" 
        [ngClass]="{
          'bg-blue-500 text-white': (userId$ | async) === id,
          'bg-gray-100 hover:bg-gray-200': (userId$ | async) !== id
        }" 
        class="px-3 py-1 rounded">
        {{ id }}
      </button>
    </div>
  </div>
  
  <div class="border rounded p-4 bg-gray-50">
    <h3 class="font-medium mb-2">Dynamic Query Result</h3>
    
    <div *ngIf="user$ | async as user; else loadingOrError">
      <div class="font-medium">{{ user.name }}</div>
      <div class="text-gray-600">{{ user.email }}</div>
      <div class="mt-1 text-xs bg-blue-100 rounded-full px-2 py-1 inline-block">
        {{ user.role }}
      </div>
    </div>

    <ng-template #loadingOrError>
      <p *ngIf="!error">Loading user...</p>
      <p *ngIf="error" class="text-red-500">{{ error.message }}</p>
    </ng-template>
  </div>
</div>
`;
