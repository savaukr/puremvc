import { SimpleCommand, INotification } from "@puremvc/puremvc-typescript-multicore-framework";
import { TodoProxy } from "../model/TodoProxy";

export class ToggleTodoCommand extends SimpleCommand {
    execute(notification: INotification): void {
        const id = notification.body as number;
        const proxy = this.facade.retrieveProxy(TodoProxy.NAME) as TodoProxy;
        proxy.toggleTodo(id);
    }
}
