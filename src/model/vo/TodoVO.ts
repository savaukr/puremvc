export class TodoVO {
    constructor(
        public id: number,
        public text: string,
        public completed: boolean = false,
    ) {
        this.id = id;
        this.text = text;
        this.completed = completed;
    }
}
