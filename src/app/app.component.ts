import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { TodoRepository } from './repository/todo.repository';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
    selector: 'todo-root',
    standalone: true,
    imports: [
        CardModule,
        ReactiveFormsModule,
        InputTextModule,
        InputGroupModule,
        ButtonModule,
        DividerModule,
        CommonModule,
        CheckboxModule,
    ],
    template: `
        <p-card
            header="Todo App"
            subheader="Powered by Angular, Elf & PrimeNG"
            [formGroup]="form"
        >
            <p-inputGroup>
                <input
                    type="text"
                    pInputText
                    class="p-inputtext-lg"
                    formControlName="text"
                    placeholder="Enter your task to complete !"
                    (keyup.enter)="onAddTodo()"
                />
                <button
                    type="button"
                    pButton
                    icon="pi pi-plus"
                    (click)="onAddTodo()"
                ></button>
            </p-inputGroup>

            <p-divider />

            @if (todoRepo.todos$ | async; as todos) { @if (todos.length > 0) {
            @for (todo of todos; track todo.id) {
            <div class="todo-div">
                <p-checkbox
                    [ngClass]="{'label-crossed': todo.done}"
                    label="{{ todo.name }}"
                    [binary]="true"
                    (onChange)="onToggleDone(todo.id)"
                />
                <p-button
                    icon="pi pi-trash"
                    (click)="onDeleteTodo(todo.id)"
                />
            </div>
            } } @else {
            <p>No todos yet !</p>
            } }
        </p-card>
    `,
    styles: `
        :host{
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        p-card {
            width: 50%;
            text-align: center;
        }

        .todo-div{
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
        }

        .label-crossed {
            text-decoration: line-through;
        }
    `,
})
export class AppComponent {
    form = this.fb.group({
        text: '',
    });

    constructor(private fb: FormBuilder, public todoRepo: TodoRepository) {}

    onAddTodo() {
        this.todoRepo.addNewTodo(this.form.value.text!);
    }

    onToggleDone(id: number) {
        this.todoRepo.checkTodo(id);
    }

    onDeleteTodo(id: number) {
        this.todoRepo.deleteTodo(id);
    }
}
