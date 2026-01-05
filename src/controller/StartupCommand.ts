import { SimpleCommand, INotification } from "@puremvc/puremvc-typescript-multicore-framework";
import { TodoProxy } from "../model/TodoProxy";
import { TodoListMediator } from "../view/TodoListMediator";
import { TodoListView } from "../view/components/TodoListView";

export class StartupCommand extends SimpleCommand {
    execute(notification: INotification): void {
        // Реєструємо Proxy
        this.facade.registerProxy(new TodoProxy());

        // Створюємо View і Mediator
        const view = new TodoListView();
        console.log("notification=", notification);
        this.facade.registerMediator(new TodoListMediator(view));
    }
}
