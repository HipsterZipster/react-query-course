// Create User Code Samples
export const createUserReactQueryCode = `import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../api/mock-api';

function CreateUserExample() {
  const queryClient = useQueryClient();
  
  const createUserMutation = useMutation({
    mutationFn: (newUser: { name: string; email: string }) => 
      api.createUser(newUser),
    onSuccess: () => {
      // Invalidate and refetch users list
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error) => {
      console.error('Failed to create user:', error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    
    createUserMutation.mutate({
      name: formData.get('name') as string,
      email: formData.get('email') as string,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          name="name"
          type="text"
          required
          className="w-full p-2 border rounded"
          disabled={createUserMutation.isPending}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          name="email"
          type="email"
          required
          className="w-full p-2 border rounded"
          disabled={createUserMutation.isPending}
        />
      </div>
      <button
        type="submit"
        disabled={createUserMutation.isPending}
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
      >
        {createUserMutation.isPending ? 'Creating...' : 'Create User'}
      </button>
      {createUserMutation.isError && (
        <p className="text-red-600">Error: {createUserMutation.error?.message}</p>
      )}
      {createUserMutation.isSuccess && (
        <p className="text-green-600">User created successfully!</p>
      )}
    </form>
  );
}`;

export const createUserVanillaCode = `import { useState } from 'react';
import { api } from '../api/mock-api';

function CreateUserVanilla() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await api.createUser({
        name: formData.get('name') as string,
        email: formData.get('email') as string,
      });
      
      setSuccess(true);
      // Manually trigger refetch of users list
      // This would require passing a callback or using a global state manager
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create user');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          name="name"
          type="text"
          required
          className="w-full p-2 border rounded"
          disabled={isLoading}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          name="email"
          type="email"
          required
          className="w-full p-2 border rounded"
          disabled={isLoading}
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
      >
        {isLoading ? 'Creating...' : 'Create User'}
      </button>
      {error && (
        <p className="text-red-600">Error: {error}</p>
      )}
      {success && (
        <p className="text-green-600">User created successfully!</p>
      )}
    </form>
  );
}`;

export const createUserAngularCode = `// create-user.component.ts
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-user',
  template: \`
    <form [formGroup]="userForm" (ngSubmit)="onSubmit()" class="space-y-4">
      <div>
        <label class="block text-sm font-medium mb-1">Name</label>
        <input
          formControlName="name"
          type="text"
          class="w-full p-2 border rounded"
          [disabled]="isLoading"
        />
      </div>
      <div>
        <label class="block text-sm font-medium mb-1">Email</label>
        <input
          formControlName="email"
          type="email"
          class="w-full p-2 border rounded"
          [disabled]="isLoading"
        />
      </div>
      <button
        type="submit"
        [disabled]="isLoading || userForm.invalid"
        class="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
      >
        {{ isLoading ? 'Creating...' : 'Create User' }}
      </button>
      <p *ngIf="error" class="text-red-600">Error: {{ error }}</p>
      <p *ngIf="success" class="text-green-600">User created successfully!</p>
    </form>
  \`
})
export class CreateUserComponent {
  userForm: FormGroup;
  isLoading = false;
  error: string | null = null;
  success = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  async onSubmit() {
    if (this.userForm.invalid) return;

    this.isLoading = true;
    this.error = null;
    this.success = false;

    try {
      await this.http.post('/api/users', this.userForm.value).toPromise();
      this.success = true;
      this.userForm.reset();
      // Manually trigger refetch of users list
      // This would require a service or state management
    } catch (err: any) {
      this.error = err.message || 'Failed to create user';
    } finally {
      this.isLoading = false;
    }
  }
}`;

