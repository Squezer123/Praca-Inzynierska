export function generateLevel(mapSize, maxRooms, minRoomSize, maxRoomSize) {
    // defaults
    maxRooms = maxRooms || 12;
    minRoomSize = minRoomSize || 4;
    maxRoomSize = maxRoomSize || 14;

    // create empty grid of walls (1 == wall)
    var ret = [];
    for (var i = 0; i < mapSize.x; ++i) {
        ret.push([]);
        for (var j = 0; j < mapSize.y; ++j) {
            ret[i].push(1);
        }
    }

    // set a room as floors (0)
    function setFloor(room) {
        for (var i = room.x; i < room.x + room.w; ++i) {
            for (var j = room.y; j < room.y + room.h; ++j) {
                ret[i][j] = 0;
            }
        }
    }

    // check if a given room is valid - don't exit map and don't overlap another room
    function isValid(room) {
        var x = room.x;
        var y = room.y;
        var w = room.w;
        var h = room.h;

        // check boundaries
        if (x < 0 || x + w >= mapSize.x) return false;
        if (y < 0 || y + h >= mapSize.y) return false;

        // make sure there are no floors, i.e., not overlapping with another room
        for (var i = x - 1; i < x + w + 1; ++i) {
            for (var j = y - 1; j < y + h + 1; ++j) {
                if (ret[i] && ret[i][j] === 0) return false;
            }
        }

        return true;
    }

    // helper function to random between min and max
    function randMinMax(min, max) {
        return Math.ceil(Math.random() * (max - min)) + min;
    }

    // method to create a single random room
    function createRandomRoom() {
        var x = Math.floor(Math.random() * (mapSize.x - maxRoomSize - 2)) + 1;
        var y = Math.floor(Math.random() * (mapSize.y - maxRoomSize - 2)) + 1;
        var w = randMinMax(minRoomSize, maxRoomSize);
        var h = randMinMax(minRoomSize, maxRoomSize);
        return { x: x, y: y, w: w, h: h };
    }

    // list with all rooms to return
    var allRooms = [];
    var allDoors = [];

    // create the first room
    var room = createRandomRoom();
    if (isValid(room)) {
        setFloor(room);
        allRooms.push(room);
    }

    // function to grow the map
    function growMap() {
        var roomsLeft = maxRooms - allRooms.length;
        var directions = ['up', 'down', 'left', 'right'];

        while (roomsLeft > 0) {
            var baseRoom = allRooms[Math.floor(Math.random() * allRooms.length)];
            directions.sort(() => 0.5 - Math.random());

            for (var dir of directions) {
                if (roomsLeft <= 0) break;

                var newRoom = createRandomNeighborRoom(baseRoom, dir);
                if (isValid(newRoom)) {
                    setFloor(newRoom);
                    allRooms.push(newRoom);
                    roomsLeft--;
                    connectRooms(baseRoom, newRoom, dir);
                }
            }
        }
    }

    function createRandomNeighborRoom(baseRoom, dir) {
        var x, y, w, h;
        switch (dir) {
            case 'up':
                w = randMinMax(minRoomSize, maxRoomSize);
                h = randMinMax(minRoomSize, maxRoomSize);
                x = randMinMax(baseRoom.x, baseRoom.x + baseRoom.w - w);
                y = baseRoom.y - h - 1;
                break;
            case 'down':
                w = randMinMax(minRoomSize, maxRoomSize);
                h = randMinMax(minRoomSize, maxRoomSize);
                x = randMinMax(baseRoom.x, baseRoom.x + baseRoom.w - w);
                y = baseRoom.y + baseRoom.h + 1;
                break;
            case 'left':
                w = randMinMax(minRoomSize, maxRoomSize);
                h = randMinMax(minRoomSize, maxRoomSize);
                x = baseRoom.x - w - 1;
                y = randMinMax(baseRoom.y, baseRoom.y + baseRoom.h - h);
                break;
            case 'right':
                w = randMinMax(minRoomSize, maxRoomSize);
                h = randMinMax(minRoomSize, maxRoomSize);
                x = baseRoom.x + baseRoom.w + 1;
                y = randMinMax(baseRoom.y, baseRoom.y + baseRoom.h - h);
                break;
        }
        return { x: x, y: y, w: w, h: h };
    }

    function connectRooms(baseRoom, newRoom, dir) {
        var doorX, doorY;
        switch (dir) {
            case 'up':
                doorX = randMinMax(Math.max(baseRoom.x, newRoom.x), Math.min(baseRoom.x + baseRoom.w, newRoom.x + newRoom.w) - 1);
                doorY = baseRoom.y - 1;
                break;
            case 'down':
                doorX = randMinMax(Math.max(baseRoom.x, newRoom.x), Math.min(baseRoom.x + baseRoom.w, newRoom.x + newRoom.w) - 1);
                doorY = baseRoom.y + baseRoom.h;
                break;
            case 'left':
                doorX = baseRoom.x - 1;
                doorY = randMinMax(Math.max(baseRoom.y, newRoom.y), Math.min(baseRoom.y + baseRoom.h, newRoom.y + newRoom.h) - 1);
                break;
            case 'right':
                doorX = baseRoom.x + baseRoom.w;
                doorY = randMinMax(Math.max(baseRoom.y, newRoom.y), Math.min(baseRoom.y + baseRoom.h, newRoom.y + newRoom.h) - 1);
                break;
        }
        ret[doorX][doorY] = 0;
        allDoors.push({ x: doorX, y: doorY });
    }

    growMap();

    // try adding extra rooms if there's still space
    // function addExtraRooms(maxExtraRooms) {
    //     const directions = ['up', 'down', 'left', 'right']; // Definicja kierunków
    //     let extraRoomsAdded = 0; // Licznik dodanych dodatkowych pokoi
    //
    //     for (let i = 0; i < 10; i++) {
    //         if (extraRoomsAdded >= maxExtraRooms) break; // Zatrzymanie, jeśli osiągnięto limit
    //
    //         let newRoom = createRandomRoom();
    //         if (isValid(newRoom)) {
    //             setFloor(newRoom);
    //             allRooms.push(newRoom);
    //             extraRoomsAdded++; // Zwiększenie licznika
    //
    //             // Connect to a random existing room
    //             let baseRoom = allRooms[Math.floor(Math.random() * allRooms.length)];
    //             let dir = directions[Math.floor(Math.random() * directions.length)];
    //             connectRooms(baseRoom, newRoom, dir);
    //         }
    //     }
    // }

    // addExtraRooms();

    return { tiles: ret, rooms: allRooms, doors: allDoors };
}
