import Stack from "./Stack.js";
import Cell from "./Cell.js";
import Config from "./Config.js"

const shuffle = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
};

const DFS = async ({ root }, dataPoints) => {
    const stack = new Stack();
    const visitedNodes = new Set();

    // add enterance & exit nodes
    const enterance = new Cell(Config.minPosition, Config.minPosition);
    const exit = new Cell(Config.maxPosition, Config.maxPosition);
    visitedNodes.add(enterance);
    visitedNodes.add(exit);
    await dataPoints.update((visited) => (visited = [...visited, enterance]));
    await dataPoints.update((visited) => (visited = [...visited, exit]));

    let node;

    if (!root) {
        return;
    }

    stack.push(root);

    while (stack.size() > 0) {
        node = stack.pop();

        // find all valid children of the node
        let nodeChildren = [];
        // up child
        if (node.y - Config.step <= Config.maxPosition
            && node.y - Config.step >= Config.minPosition) {
            nodeChildren.push(new Cell(node.x, node.y - Config.step));
        }
        // // right child
        if (node.x + Config.step <= Config.maxPosition
            && node.x + Config.step >= Config.minPosition) {
            nodeChildren.push(new Cell(node.x + Config.step, node.y));
        }
        // left child
        if (node.x - Config.step >= Config.minPosition
            && node.x - Config.step <= Config.maxPosition) {
            nodeChildren.push(new Cell(node.x - Config.step, node.y));
        }
        // bottom child
        if (node.y + Config.step >= Config.minPosition
            && node.y + Config.step <= Config.maxPosition) {
            nodeChildren.push(new Cell(node.x, node.y + Config.step));
        }

        let validChildren = nodeChildren.filter(
            (cell) => !visitedNodes.has(JSON.stringify(cell))
        );

        shuffle([...validChildren]).forEach((cell) => {
            if (!visitedNodes.has(JSON.stringify(cell))) {
                stack.push(cell);
                visitedNodes.add(JSON.stringify(cell));
            }
        });

        if (validChildren.length !== 0) {
            await dataPoints.update((visited) => (visited = [...visited, node]));
        }
    }
};

export default DFS;