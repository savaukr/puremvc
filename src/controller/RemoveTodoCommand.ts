import { SimpleCommand, INotification } from "@puremvc/puremvc-typescript-multicore-framework";
import { TodoProxy } from "../model/TodoProxy";

export class RemoveTodoCommand extends SimpleCommand {
    execute(notification: INotification): void {
        const id = notification.body as number;
        const proxy = this.facade.retrieveProxy(TodoProxy.NAME) as TodoProxy;
        proxy.removeTodo(id);
    }
}
