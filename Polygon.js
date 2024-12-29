class Polygon {
    constructor(points) {
        this.points = points;
    }

    /**
     * Performs the even-odd-rule Algorithm (a raycasting algorithm) to find out whether a point is in this polygon.
     * This runs in O(n) where n is the number of edges of the polygon.
     *
     * @param {Array} point an array representation of the point where point[0] is its x Value and point[1] is its y Value
     * @return {boolean} whether the point is in the polygon (not on the edge, just turn < into <= and > into >= for that)
     */
    containsPoint(point) {
        let odd = false;
        for (let i = 0, j = this.points.length - 1; i < this.points.length; i++) {
            if (((this.points[i][1] > point[1]) !== (this.points[j][1] > point[1])) 
                && (point[0] < ((this.points[j][0] - this.points[i][0]) * (point[1] - this.points[i][1]) / (this.points[j][1] - this.points[i][1]) + this.points[i][0]))) {
                odd = !odd;
            }
            j = i;
        }
        return odd;
    }
}

/**
 * Checks if a point is inside any of the given polygons.
 *
 * @param {Array<Polygon>} polygons an array of Polygon objects.
 * @param {Array} point    an array representation of the point where point[0] is its x Value and point[1] is its y Value
 * @return {boolean} whether the point is in any of the polygons
 */
export const isPointInAnyPolygon = function (polygons, point) {
    for (const polygon of polygons) {
        if (polygon.containsPoint(point)) {
            return true;
        }
    }
    return false;
};

export const createPolygon = function (x,y,w,h=w){
    return new Polygon([
        [x, y],
        [x + w, y],
        [x + w, y + h],
        [x, y + h]
    ]);
}



export { Polygon };