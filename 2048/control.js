import Game from "./game.js";
import {createBase} from "./view.js";
import {updateBoard} from "./view.js";
import {updateStatus} from "./view.js";
import {updateScore} from "./view.js";

$(document).ready(() => {
    let g = new Game(4);

    createBase();
    updateBoard(g.getGameState().board)

    g.moveEvents.push((gameState) => {
        updateBoard(gameState.board);
        updateScore(gameState.score);
    });
    g.winEvents.push((gameState) => updateStatus('win'));
    g.loseEvents.push((gameState) => updateStatus('lose'))

    $(document).keydown((e) => {
        e.preventDefault();
        switch(e.code){
            case 'ArrowLeft':
            case 'KeyA':
                g.move('left');
                break;
            case 'ArrowRight':
            case 'KeyD':
                g.move('right');
                break;
            case 'ArrowUp':
            case 'KeyW':
                g.move('up');
                break;
            case 'ArrowDown':
            case 'KeyS':
                g.move('down');
                break;
        }
    });

		$('#board-table').on("swipe", (e) => {
			e.preventDefault();
			switch(event.detail.direction){
				case "left":
					g.move('left');
					break;
				case "right":
					g.move('right');
					break;
				case "up":
					g.move('up');
					break;
				case "down":
					g.move('down');
					break;
			}
		});

    // This is here to prevent the window going down
    $(document).keyup((e) => e.preventDefault());
    $(document).keypress((e) => e.preventDefault());

    $("#reset-game").click((e) => {
        g.setupNewGame();
        updateBoard(g.getGameState().board);
        updateScore(0);
        updateStatus('inprogress');
    });
});
