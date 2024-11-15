export const gridCells = n => {
    return n*16;
}

/**
 * Performs the even-odd-rule Algorithm (a raycasting algorithm) to find out whether a point is in a given polygon.
 * This runs in O(n) where n is the number of edges of the polygon.
 *
 * @param {Array} polygon an array representation of the polygon where polygon[i][0] is the x Value of the i-th point and polygon[i][1] is the y Value.
 * @param {Array} point   an array representation of the point where point[0] is its x Value and point[1] is its y Value
 * @return {boolean} whether the point is in the polygon (not on the edge, just turn < into <= and > into >= for that)
 */
export const pointInPolygon = function (polygon, point) {
    let odd = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; i++) {
        if (((polygon[i][1] > point[1]) !== (polygon[j][1] > point[1])) 
            && (point[0] < ((polygon[j][0] - polygon[i][0]) * (point[1] - polygon[i][1]) / (polygon[j][1] - polygon[i][1]) + polygon[i][0]))) {
            odd = !odd;
        }
        j = i;
    }
    return odd;
};

/**
 * Checks if a point is inside any of the given polygons.
 *
 * @param {Array} polygons an array of polygons where each polygon is an array of points.
 * @param {Array} point    an array representation of the point where point[0] is its x Value and point[1] is its y Value
 * @return {boolean} whether the point is in any of the polygons
 */
export const isPointInAnyPolygon = function (polygons, point) {
    for (const polygon of polygons) {
        if (pointInPolygon(polygon, point)) {
            return true;
        }
    }
    return false;
};


