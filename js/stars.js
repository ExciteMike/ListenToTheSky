import { config } from "./config.js";
import { G } from "./g.js";
import { world } from "./world.js";
const STAR_SIZE_MIN = 2,
      STAR_SIZE_MAX = 4,
      MIN_STARS_IN_CELL = 60,
      MAX_STARS_IN_CELL = 180;
const starData = [];

export function drawStars() {
    stroke(config.color.star);
    strokeWeight(4);
    noFill();
    push();
        translate(
            -G.camera.x,
            -G.camera.y
        );
        const minRow = floor(G.camera.y / G.CANVAS_SIZE),
            minCol = floor(G.camera.x / G.CANVAS_SIZE),
            maxRow = minRow+2,
            maxCol=minCol+2;
        for (let row=minRow;row<maxRow;++row) {
            const rowData = starData[row];
            for (let col=minCol;col<maxCol;++col) {
                const cellData = rowData[col];
                for (const {x,y,s} of cellData) {
                    strokeWeight(s);
                    point(x,y);
                }
            }
        }
    pop();
}

function makeStarCell(row, col) {
    const stars = [],
        starCount = lerp(MIN_STARS_IN_CELL, MAX_STARS_IN_CELL, random())|0;
    for (let i=0;i<starCount;++i) {
        stars.push({
            x:(col+random()) * world.cellWidth,
            y:(row+random()) * world.cellHeight,
            s:random(STAR_SIZE_MIN,STAR_SIZE_MAX+1)|0
        });
    }
    return stars;
}

export function makeStars() {
    for (let row = 0; row<world.gridRows; ++row) {
        const rowData = [];
        for (let col = 0; col<world.gridCols; ++col) {
            rowData.push(makeStarCell(row, col));
        }
        starData.push(rowData);
    }
}