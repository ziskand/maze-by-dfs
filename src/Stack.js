class Stack {
    constructor() {
        this.items = new Array();
    }

    push(item) {
        this.items.push(item);
    }

    pop() {
        return this.items.pop();
    }

    size() {
        return this.items.length;
    }
}

export default Stack;