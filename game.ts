
class Game {
    board: string;

    constructor(initBoard?: string) {
        if (initBoard) {
            this.board = initBoard;
        } else {
            // default if nothing passed in
            this.board = '0000202000000000';
        }
    }

    toString() {
        var split: number = 0;
        var strBoard: string = '';
        for (split; split <= this.board.length; split += 4) {
            strBoard += this.board.substring(split, split + 4) + '\n';
        }

        return strBoard;
    }

    move(move: string) {

        // up, down, left, right

        // probably a better way?
        var chunked;

        if (move === 'up' || move === 'down') {

            chunked = [[], [], [], []];

            for (var i = 0; i < this.board.length; i++) {
                chunked[i % 4].push(this.board[i]);
            }

            console.log(chunked);


        } else if (move === 'right' || move === 'left') {

            var copy = this.board.split('');
            chunked = [];

            while (copy.length) {
                chunked.push(copy.splice(0, 4));
            }

            console.log(chunked);
        }

        for (var i = 0; i < chunked.length; i++) {
            for (var j = 0; j < chunked[i].length; j++) {
                
            }
        }

        //this.spawnBlock();
    }

    spawnBlock() {
        var zeroes: number[] = [];
        var spawn: number;
        var newBoard: string;

        _.filter(this.board, function(char, index) { 
                if (char === '0') {
                    zeroes.push(index);
                }
            });

        if (zeroes.length < 1) {
            /* no blocks can be spawned because
            there's no empty space, game over */
            return;
        }

        spawn = zeroes[_.random(zeroes.length - 1)];
        newBoard = this.board.substring(0, spawn) + '2' + this.board.substring(spawn + 1);
        this.board = newBoard;
    }
}

var game = new Game();
console.log(game.toString());
