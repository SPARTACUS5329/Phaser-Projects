class Pathfinder extends Phaser.Scene {

        preload() {

        }
        create() {
                //Setting graphics for creating lines
                gameState.graphics = this.add.graphics({ lineStyle: { width: 1, color: 0x000000 } });
                this.createGrid();
                gameState.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
                //MAIN FUNCTION
                this.input.on('pointerdown', (pointer) => {
                        xPositionOfMouse = Math.floor(pointer.x / 20)
                        yPositionOfMouse = Math.floor(pointer.y / 20)
                        spot = gameState.spots[xPositionOfMouse][yPositionOfMouse];
                        switch (gameState.spotStatus) {
                                case 'start':
                                        start = spot;
                                        spot.makeStart();
                                        gameState.spotStatus = 'end'
                                        break;
                                case 'end':
                                        if (spot.makeEnd()) {
                                                end = spot;
                                                gameState.spotStatus = 'barrier'
                                                this.activateHoverDrawing();
                                        }
                                        break;
                                case 'barrier':
                                        spot.makeBarrier();
                                        //gameState.spotStatus = 'barrier'
                                        break;
                                default:
                                        return undefined
                        }

                });

                this.input.on('pointerover', (pointer) => {
                        if (!gameState.spotStatus === 'barrier' || !gameState.clickState) {
                                return false
                        }
                        xPositionOfMouse = Math.floor(pointer.x / 20)
                        yPositionOfMouse = Math.floor(pointer.y / 20)
                        spot = gameState.spots[xPositionOfMouse][yPositionOfMouse];
                        spot.makeBarrier();
                })

        }
        update() {
                if (gameState.spaceKey.isDown && !gameState.algorithmStarted) {
                        gameState.algorithmStarted = true;
                        gameState.spots.forEach((row) => {
                                row.forEach(spot => {
                                        spot.updateNeighbors(gameState.spots);
                                })
                        })
                        this.algorithm(gameState.spots, start, end);
                        //start.neighbors.forEach((spot)=>{spot.makeOpen()})
                }
        }

        createGrid() {
                for (let i = 0; i < 25; i++) {
                        gameState.grid.push([])
                        gameState.spots.push([])
                        for (let j = 0; j < 25; j++) {
                                gameState.grid[i].push(this.add.rectangle(i * 20 + 10, j * 20 + 10, 18, 18, 0x3399ff))
                                gameState.grid[i][j].setInteractive();
                                spot = new Spot(i, j, 20, 25);
                                gameState.spots[i].push(spot)


                        }
                }
                //Vertical lines creation
                for (let i = 0; i < 25; i++) {
                        line = new Phaser.Geom.Line(i * 20, 0, i * 20, 500)
                        gameState.graphics.strokeLineShape(line);
                }

                //Horizontal line creation
                for (let j = 0; j < 25; j++) {
                        line = new Phaser.Geom.Line(0, j * 20, 500, j * 20)
                        gameState.graphics.strokeLineShape(line);
                }
        }

        changeClickState() {
                if (gameState.clickState) {
                        gameState.clickState = false;
                } else {
                        gameState.clickState = true;
                }
        }

        activateHoverDrawing() {
                this.input.on('pointerdown', (pointer) => {
                        this.changeClickState();
                })
        }

        h(p1, p2) {
                x1 = p1[0]; x2 = p2[0];
                y1 = p1[1]; y2 = p2[1];
                return Math.abs(x1 - x2) + Math.abs(y1 - y2)
        }

        algorithm(grid, start, end) {
                count = 0;
                openSet = new PriorityQueue([0, count, start]);
                cameFrom = {};
                gScore = {};
                grid.forEach((row) => {
                        row.forEach((sp) => {
                                gScore[sp.coordString] = Infinity;
                        });
                });
                gScore[start] = 0;
                // for (var key in gScore){
                //         console.log(key, gScore[key])
                // }
                // return
                fScore = {};
                grid.forEach((row) => {
                        row.forEach((sp) => {
                                fScore[sp.coordString] = Infinity;
                        });
                });
                fScore[start.coordString] = this.h(start.getPos(), end.getPos());
                console.log(fScore, gScore)
                openSetHash = [start];
                //i = 0
                while (openSet.length()) {
                        // i++;
                        // if (i>4) {break;}
                        currentNode = openSet.get()[2]
                        currentNode.makeOpen()
                        openSetHash.splice(openSetHash.indexOf(currentNode))
                        if (currentNode === end) {
                                this.reconstruct_path(cameFrom, end, draw)
                                end.makeEnd()
                                return true
                        }

                        currentNode.neighbors.forEach((neighbor) => {
                                tempGScore = gScore[currentNode.coordString] + 1
                                // console.log(gScore[neighbor])
                                // return false
                                if (tempGScore < gScore[neighbor.coordString]) {
                                        console.log("Reaching if statement")
                                        cameFrom[neighbor.coordString] = currentNode
                                        gScore[neighbor.coordString] = tempGScore
                                        fScore[neighbor.coordString] = tempGScore + this.h(neighbor.getPos(), end.getPos())
                                        if (openSetHash.indexOf(neighbor) === -1) {
                                                count++;
                                                openSet.push((fScore[neighbor.coordString], count, neighbor))
                                                openSetHash.push(neighbor)
                                                console.log('reaching make open spot')
                                                neighbor.makeOpen()
                                        }
                                }
                        })
                        //draw();

                        if (currentNode != start) {
                                currentNode.makeClosed();
                        }
                }
                return false
        }
}

