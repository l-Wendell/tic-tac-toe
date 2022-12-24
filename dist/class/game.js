export class TicTacToe {
    // private updateDom: UpdateDom = new UpdateDom(this.scoreboard);
    constructor(firstPlayer, 
    // private readonly scoreboard: Element[],
    updateDom) {
        this.updateDom = updateDom;
        this.gameScore = {
            X: 0,
            O: 0,
            ties: 0,
        };
        this.numberOfMoves = 0;
        this.board = ["", "", "", "", "", "", "", "", ""];
        this.sequences = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        this.acutalPlayer = firstPlayer;
    }
    /*
    updateScore(player: Player) {
        const [winner] = this.scoreboard.filter(
            (item) => item.getAttribute("data-value") === player,
        );
        const paragraphScore = html.get(".score", winner);
        paragraphScore.textContent = this.gameScore[player].toString();
    } */
    checkWinner(player) {
        this.sequences.forEach((_, index) => {
            if (this.board[this.sequences[index][0]] == player &&
                this.board[this.sequences[index][1]] == player &&
                this.board[this.sequences[index][2]] == player) {
                this.gameScore[player]++;
                // this.updateScore(player);
                // console.log(player);
                // console.log(this.sequences[index]);
                this.updateDom.updateScore(player, this.gameScore);
                this.updateDom.markSquares(this.sequences[index]);
            }
            else if (this.numberOfMoves === 9) {
                this.gameScore.ties++;
            }
        });
    }
    invertPlayer() {
        this.acutalPlayer === "X"
            ? (this.acutalPlayer = "O")
            : (this.acutalPlayer = "X");
    }
    updateMoves(position) {
        if (this.board[position] !== "")
            return;
        this.board[position] = this.acutalPlayer;
        this.numberOfMoves++;
        this.checkWinner(this.acutalPlayer);
        this.updateDom.updateSquare(this.acutalPlayer, position);
        this.invertPlayer();
        console.log(this);
    }
}
