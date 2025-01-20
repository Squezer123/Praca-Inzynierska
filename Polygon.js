function logCpuUsage() {
    console.log("CPU usage information is not available in the browser environment.");
    // W przeglądarkach nie mamy dostępu do CPU w taki sam sposób, jak w Node.js.
    // Możemy jedynie sugerować użycie zewnętrznych narzędzi, takich jak devtools, aby monitorować CPU.
}

function logMemoryUsage() {
    if (performance.memory) {
        console.log('Memory Usage:');
        console.log(`Used JS Heap: ${(performance.memory.usedJSHeapSize / 1024 / 1024).toFixed(2)} MB`);
        console.log(`Total JS Heap: ${(performance.memory.totalJSHeapSize / 1024 / 1024).toFixed(2)} MB`);
        console.log(`JS Heap Limit: ${(performance.memory.jsHeapLimit / 1024 / 1024).toFixed(2)} MB`);
    } else {
        console.log("Memory usage information is not available in this browser.");
    }
}

class Polygon {
    constructor(points) {
        this.points = points;
    }

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

export const isPointInAnyPolygon = function (polygons, point) {
    for (const polygon of polygons) {
        if (polygon.containsPoint(point)) {
            return true;
        }
    }
    return false;
};

export const createPolygon = function (x, y, w, h = w) {
    return new Polygon([
        [x, y],
        [x + w, y],
        [x + w, y + h],
        [x, y + h]
    ]);
};

const generateRandomPolygon = (minX, minY, maxX, maxY) => {
    const x1 = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
    const y1 = Math.floor(Math.random() * (maxY - minY + 1)) + minY;
    const width = Math.floor(Math.random() * (maxX - x1 + 1)) + 1;
    const height = Math.floor(Math.random() * (maxY - y1 + 1)) + 1;

    return new Polygon([
        [x1, y1],
        [x1 + width, y1],
        [x1 + width, y1 + height],
        [x1, y1 + height],
    ]);
};

const generatePolygons = (numPolygons, minX, minY, maxX, maxY) => {
    const polygons = [];
    for (let i = 0; i < numPolygons; i++) {
        polygons.push(generateRandomPolygon(minX, minY, maxX, maxY));
    }
    return polygons;
};

const generateRandomPoints = (numPoints, minX, minY, maxX, maxY) => {
    const points = [];
    for (let i = 0; i < numPoints; i++) {
        const x = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
        const y = Math.floor(Math.random() * (maxY - minY + 1)) + minY;
        points.push([x, y]);
    }
    return points;
};

const testLargeDataset = (numPolygons, numPoints, minX, minY, maxX, maxY) => {
    const startTime = performance.now(); // Start pomiaru czasu

    logCpuUsage(); // Logowanie CPU
    logMemoryUsage(); // Logowanie pamięci

    const polygons = generatePolygons(numPolygons, minX, minY, maxX, maxY);
    const points = generateRandomPoints(numPoints, minX, minY, maxX, maxY);

    let pointsInPolygons = 0;
    let pointsOutsidePolygons = 0;

    points.forEach(point => {
        if (isPointInAnyPolygon(polygons, point)) {
            pointsInPolygons++;
        } else {
            pointsOutsidePolygons++;
        }
    });

    const endTime = performance.now(); // Stop pomiaru czasu

    console.log(`Total points: ${numPoints}`);
    console.log(`Points inside polygons: ${pointsInPolygons}`);
    console.log(`Points outside polygons: ${pointsOutsidePolygons}`);

    console.log(`Execution Time: ${(endTime - startTime).toFixed(2)}ms`);

    // Ponowne logowanie pamięci
    logMemoryUsage(); // Logowanie pamięci
};


export { Polygon };
