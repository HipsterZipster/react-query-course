export const angularComponentCode = `
// post.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Post {
  id: number;
  title: string;
  content: string;
  authorId: number;
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class PostService {
  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>('/api/posts');
  }
}

// posts-suspense.component.ts
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Post, PostService } from './post.service';

@Component({
  selector: 'app-posts-suspense',
  templateUrl: './posts-suspense.component.html',
})
export class PostsSuspenseComponent implements OnInit {
  posts$!: Observable<Post[]>;
  error: any = null;

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.posts$ = this.postService.getPosts().pipe(
      catchError(err => {
        this.error = err;
        // In a real app, you might return an empty array or re-throw
        return of([]); 
      })
    );
  }
}
`;

export const angularTemplateCode = `
<!-- posts-suspense.component.html -->
<div *ngIf="posts$ | async as posts; else loadingOrError" class="border rounded divide-y">
  <div *ngFor="let post of posts" class="p-3">
    <h3 class="font-medium">{{ post.title }}</h3>
    <p class="text-sm text-gray-600">{{ post.content.substring(0, 100) }}...</p>
    <div class="mt-1 text-xs text-gray-500">
      Author ID: {{ post.authorId }} | {{ post.createdAt | date }}
    </div>
  </div>
</div>

<ng-template #loadingOrError>
  <!-- Error State -->
  <div *ngIf="error; else loading" class="p-6 bg-red-50 border border-red-200 rounded-lg">
    <h3 class="text-red-700 font-medium mb-2">Something went wrong</h3>
    <p class="text-red-600">{{ error.message }}</p>
  </div>
</ng-template>

<ng-template #loading>
  <!-- Loading State -->
  <div class="p-8 text-center">
    <div class="inline-block animate-spin border-4 border-gray-300 border-t-blue-600 rounded-full h-8 w-8 mb-2"></div>
    <p>Loading data with the async pipe...</p>
  </div>
</ng-template>
`;
