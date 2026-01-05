import { Proxy } from "@puremvc/puremvc-typescript-multicore-framework";
import { TodoVO } from "./vo/TodoVO";

export class TodoProxy extends Proxy {
    public static NAME = "TodoProxy";

    private todos: TodoVO[] = [];
    private nextId = 1;

    constructor() {
        super(TodoProxy.NAME);
    }

    addTodo(text: string): void {
        const todo = new TodoVO(this.nextId++, text);
        this.todos.push(todo);
        this.sendNotification("TODO_ADDED", todo);
    }

    removeTodo(id: number): void {
        this.todos = this.todos.filter((todo) => todo.id !== id);
        this.sendNotification("TODO_REMOVED", id);
    }

    toggleTodo(id: number): void {
        const todo = this.todos.find((todo) => todo.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.sendNotification("TODO_UPDATED", todo);
        }
    }

    getTodos(): TodoVO[] {
        return [...this.todos];
    }
}
