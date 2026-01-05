import { Facade } from "@puremvc/puremvc-typescript-multicore-framework";
import { StartupCommand } from "./controller/StartupCommand";
import { AddTodoCommand } from "./controller/AddTodoCommand";
import { RemoveTodoCommand } from "./controller/RemoveTodoCommand";
import { ToggleTodoCommand } from "./controller/ToggleTodoCommand";

export class ApplicationFacade extends Facade {
    private static CORE_NAME = "TodoApp";

    constructor() {
        super(ApplicationFacade.CORE_NAME);
    }

    static getInstance(): ApplicationFacade {
        if (!Facade.instanceMap[this.CORE_NAME]) {
            Facade.instanceMap[this.CORE_NAME] = new ApplicationFacade();
        }
        return Facade.instanceMap[this.CORE_NAME] as ApplicationFacade;
    }

    // Ініціалізація команд
    initializeController(): void {
        super.initializeController();

        this.registerCommand("STARTUP", () => new StartupCommand());
        this.registerCommand("ADD_TODO", () => new AddTodoCommand());
        this.registerCommand("REMOVE_TODO", () => new RemoveTodoCommand());
        this.registerCommand("TOGGLE_TODO", () => new ToggleTodoCommand());
    }

    // Запуск додатку
    startup(): void {
        this.sendNotification("STARTUP");
    }
}