// Optimistic Updates Code Samples
export const optimisticUpdateReactQueryCode = `import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api, User } from '../api/mock-api';

function UpdateUserOptimistic({ user }: { user: User }) {
  const queryClient = useQueryClient();
  
  const updateUserMutation = useMutation({
    mutationFn: (updatedUser: Partial<User>) => 
      api.updateUser(user.id, updatedUser),
    
    // Optimistic update
    onMutate: async (updatedUser) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['users'] });
      
      // Snapshot previous value
      const previousUsers = queryClient.getQueryData(['users']);
      
      // Optimistically update
      queryClient.setQueryData(['users'], (old: User[] | undefined) => 
        old?.map(u => u.id === user.id ? { ...u, ...updatedUser } : u)
      );
      
      return { previousUsers };
    },
    
    // Rollback on error
    onError: (err, updatedUser, context) => {
      queryClient.setQueryData(['users'], context?.previousUsers);
    },
    
    // Always refetch after success or error
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  const handleUpdate = (name: string) => {
    updateUserMutation.mutate({ name });
  };

  return (
    <div className="p-4 border rounded">
      <h3 className="font-medium">{user.name}</h3>
      <p className="text-sm text-gray-600">{user.email}</p>
      <button
        onClick={() => handleUpdate(user.name + ' (Updated)')}
        disabled={updateUserMutation.isPending}
        className="mt-2 px-3 py-1 bg-green-500 text-white rounded text-sm"
      >
        {updateUserMutation.isPending ? 'Updating...' : 'Update Name'}
      </button>
      {updateUserMutation.isError && (
        <p className="text-red-600 text-sm mt-1">
          Update failed: {updateUserMutation.error?.message}
        </p>
      )}
    </div>
  );
}`;

export const optimisticUpdateVanillaCode = `import { useState } from 'react';
import { api, User } from '../api/mock-api';

function UpdateUserVanilla({ 
  user, 
  onUserUpdate 
}: { 
  user: User; 
  onUserUpdate: (updatedUser: User) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [optimisticName, setOptimisticName] = useState(user.name);

  const handleUpdate = async (newName: string) => {
    setIsLoading(true);
    setError(null);
    
    // Optimistic update
    const previousName = optimisticName;
    setOptimisticName(newName);

    try {
      const updatedUser = await api.updateUser(user.id, { name: newName });
      onUserUpdate(updatedUser);
      setOptimisticName(updatedUser.name);
    } catch (err) {
      // Rollback optimistic update
      setOptimisticName(previousName);
      setError(err instanceof Error ? err.message : 'Update failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded">
      <h3 className="font-medium">{optimisticName}</h3>
      <p className="text-sm text-gray-600">{user.email}</p>
      <button
        onClick={() => handleUpdate(user.name + ' (Updated)')}
        disabled={isLoading}
        className="mt-2 px-3 py-1 bg-green-500 text-white rounded text-sm"
      >
        {isLoading ? 'Updating...' : 'Update Name'}
      </button>
      {error && (
        <p className="text-red-600 text-sm mt-1">Update failed: {error}</p>
      )}
    </div>
  );
}`;

export const optimisticUpdateAngularCode = `// update-user.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface User {
  id: number;
  name: string;
  email: string;
}

@Component({
  selector: 'app-update-user',
  template: \`
    <div class="p-4 border rounded">
      <h3 class="font-medium">{{ optimisticName }}</h3>
      <p class="text-sm text-gray-600">{{ user.email }}</p>
      <button
        (click)="handleUpdate(user.name + ' (Updated)')"
        [disabled]="isLoading"
        class="mt-2 px-3 py-1 bg-green-500 text-white rounded text-sm"
      >
        {{ isLoading ? 'Updating...' : 'Update Name' }}
      </button>
      <p *ngIf="error" class="text-red-600 text-sm mt-1">
        Update failed: {{ error }}
      </p>
    </div>
  \`
})
export class UpdateUserComponent {
  @Input() user!: User;
  @Output() userUpdated = new EventEmitter<User>();

  isLoading = false;
  error: string | null = null;
  optimisticName: string = '';

  ngOnInit() {
    this.optimisticName = this.user.name;
  }

  async handleUpdate(newName: string) {
    this.isLoading = true;
    this.error = null;
    
    // Optimistic update
    const previousName = this.optimisticName;
    this.optimisticName = newName;

    try {
      const updatedUser = await this.http.put<User>(
        \`/api/users/\${this.user.id}\`,
        { name: newName }
      ).toPromise();
      
      if (updatedUser) {
        this.userUpdated.emit(updatedUser);
        this.optimisticName = updatedUser.name;
      }
    } catch (err: any) {
      // Rollback optimistic update
      this.optimisticName = previousName;
      this.error = err.message || 'Update failed';
    } finally {
      this.isLoading = false;
    }
  }

  constructor(private http: HttpClient) {}
}`;

