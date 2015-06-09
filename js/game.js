/// <reference path="typings/underscore.d.ts" />

var Game = (function () {
    function Game(initBoard) {
        if (initBoard === void 0) { initBoard = '0000202000000000'; }
        //console.log(initBoard);
        this.board = _.map(initBoard.split(''), function (num) { return parseInt(num); });
        //console.log(this.board);
    }
    Game.prototype.toString = function () {
        var strBoard = '';
        for (var i = 0; i < this.board.length; i += 4) {
            strBoard += this.board.slice(i, i + 4).toString().split(',').join('');
            strBoard += "\n";
        }
        return strBoard;
    };
    Game.prototype.move = function (move) {
        // up, down, left, right
        // probably a better way?
        var chunked;
        var newBoard;
        if (move === 'up' || move === 'down') {
            console.log("move(): up and down");
            chunked = [[], [], [], []];
            for (var i = 0; i < this.board.length; i++) {
                chunked[i % 4].push(this.board[i]);
                console.log("move(): up and down forloop");
            }
            console.log(chunked);
        }
        else if (move === 'right' || move === 'left') {
            console.log("move(): right and left");
            var copy = this.board;
            copy = _.map(copy, function (num) { return num; });
            chunked = [];
            while (copy.length) {
                chunked.push(copy.splice(0, 4));
            }
            console.log(chunked);
        }
        for (var i = 0; i < chunked.length; i++) {
            for (var j = 0; j < chunked[i].length - 1; j++) {
                // satisfies requisites for moving current block over one unit
                if (chunked[i][j] === chunked[i][j + 1] || chunked[i][j + 1] === 0) {
                    chunked[i][j + 1] = chunked[i][j + 1] + chunked[i][j];
                    chunked[i][j] = 0;
                }
            }
        }
        if (move === 'up' || move === 'down') {
            chunked = _.zip.apply(_, chunked);
            if (move === 'up') {
                chunked = _.map(chunked, function (arr) { return arr.reverse(); });
            }
        }
        newBoard = _.flatten(chunked);
        if (move === 'up' || move === 'left') {
            newBoard.reverse();
        }
        this.board = newBoard;
        this.spawnBlock();
    };
    Game.prototype.spawnBlock = function () {
        var zeroes = [];
        var spawn;
        _.filter(this.board, function (_char, index) {
            if (_char === 0) {
                zeroes.push(index);
            }
        });
        if (zeroes.length < 1) {
            /* no blocks can be spawned because
            there's no empty space, game over */
            return;
        }
        spawn = zeroes[_.random(zeroes.length - 1)];
        this.board[spawn] = 2;
    };
    return Game;
})();
var game = new Game();
console.log(game.toString());

window['game'] = game;
window['game'].move = Game.prototype.move;
window['game'].spawnBlock = Game.prototype.spawnBlock;
window['game'].toString = Game.prototype.toString;

