import { SimpleCommand, INotification } from "@puremvc/puremvc-typescript-multicore-framework";
import { TodoProxy } from "../model/TodoProxy";

export class AddTodoCommand extends SimpleCommand {
    execute(notification: INotification): void {
        const text = notification.body as string;
        const proxy = this.facade.retrieveProxy(TodoProxy.NAME) as TodoProxy;
        proxy.addTodo(text);
    }
}
