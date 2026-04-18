const WORLD = {};
WORLD.gridCols = 10;
WORLD.gridRows = 10;
WORLD.cellWidth = G.CANVAS_SIZE;
WORLD.cellHeight = G.CANVAS_SIZE;
WORLD.width = G.CANVAS_SIZE * WORLD.gridCols;
WORLD.height = G.CANVAS_SIZE * WORLD.gridRows;
WORLD.center = {
    x: WORLD.width / 2,
    y: WORLD.height / 2,
}