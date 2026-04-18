import { G } from "./g.js";
const world = {};
world.gridCols = 10;
world.gridRows = 10;
world.cellWidth = G.CANVAS_SIZE;
world.cellHeight = G.CANVAS_SIZE;
world.width = G.CANVAS_SIZE * world.gridCols;
world.height = G.CANVAS_SIZE * world.gridRows;
world.center = {
    x: world.width / 2,
    y: world.height / 2,
}
export {world};