// Delete Operations Code Samples
export const deleteUserReactQueryCode = `import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api, User } from '../api/mock-api';

function DeleteUserExample({ user }: { user: User }) {
  const queryClient = useQueryClient();
  
  const deleteUserMutation = useMutation({
    mutationFn: (userId: number) => api.deleteUser(userId),
    onSuccess: () => {
      // Remove from cache and refetch
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  const handleDelete = () => {
    if (window.confirm(\`Are you sure you want to delete \${user.name}?\`)) {
      deleteUserMutation.mutate(user.id);
    }
  };

  return (
    <div className="p-4 border rounded">
      <h3 className="font-medium">{user.name}</h3>
      <p className="text-sm text-gray-600">{user.email}</p>
      <button
        onClick={handleDelete}
        disabled={deleteUserMutation.isPending}
        className="mt-2 px-3 py-1 bg-red-500 text-white rounded text-sm"
      >
        {deleteUserMutation.isPending ? 'Deleting...' : 'Delete User'}
      </button>
      {deleteUserMutation.isError && (
        <p className="text-red-600 text-sm mt-1">
          Delete failed: {deleteUserMutation.error?.message}
        </p>
      )}
    </div>
  );
}`;

export const deleteUserVanillaCode = `import { useState } from 'react';
import { api, User } from '../api/mock-api';

function DeleteUserVanilla({ 
  user, 
  onUserDeleted 
}: { 
  user: User; 
  onUserDeleted: (userId: number) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    if (!window.confirm(\`Are you sure you want to delete \${user.name}?\`)) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await api.deleteUser(user.id);
      onUserDeleted(user.id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded">
      <h3 className="font-medium">{user.name}</h3>
      <p className="text-sm text-gray-600">{user.email}</p>
      <button
        onClick={handleDelete}
        disabled={isLoading}
        className="mt-2 px-3 py-1 bg-red-500 text-white rounded text-sm"
      >
        {isLoading ? 'Deleting...' : 'Delete User'}
      </button>
      {error && (
        <p className="text-red-600 text-sm mt-1">Delete failed: {error}</p>
      )}
    </div>
  );
}`;

export const deleteUserAngularCode = `// delete-user.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface User {
  id: number;
  name: string;
  email: string;
}

@Component({
  selector: 'app-delete-user',
  template: \`
    <div class="p-4 border rounded">
      <h3 class="font-medium">{{ user.name }}</h3>
      <p class="text-sm text-gray-600">{{ user.email }}</p>
      <button
        (click)="handleDelete()"
        [disabled]="isLoading"
        class="mt-2 px-3 py-1 bg-red-500 text-white rounded text-sm"
      >
        {{ isLoading ? 'Deleting...' : 'Delete User' }}
      </button>
      <p *ngIf="error" class="text-red-600 text-sm mt-1">
        Delete failed: {{ error }}
      </p>
    </div>
  \`
})
export class DeleteUserComponent {
  @Input() user!: User;
  @Output() userDeleted = new EventEmitter<number>();

  isLoading = false;
  error: string | null = null;

  async handleDelete() {
    const confirmed = window.confirm(
      \`Are you sure you want to delete \${this.user.name}?\`
    );
    
    if (!confirmed) return;

    this.isLoading = true;
    this.error = null;

    try {
      await this.http.delete(\`/api/users/\${this.user.id}\`).toPromise();
      this.userDeleted.emit(this.user.id);
    } catch (err: any) {
      this.error = err.message || 'Delete failed';
    } finally {
      this.isLoading = false;
    }
  }

  constructor(private http: HttpClient) {}
}`;
