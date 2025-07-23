export const angularComponentCode = `
// multiple-queries.component.ts
import { Component } from '@angular/core';
import { BehaviorSubject, combineLatest, forkJoin, Observable, of } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { Post, User, UserService } from './user.service';

@Component({
  selector: 'app-multiple-queries',
  templateUrl: './multiple-queries.component.html',
})
export class MultipleQueriesComponent {
  // Dependent Queries
  authorId$ = new BehaviorSubject<number>(1);
  author$: Observable<User | null>;
  authorPosts$: Observable<Post[] | null>;
  authorError: any = null;
  postsError: any = null;

  // Parallel Queries
  postIds = [1, 2, 3];
  parallelPosts$: Observable<Post[]>;

  constructor(private userService: UserService) {
    // Dependent Query Logic
    this.author$ = this.authorId$.pipe(
      tap(() => { this.authorError = null; }),
      switchMap(id => 
        this.userService.getUser(id).pipe(
          catchError(err => {
            this.authorError = err;
            return of(null);
          })
        )
      )
    );

    this.authorPosts$ = this.author$.pipe(
      tap(() => { this.postsError = null; }),
      switchMap(author => 
        author ? this.userService.getPostsByAuthor(author.id).pipe(
          catchError(err => {
            this.postsError = err;
            return of(null);
          })
        ) : of(null)
      )
    );

    // Parallel Query Logic
    this.parallelPosts$ = forkJoin(
      this.postIds.map(id => this.userService.getPost(id))
    );
  }

  selectAuthor(id: number) {
    this.authorId$.next(id);
  }
}
`;

export const angularTemplateCode = `
<!-- multiple-queries.component.html -->
<div class="space-y-6">
  <!-- Dependent Queries -->
  <div>
    <h3 class="font-medium mb-2">Dependent Queries Example</h3>
    <div class="flex gap-2 mb-3">
      <button *ngFor="let id of [1, 2, 3, 4]" 
        (click)="selectAuthor(id)" 
        [ngClass]="{
          'bg-blue-500 text-white': (authorId$ | async) === id,
          'bg-gray-100 hover:bg-gray-200': (authorId$ | async) !== id
        }" 
        class="px-3 py-1 rounded">
        Author {{ id }}
      </button>
    </div>
    <div class="grid gap-4 md:grid-cols-2">
      <div class="border p-3 rounded bg-gray-50">
        <h4 class="font-medium mb-2">Author Query</h4>
        <div *ngIf="author$ | async as author; else authorLoadingOrError">
          <div class="font-medium">{{ author.name }}</div>
          <div class="text-sm text-gray-600">{{ author.email }}</div>
        </div>
        <ng-template #authorLoadingOrError>
          <p *ngIf="!authorError" class="text-sm">Loading author...</p>
          <p *ngIf="authorError" class="text-sm text-red-500">Error loading author</p>
        </ng-template>
      </div>
      <div class="border p-3 rounded bg-gray-50">
        <h4 class="font-medium mb-2">Author's Posts Query</h4>
        <div *ngIf="(author$ | async) === null && !authorError" class="text-sm text-gray-500">Waiting for author data...</div>
        <div *ngIf="authorPosts$ | async as posts; else postsLoadingOrError">
          <p class="text-sm">{{ posts.length }} posts found</p>
          <ul class="text-sm mt-1 space-y-1">
            <li *ngFor="let post of posts" class="truncate">• {{ post.title }}</li>
          </ul>
        </div>
        <ng-template #postsLoadingOrError>
          <p *ngIf="(author$ | async) && !postsError" class="text-sm">Loading posts...</p>
          <p *ngIf="postsError" class="text-sm text-red-500">Error loading posts</p>
        </ng-template>
      </div>
    </div>
  </div>

  <!-- Parallel Queries -->
  <div>
    <h3 class="font-medium mb-2">Parallel Queries Example</h3>
    <div class="border p-3 rounded bg-gray-50">
      <h4 class="font-medium mb-2">Multiple Post Queries</h4>
      <div *ngIf="parallelPosts$ | async as posts; else parallelLoading">
        <div class="grid gap-2 md:grid-cols-3 mt-2">
          <div *ngFor="let post of posts" class="p-2 border rounded">
            <div class="text-sm">
              <div class="font-medium truncate">{{ post.title }}</div>
              <div class="text-xs text-gray-500">ID: {{ post.id }}</div>
            </div>
          </div>
        </div>
      </div>
      <ng-template #parallelLoading>
        <p class="text-sm">Loading posts in parallel...</p>
      </ng-template>
    </div>
  </div>
</div>
`;
