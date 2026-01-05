import { TodoVO } from "../../model/vo/TodoVO";

export class TodoListView {
    private container: HTMLDivElement;
    private input: HTMLInputElement;
    private addButton: HTMLButtonElement;
    private list: HTMLUListElement;

    constructor() {
        this.container = document.createElement("div");
        this.container.className = "todo-app";

        // Інпут
        this.input = document.createElement("input");
        this.input.type = "text";
        this.input.placeholder = "Що потрібно зробити?";

        // Кнопка додавання
        this.addButton = document.createElement("button");
        this.addButton.textContent = "Додати";

        // Список
        this.list = document.createElement("ul");
        this.list.className = "todo-list";

        // Збірка
        this.container.appendChild(this.input);
        this.container.appendChild(this.addButton);
        this.container.appendChild(this.list);

        document.body.appendChild(this.container);
    }

    // Геттери для елементів
    getInput(): HTMLInputElement {
        return this.input;
    }

    getAddButton(): HTMLButtonElement {
        return this.addButton;
    }

    getList(): HTMLUListElement {
        return this.list;
    }

    // Очистити інпут
    clearInput(): void {
        this.input.value = "";
    }

    // Відрендерити список
    renderTodos(todos: TodoVO[]): void {
        this.list.innerHTML = "";

        todos.forEach((todo) => {
            const li = document.createElement("li");
            li.className = todo.completed ? "completed" : "";

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = todo.completed;
            checkbox.dataset.id = todo.id.toString();

            const text = document.createElement("span");
            text.textContent = todo.text;

            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "✕";
            deleteBtn.dataset.id = todo.id.toString();
            deleteBtn.className = "delete-btn";

            li.appendChild(checkbox);
            li.appendChild(text);
            li.appendChild(deleteBtn);
            this.list.appendChild(li);
        });
    }
}
