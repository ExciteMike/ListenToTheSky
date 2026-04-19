import { config } from "./config.js";
import { G } from "./g.js";

let followers = [];

export function addFollower(x, y, item) {
    followers.push({x, y, item});
}
function drawFollower(f) {
    const {x, y, item} = f;
    noStroke();
    fill(config.followers.boxColor);
    rect(
        x-0.5*config.followers.w, 
        y-0.5*config.followers.h,
        config.followers.w,
        config.followers.h,
        config.followers.r);
    fill(config.followers.textColor);
    text(item, x, y);
}
export function drawFollowers() {
    followers.forEach(drawFollower);
}
export function hasItem(searchItem) {
    for (let i=0;i<followers.length;++i) {
        const {item} = followers[i];
        if (item==searchItem) {
            return true;
        }
    }
    return false;
}
export function updateFollowers() {
    let prevX = G.ship.x,
        prevY = G.ship.y;
    for (let i=0;i<followers.length;++i) {
        const f = followers[i],
              {x, y} = f,
              ox = x-prevX,
              oy = y-prevY,
              d = mag(ox, oy),
              nx = ox/d,
              ny = oy/d,
              tx = prevX + config.followers.distance*nx,
              ty = prevY + config.followers.distance*ny;
        f.x = lerp(f.x, tx, config.followers.ease);
        f.y = lerp(f.y, ty, config.followers.ease);
        prevX = f.x;
        prevY = f.y;
    }
}
export function removeFollower(searchItem) {
    for (let i=0;i<followers.length;++i) {
        const {item} = followers[i];
        if (item==searchItem) {
            followers.splice(i,1);
            return;
        }
    }
}