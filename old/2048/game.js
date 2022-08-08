class Queue { // More or less
    constructor(maxlength){
        this.array = new Array(maxlength).fill(0);
        this.curr = 0; // Where to fill queue from
    }

    enque(val){
        this.array[this.curr] = val;
        this.curr++;
    }
}

export default class Game {
    constructor(size) {
        this.size = size;

        this.gameState = {
            board: new Array(size * size).fill(0),
            score: 0,
            won: false,
            over: false
        };

        this.moveEvents = [];
        this.winEvents = [];
        this.loseEvents = [];

        this.setupNewGame();
    }

    setupNewGame(){
        this.gameState.board = this.gameState.board.fill(0);
        this.gameState.score = 0;
        this.gameState.won = false;
        this.gameState.over = false;
        this.addRandomTile();
        this.addRandomTile();
    }

    loadGame(gameState){
        this.gameState = gameState;
    }

    move(direction){
        if(this.gameState.over)
            return;

        switch(direction){
            case "left":
                this.moveLeft();
                break;
            case "down":
                this.orientCounterclockwise();
                this.orientCounterclockwise();
                this.orientCounterclockwise();
                this.moveLeft();
                this.orientCounterclockwise();
                break;
            case "up":
                this.orientCounterclockwise();
                this.moveLeft();
                this.orientCounterclockwise();
                this.orientCounterclockwise();
                this.orientCounterclockwise();
                break;
            case "right":
                this.orientCounterclockwise();
                this.orientCounterclockwise();
                this.moveLeft();
                this.orientCounterclockwise();
                this.orientCounterclockwise();
                break;
        }

        //this.moveEvents.forEach(callback => callback(this.gameState))

        this.addRandomTile();
        this.checkForOver();

        this.moveEvents.forEach(callback => callback(this.gameState))

        if(this.gameState.over && !this.gameState.won)
            this.loseEvents.forEach(callback => callback(this.gameState));
    }

    checkForOver(){
        if(this.getOpenTiles().length > 0)
            return;

        for(let i = 0; i < this.size; i++)
            for(let j = 0; j < this.size; j++){
                let n = this.get(i, j);

                if(n === this.get(i - 1, j) ||
                    n === this.get(i + 1, j) ||
                    n === this.get(i, j - 1) ||
                    n === this.get(i, j + 1))
                    return;
            }

        this.gameState.over = true;
    }

    get(x, y){
        return this.getFromBoard(x, y, this.gameState.board);
    }

    getFromBoard(x, y, board){
        if(x >= 0 && y >=0 && x < this.size && y < this.size)
            return board[x + (y * this.size)];
        else
            return -1;
    }

    set(x, y, val){
        this.setFromBoard(x, y, this.gameState.board, val);
    }

    setFromBoard(x, y, board, val){
        board[x + (y * this.size)] = val;
    }

    moveLeft(){
        let newBoard = new Array(this.size * this.size).fill(0);

        for(let i = 0; i < this.size; i++){
            let q = new Queue(this.size);
            let hasMerged = false;

            for(let j = 0; j < this.size; j++){
                let n = this.get(j, i);

                if(n !== 0) {
                    if (q.curr !== 0) {
                        if (q.array[q.curr - 1] === n && !hasMerged) { // merge
                            q.array[q.curr - 1] *= 2;
                            hasMerged = true;
                            this.gameState.score += q.array[q.curr - 1];

                            if (q.array[q.curr - 1] === 2048) {
                                this.gameState.won = true;
                                this.winEvents.forEach(callback => callback(this.gameState));
                            }
                        }else{
                            q.enque(n);
                            hasMerged = false;
                        }
                    } else{ // this is just the initial case
                        q.enque(n);
                    }
                }
            }

            for(let j = 0; j < this.size; j++){
                this.setFromBoard(j, i, newBoard, q.array[j]);
            }
        }

        this.gameState.board = newBoard;
    }

    orientCounterclockwise(){
        let newBoard = new Array(this.size * this.size);

        for(let i = 0; i < this.size; i++)
            for(let j = 0; j < this.size; j++)
                this.setFromBoard(i, j, newBoard, this.getFromBoard(this.size - j - 1, i, this.gameState.board));

        this.gameState.board = newBoard;
    }

    toString(){
        let ret = ""

        for(let h = 0; h < this.size; h++) {
            for(let w = 0; w < this.size; w++) {
                let num = this.gameState.board[(4 * h) + w];

                if(num === 0)
                    ret += "[ ] "
                else
                    ret += "[" + num + "] "
            }

            ret += "\n";
        }

        return ret;
    }

    onMove(callback){
        this.moveEvents.push(callback);
    }

    onWin(callback){
        this.winEvents.push(callback);
    }

    onLose(callback){
        this.loseEvents.push(callback);
    }

    getGameState(){
        return this.gameState;
    }

    /**
     * @param array the array
     * @returns {number} a random index in that array
     */
    getRandomIndex(array){
        return Math.floor(Math.random() * array.length);
    }

    /**
     * @returns {Number[]} open tiles
     */
    getOpenTiles(){
        let ret = [];

        for(let i = 0; i < this.gameState.board.length; i++)
            if(this.gameState.board[i] === 0)
                ret.push(i);

        return ret;
    }

    /**
     * @returns {number} the position in the array, or -1 if there is no more room.
     */
    addRandomTile(){
        let openTiles = this.getOpenTiles();

        if(openTiles.length === 0)
            return -1;

        let newLoc = openTiles[this.getRandomIndex(openTiles)];
        this.gameState.board[newLoc] = Math.random() > 0.9 ? 4 : 2;

        return newLoc;
    }
}
