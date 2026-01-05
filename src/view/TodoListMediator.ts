import { Mediator, INotification } from "@puremvc/puremvc-typescript-multicore-framework";
import { TodoListView } from "./components/TodoListView";
import { TodoProxy } from "../model/TodoProxy";

export class TodoListMediator extends Mediator {
    public static NAME = "TodoListMediator";

    private view!: TodoListView;

    constructor(viewComponent: TodoListView) {
        super(TodoListMediator.NAME, viewComponent);
        this.view = viewComponent;

        // Підписатись на події UI
        this.setupListeners();
    }

    private setupListeners(): void {
        // Додати todo
        this.view.getAddButton().addEventListener("click", () => {
            this.handleAddTodo();
        });

        this.view.getInput().addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                this.handleAddTodo();
            }
        });

        // Делегування подій для списку
        this.view.getList().addEventListener("click", (e) => {
            const target = e.target as HTMLElement;

            // Видалити todo
            if (target.classList.contains("delete-btn")) {
                const id = parseInt(target.dataset.id || "0");
                this.sendNotification("REMOVE_TODO", id);
            }
        });

        this.view.getList().addEventListener("change", (e) => {
            const target = e.target as HTMLInputElement;

            // Перемкнути статус
            if (target.type === "checkbox") {
                const id = parseInt(target.dataset.id || "0");
                this.sendNotification("TOGGLE_TODO", id);
            }
        });
    }

    private handleAddTodo(): void {
        const text = this.view.getInput().value.trim();
        if (text) {
            this.sendNotification("ADD_TODO", text);
            this.view.clearInput();
        }
    }

    // Список нотифікацій, які слухає медіатор
    listNotificationInterests(): string[] {
        return ["TODO_ADDED", "TODO_REMOVED", "TODO_UPDATED"];
    }

    // Обробка нотифікацій
    handleNotification(notification: INotification): void {
        const proxy = this.facade.retrieveProxy(TodoProxy.NAME) as TodoProxy;

        switch (notification.name) {
            case "TODO_ADDED":
            case "TODO_REMOVED":
            case "TODO_UPDATED":
                // Оновити список
                this.view.renderTodos(proxy.getTodos());
                break;
        }
    }
}
