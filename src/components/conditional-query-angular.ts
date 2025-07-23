export const angularComponentCode = `
// user.service.ts (shared from basic example)

// conditional-user-list.component.ts
import { Component } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { switchMap, catchError, filter } from 'rxjs/operators';
import { User, UserService } from './user.service';

@Component({
  selector: 'app-conditional-user-list',
  templateUrl: './conditional-user-list.component.html',
})
export class ConditionalUserListComponent {
  enabled$ = new BehaviorSubject<boolean>(false);
  userId$ = new BehaviorSubject<number>(1);
  user$: Observable<User | null>;
  error: any = null;

  constructor(private userService: UserService) {
    this.user$ = combineLatest([this.enabled$, this.userId$]).pipe(
      filter(([enabled, _]) => enabled),
      switchMap(([_, id]) => 
        this.userService.getUser(id).pipe(
          catchError(err => {
            this.error = err;
            return of(null);
          })
        )
      )
    );
  }

  toggleEnabled(enabled: boolean) {
    this.error = null;
    this.enabled$.next(enabled);
  }

  selectUser(id: number) {
    this.error = null;
    this.userId$.next(id);
  }
}
`;

export const angularTemplateCode = `
<!-- conditional-user-list.component.html -->
<div class="space-y-4">
  <div class="flex items-center gap-4">
    <div class="flex items-center">
      <input
        id="enable-query-angular"
        type="checkbox"
        [checked]="enabled$ | async"
        (change)="toggleEnabled($event.target.checked)"
        class="h-4 w-4 rounded border-gray-300 text-blue-600"
      />
      <label for="enable-query-angular" class="ml-2 block text-sm">
        Enable Query
      </label>
    </div>
    
    <div *ngIf="enabled$ | async" class="flex gap-2">
      <button *ngFor="let id of [1, 2, 3]" 
        (click)="selectUser(id)" 
        [ngClass]="{
          'bg-blue-500 text-white': (userId$ | async) === id,
          'bg-gray-100 hover:bg-gray-200': (userId$ | async) !== id
        }" 
        class="px-3 py-1 rounded">
        User {{ id }}
      </button>
    </div>
  </div>
  
  <div class="border rounded p-4 bg-gray-50">
    <h3 class="font-medium mb-2">Conditional Query Status</h3>
    
    <div *ngIf="!(enabled$ | async)" class="text-gray-500">
      Query disabled. Enable the query to fetch data.
    </div>

    <div *ngIf="enabled$ | async">
      <div *ngIf="user$ | async as user; else loadingOrError">
        <div class="font-medium">{{ user.name }}</div>
        <div class="text-gray-600">{{ user.email }}</div>
      </div>

      <ng-template #loadingOrError>
        <p *ngIf="!error">Loading user...</p>
        <p *ngIf="error" class="text-red-500">{{ error.message }}</p>
      </ng-template>
    </div>
  </div>
</div>
`;
