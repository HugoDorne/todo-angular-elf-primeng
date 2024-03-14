import { Injectable } from '@angular/core';
import { createStore } from '@ngneat/elf';
import {
    withEntities,
    selectAllEntities,
    addEntities,
    updateEntities,
    deleteEntities,
} from '@ngneat/elf-entities';

export interface Todo {
    id: number;
    name: string;
    done: boolean;
}

export const store = createStore({ name: 'todo' }, withEntities<Todo>());

@Injectable({ providedIn: 'root' })
export class TodoRepository {
    idSeq = 0;
    todos$ = store.pipe(selectAllEntities());

    addNewTodo(name: Todo['name']) {
        store.update(addEntities({ id: this.idSeq++, name, done: false }));
    }

    checkTodo(id: Todo['id']) {
        store.update(
            updateEntities(id, (todo) => ({ ...todo, done: !todo.done }))
        );
    }

    deleteTodo(id: Todo['id']) {
        store.update(deleteEntities(id));
    }
}