class Spot {
        constructor(row, col, width, totalRows) {
                this.row = row
                this.col = col
                this.x = row * width
                this.y = col * width
                this.color = WHITE
                this.neighbors = []
                this.width = width
                this.totalRows = totalRows
                this.coordString = `${this.row};${this.col}`

        }

        getPos() {
                return [this.row, this.col]
        }

        isClosed() {
                return this.color === RED
        }

        isOpen() {
                return this.color === GREEN
        }

        isBarrier() {
                return this.color === BLACK
        }

        isStart() {
                return this.color === ORANGE
        }

        isEnd() {
                return this.color === TURQUOISE
        }

        reset() {
                this.color = WHITE
        }

        makeClosed() {
                this.color = RED
                gameState.grid[this.row][this.col].fillColor = RED
        }

        makeOpen() {
                this.color = GREEN;
                gameState.grid[this.row][this.col].fillColor = GREEN
        }

        makeBarrier() {
                if (this.isStart() || this.isEnd()) {
                        return undefined
                }
                this.color = BLACK
                gameState.grid[this.row][this.col].fillColor = BLACK
        }

        makeStart() {
                if (!this.color === WHITE) {
                        return false
                }
                this.color = ORANGE
                gameState.grid[this.row][this.col].fillColor = ORANGE
        }

        makeEnd() {
                if (this.isStart()) {
                        return false
                }
                this.color = TURQUOISE
                gameState.grid[this.row][this.col].fillColor = TURQUOISE
                return true
        }

        makePath() {
                this.color = PURPLE
                gameState.grid[this.row][this.col].fillColor = PURPLE
        }

        updateNeighbors(grid) {
                this.neighbors = [];
                //DOWN
                if (this.row < this.totalRows - 1 && !grid[this.row + 1][this.col].isBarrier()) {
                        this.neighbors.push(grid[this.row + 1][this.col])
                }
                //UP
                if (this.row > 0 && !grid[this.row - 1][this.col].isBarrier()) {
                        this.neighbors.push(grid[this.row - 1][this.col])
                }
                //LEFT
                if (this.col > 0 && !grid[this.row][this.col - 1].isBarrier()) {
                        this.neighbors.push(grid[this.row][this.col - 1])
                }
                //RIGHT
                if (this.col < this.totalRows - 1 && !grid[this.row][this.col + 1].isBarrier()) {
                        this.neighbors.push(grid[this.row][this.col + 1])
                }
        }
}

class PriorityQueue {
        constructor(element) {
                this.items = [element]
        }
        push(fScore, count, element) {
                i = 0;
                while (this.items[i][0] > fScore && i < this.items.length) {
                        i++;

                }
                this.items.splice(i - 1, 0, (fScore, count, element))
                return this.items

        }

        get() {
                return this.items[0]
        }
        length() {
                return this.items.length
        }
}

var gameState = {
        grid: [],
        spots: [],
        spotStatus: 'start',
        clickState: false,
        algorithmStarted: false
};


const RED = 0xff0000;
const GREEN = 0x00cc00;
const WHITE = 0xffffff;
const BLACK = 0x000000;
const PURPLE = 0x70008f;
const ORANGE = 0xff6600;
const TURQUOISE = 0x00ffff;
var spot;
var xPositionOfMouse;
var yPositionOfMouse;
var line;
var count;
var openSet;
var cameFrom;
var gScore;
var fScore;
var currentNode;
var tempGScore;
var openSetHash;
var start = undefined;
var end = undefined;
var i;
var x1; var x2; var y1; var y2;